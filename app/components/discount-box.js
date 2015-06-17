import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['box'],
    discountBoxFunction: function( currentjQueryObject, percent ) {
        percent = Math.floor( Math.max( 0, Math.min( 100, parseInt( percent || ( percent = 0 ) ) ) ) );

        var $box;
        if( !( $box = currentjQueryObject.find( '> .progress-box' ) ).length ){
            $box = Ember.$( '<div class="progress-box"><div class="progress-visual"></div><div class="progress-text"></div></div>' )
              .appendTo( currentjQueryObject );

            var $this = currentjQueryObject;
            if( 'static' === $this.css( 'position' ) ){
              $this.css({ position: 'relative' });
            }

            $box.find( '.progress-text' ).css({ 'line-height': currentjQueryObject.outerHeight() + 'px' });
        }

        $box.find( '.progress-visual' ).css({ width: percent + '%' });
        $box.find( '.progress-text' ).text( percent + '%' );

        if( 100 === percent ){
            $box.addClass( 'done' );
            setTimeout( function(){
              $box.remove();
            }, 1000 );
        }
    },
	loadDiscountBox: function () {
		/* Usage is very simple:
		 * $( node ).progressBox( percent );
		 */

		var element = this.get('elementId');
		var self = this;
		console.log(element);
		var jqueryElement = Ember.$("#" + element);
		var numberOfSamples = this.get('numberOfSamples');
		var minimumCount = this.get('minimumCount');
		var maximumCount = this.get('maximumCount');
		var countTowardsGoal = numberOfSamples - minimumCount;
		var goalAmount = maximumCount - minimumCount;
		var goalReached = false;
		var goalNotStarted = false;
		if (numberOfSamples > maximumCount) {
			goalReached = true;
		}
		if (numberOfSamples < minimumCount) {
			goalNotStarted = true;
		}		
		var percentReached = (countTowardsGoal / goalAmount) * 100;
		if (goalReached){
			percentReached = 100;
		} else if (goalNotStarted) {
			percentReached = 0;
		}		
		self.discountBoxFunction(jqueryElement, percentReached)
	}.on('didInsertElement').observes('numberOfSamples')
});
