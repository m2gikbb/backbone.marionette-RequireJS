// Generated by CoffeeScript 1.6.2
(function() {
  require.config({
    paths: {
      jquery: "../../components/jquery/jquery",
      underscore: "../../components/underscore-amd/underscore",
      backbone: "../../components/backbone-amd/backbone",
      "backbone.wreqr": "../../components/backbone.wreqr/lib/amd/backbone.wreqr",
      "backbone.eventbinder": "../../components/backbone.eventbinder/lib/amd/backbone.eventbinder",
      "backbone.babysitter": "../../components/backbone.babysitter/lib/amd/backbone.babysitter",
      marionette: "../../components/marionette/lib/core/amd/backbone.marionette",
      bsModal: "../../components/bootstrap/docs/assets/js/bootstrap-modal",
      text: "../../components/requirejs-text/text"
    },
    shim: {
      bsModal: ["jquery"]
    }
  }, require(["app", "config/_base", "apps/book/app", "apps/other/app"], function(App) {
    return App.start();
  }));

}).call(this);
