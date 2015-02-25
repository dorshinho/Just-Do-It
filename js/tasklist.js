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
        tasks: "Run 2k"
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
            this.collection.models[0].view.el.innerHTML = '';
        },
         details: function(id) {
        var deets = this.collection.models.filter(function(val) {
    return val.get('tasks') === id
})[0]
        deets.view.render();
        this.view.el.innerHTML = '';
        }

    })



})(typeof module === "object" ? module.exports : window)
