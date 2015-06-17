import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['box'],
    discountBoxFunction: function( currentjQueryObject, percent ) {
        percent = Math.floor( Math.max( 0, Math.min( 100, parseInt( percent || ( percent = 0 ) ) ) ) );

        var $box = currentjQueryObject.find('> .progress-box');
        // $box.find( '.progress-text' ).css({ 'line-height': currentjQueryObject.outerHeight() + 'px' });

        $box.find( '.progress-visual' ).css({ width: percent + '%' });
        $box.find( '.progress-text' ).text( percent + '%' );
        if( 100 === percent ){
            $box.addClass( 'done' );
        } else {
        	$box.removeClass('done');
        }
    },
	loadDiscountBox: function () {

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
		self.discountBoxFunction(jqueryElement, percentReached);
	}.on('didInsertElement').observes('numberOfSamples')
});
