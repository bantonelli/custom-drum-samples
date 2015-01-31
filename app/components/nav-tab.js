/**
 * Created by brandonantonelli on 1/31/15.
 */
import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'li',

    classNames: ['menu-item', 'col-xs-2'],

    classNameBindings: ['isActive:active'],

    isActive: function() {
        return this.get('paneId') === this.get('parentView.activePaneId');
    }.property('paneId', 'parentView.activePaneId'),

    click: function() {
        this.get('parentView').setActivePane(this.get('paneId'));
    }

});