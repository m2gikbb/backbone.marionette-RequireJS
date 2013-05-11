// Generated by CoffeeScript 1.6.2
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['underscore', 'backbone', 'apps/book/list/templates', 'views/_base', 'msgbus'], function(_, Backbone, Templates, AppView, msgbus) {
    var BookDetailView, BookList, BookView, Layout, SearchView, _ref, _ref1, _ref2, _ref3, _ref4;

    return {
      BookView: BookView = (function(_super) {
        __extends(BookView, _super);

        function BookView() {
          _ref = BookView.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        BookView.prototype.template = _.template(Templates.book);

        BookView.prototype.events = {
          "click": function() {
            return msgbus.events.trigger("list:book:clicked", this.model);
          }
        };

        return BookView;

      })(AppView.ItemView),
      BookList: BookList = (function(_super) {
        __extends(BookList, _super);

        function BookList() {
          _ref1 = BookList.__super__.constructor.apply(this, arguments);
          return _ref1;
        }

        BookList.prototype.template = _.template(Templates.books);

        BookList.prototype.id = "bookList";

        BookList.prototype.itemView = BookView;

        BookList.prototype.itemViewContainer = "div.books";

        BookList.prototype.events = {
          scroll: "loadmorebooks"
        };

        BookList.prototype.loadmorebooks = function() {
          var margin, scrollTop, totalHeight;

          totalHeight = this.$("> div").height();
          scrollTop = this.$el.scrollTop() + this.$el.height();
          margin = 200;
          if ((scrollTop + margin) >= totalHeight) {
            return msgbus.events.trigger("search:more");
          }
        };

        return BookList;

      })(AppView.CompositeView),
      Layout: Layout = (function(_super) {
        __extends(Layout, _super);

        function Layout() {
          _ref2 = Layout.__super__.constructor.apply(this, arguments);
          return _ref2;
        }

        Layout.prototype.template = _.template(Templates.layout);

        Layout.prototype.regions = {
          search: "#searchBar",
          books: "#bookContainer"
        };

        return Layout;

      })(AppView.Layout),
      Search: SearchView = (function(_super) {
        __extends(SearchView, _super);

        function SearchView() {
          _ref3 = SearchView.__super__.constructor.apply(this, arguments);
          return _ref3;
        }

        SearchView.prototype.el = "#searchBar";

        SearchView.prototype.events = {
          "change #searchTerm": "search"
        };

        SearchView.prototype.initialize = function() {
          var $spinner,
            _this = this;

          $spinner = this.$("#spinner");
          msgbus.events.on("search:start", function() {
            return $spinner.fadeIn();
          });
          msgbus.events.on("search:stop", function() {
            return $spinner.fadeOut();
          });
          return msgbus.events.on("search:term", function(term) {
            return _this.$("#searchTerm").val(term);
          });
        };

        SearchView.prototype.search = function() {
          var searchTerm;

          searchTerm = this.$("#searchTerm").val().trim();
          console.log("searchTerm change vent handled from SearchView: " + searchTerm);
          if (searchTerm.length > 0) {
            return msgbus.events.trigger("search:term", searchTerm);
          } else {
            return msgbus.events.trigger("search:noSearchTerm");
          }
        };

        return SearchView;

      })(AppView.ItemView),
      BookDetailView: BookDetailView = (function(_super) {
        __extends(BookDetailView, _super);

        function BookDetailView() {
          _ref4 = BookDetailView.__super__.constructor.apply(this, arguments);
          return _ref4;
        }

        BookDetailView.prototype.template = _.template(Templates.bookdetail);

        BookDetailView.prototype.className = "modal bookDetail";

        BookDetailView.prototype.modelEvents = {
          "change:name": function() {
            return console.log("name changed");
          }
        };

        BookDetailView.prototype.events = {
          "click #close-dialog": function() {
            console.log("BookDetailView>> close click");
            return this.trigger("dialog:close");
          }
        };

        return BookDetailView;

      })(AppView.ItemView)
    };
  });

  ({
    dialog: {
      title: "Edit Event",
      className: "dialogClass",
      buttons: false
    },
    onClose: function() {
      return console.log("view closing");
    },
    onDialogButtonClicked: function() {
      return console.log("dialog method onDialogButtonClicked");
    }
  });

}).call(this);
