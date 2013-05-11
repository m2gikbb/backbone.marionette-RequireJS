// Generated by CoffeeScript 1.6.2
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["underscore", "marionette", "templates", "views/book", "msgbus"], function(_, Marionette, templates, BookView, msgbus) {
    var BookListView, showBooks, _ref;

    BookListView = (function(_super) {
      __extends(BookListView, _super);

      function BookListView() {
        _ref = BookListView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      BookListView.prototype.template = _.template(templates.booklist);

      BookListView.prototype.id = "bookList";

      BookListView.prototype.itemViewContainer = "div.books";

      BookListView.prototype.itemView = BookView;

      BookListView.prototype.initialize = function() {
        var self;

        self = this;
        _.bindAll(this, "showMessage", "loadMoreBooks");
        msgbus.events.on("search:error", function() {
          return self.showMessage("Error, please retry later :s");
        });
        msgbus.events.on("search:noSearchTerm", function() {
          return self.showMessage("Hummmm, can do better :)");
        });
        return msgbus.events.on("search:noResults", function() {
          return self.showMessage("No books found");
        });
      };

      BookListView.prototype.ui = {
        list: ".books"
      };

      BookListView.prototype.events = {
        scroll: "loadMoreBooks"
      };

      BookListView.prototype.appendHtml = function(collectionView, itemView) {
        return this.ui.list.append(itemView.el);
      };

      BookListView.prototype.showMessage = function(message) {
        return this.ui.list.html("<h1 class=\"notFound\">" + message + "</h1>");
      };

      BookListView.prototype.loadMoreBooks = function() {
        var margin, scrollTop, totalHeight;

        totalHeight = this.$("> div").height();
        scrollTop = this.$el.scrollTop() + this.$el.height();
        margin = 200;
        if (scrollTop + margin >= totalHeight) {
          return msgbus.events.trigger("search:more");
        }
      };

      return BookListView;

    })(Marionette.CompositeView);
    return {
      showBooks: showBooks = function(books) {
        var bookListView;

        bookListView = new BookListView({
          collection: books
        });
        return msgbus.events.trigger("show:books", bookListView);
      }
    };
  });

}).call(this);
