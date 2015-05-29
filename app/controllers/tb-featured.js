import Ember from 'ember';
import config from '.././config/environment';

export default Ember.Controller.extend({
	needs: ['browse-templates'],
	// needs sets the property 'controller' on the current controller object.
	// controllers: {
	// 	browse-templates: 
	// }
	publicTemplates: Ember.computed.alias('controllers.browse-templates.model'),
	featuredTemplates: Ember.computed('publicTemplates', 'templateList.@each', function() {
		// Come up with algorithm to grab templates with 'featured: true' and store them in a array. return that array.
		//Working Scripts 
	    	// var templates = this.get('publicTemplates').addObject({name: 'test object', featured: true});
	    	// return templates.filterBy('featured', true);    	
	    	// return this.get('publicTemplates').filterBy('featured', true);
    	var result = Ember.A();
    	var pubTemplates = this.get('publicTemplates');
    	// for (var i = 0; i < pubTemplates.length; i++) {
    	// 	result.pushObject(pubTemplates.objectAt(i));
    	// }
    	result.pushObjects(pubTemplates.objectsAt([0, 1, 2]));
    	return result;
    	// return pubTemplates.objectsAt([0, 1, 2]);
    	// result.pushObject(pubTemplates.objectAt(0));
    	// result.pushObject(pubTemplates.objectAt(1));
    	// return result;
  	})
});



// if you create a property that is an array on the controller or route, it will wray in an 
// Ember Array prototype (Ember.A([]);)
// var ToDoList = Ember.Object.extend({
//   // using standard ascending sort
//   todosSorting: ['name'],
//   sortedTodos: Ember.computed.sort('todos', 'todosSorting'),

//   // using descending sort
//   todosSortingDesc: ['name:desc'],
//   sortedTodosDesc: Ember.computed.sort('todos', 'todosSortingDesc'),

//   // using a custom sort function
//   priorityTodos: Ember.computed.sort('todos', function(a, b){
//     if (a.priority > b.priority) {
//       return 1;
//     } else if (a.priority < b.priority) {
//       return -1;
//     }

//     return 0;
//   })
// });

// var todoList = ToDoList.create({todos: [
//   { name: 'Unit Test', priority: 2 },
//   { name: 'Documentation', priority: 3 },
//   { name: 'Release', priority: 1 }
// ]});

// todoList.get('sortedTodos');      // [{ name:'Documentation', priority:3 }, { name:'Release', priority:1 }, { name:'Unit Test', priority:2 }]
// todoList.get('sortedTodosDesc');  // [{ name:'Unit Test', priority:2 }, { name:'Release', priority:1 }, { name:'Documentation', priority:3 }]
// todoList.get('priorityTodos');    // [{ name:'Release', priority:1 }, { name:'Unit Test', priority:2 }, { name:'Documentation', priority:3 }]

// /*only show featured *.