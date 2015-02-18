;
(function(exports) {

    "use strict";

    Backbone.Tasks = Backbone.Model.extend({
        initialize: function() {
            this.view = new Backbone.ItemView({
                model: this
            })
        }
    })

    Backbone.ItemView = Backbone.TemplateView.extend({
        el: ".description",
        view: "details",
     addDetials: function(e){

        }
    })

    Backbone.TasksView = Backbone.TemplateView.extend({
        el: ".container",
        view: "do-it",
         events: {
            "submit .task-form": "addTask",
            "change input [type=checkbox]" :"isDone"
        },

         addTask: function(e){
            e.preventDefault();
            var theTask = {
                tasks: this.el.querySelector("input[name='taskname']").value
            }
            this.collection.add(theTask, {validate: true});
        }

    })

    Backbone.TasksList = Backbone.Collection.extend({
        model: Backbone.Tasks
    })

    var testData = [{
        tasks: "Run 5k"
    }, {
        tasks: "Eat"
    }, {
        tasks: "Shower"
    }, {
        tasks: "Code"

    }]

    Backbone.TasksRouter = Backbone.Router.extend({
        initialize: function() {
            // collection and view
            this.collection = new Backbone.TasksList(testData);
            this.view = new Backbone.TasksView({
                collection: this.collection
            });
            Backbone.history.start();
        },
        routes: {
            "item/:id": "details",
            "*default": "home"

        },
        home: function() {
            this.view.render();
        },
         details: function(id) {
        console.log(this.collection)

            this.view.render();
        }

    })



})(typeof module === "object" ? module.exports : window)
