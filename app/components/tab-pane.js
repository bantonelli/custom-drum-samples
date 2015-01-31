/**
 * Created by brandonantonelli on 1/31/15.
 */
import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['tab-pane'],

    classNameBindings: ['isActive:active'],

    isActive: function() {
        return this.get('elementId') === this.get('parentView.activePaneId');
    }.property('elementId', 'parentView.activePaneId'),

    didInsertElement: function() {
        this.get('parentView.panes').pushObject({paneId: this.get('elementId'), name: this.get('name')});

        if (this.get('parentView.activePaneId') === null) {
            this.get('parentView').setActivePane(this.get('elementId'));
        }
    }

});