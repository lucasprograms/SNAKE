(function () {
  if (typeof SG === "undefined") {
    window.SG = {};
  }


  var View = SG.View = function () {
    this.$el = $(".grid");

    this.board = new SG.Board(25);
    this.board.apple.makePos();

    this.setUpGrid();
    this.establishMoves();


  };

  View.prototype.playGame = function () {
    if ($(".modal").css("display") === "block") {
      $(".modal").css("display", "none");

      this.board = new SG.Board(25);
      this.board.apple.makePos();

      this.setUpGrid();
    }
      this.interval = window.setInterval(
        this.step.bind(this),
        View.MOVE_INTERVAL
      );
        $(".play-game").text("PLAYING");
  };

  View.prototype.establishMoves = function() {
    $(window).on("keydown", function(e) {
      // e.preventDefault();
      if (e.which === 38) {this.board.snake.turn("N");}
      if (e.which === 39) {this.board.snake.turn("E");}
      if (e.which === 40) {this.board.snake.turn("S");}
      if (e.which === 37) {this.board.snake.turn("W");}
      if (e.which === 32) {this.togglePause();}
    }.bind(this));

    $(".play-game").click(function () {
      this.playGame();
    }.bind(this));
  };

  View.MOVE_INTERVAL = 100;

  View.prototype.setUpGrid = function () {
    this.$el.empty();
    this.grid = this.board.render();

    _.each(this.grid, function (row) {

      var $ul = $("<ul>");
      this.$el.append($ul);

      _.each(row, function(cell) {

        var $li = $("<li>");
        $ul.append($li);

        if (cell === "S") {
          $li.addClass("snake-seg");
        }

        if (cell === "A") {
          $li.addClass("apple-seg");
        }
      }.bind(this));
    }.bind(this));
  };

  View.prototype.step = function () {
    var cells = this.board.snake.move();

    var status = this.board.isCollision();

    if (status === "newApple") {
      this.getListElement(this.board.apple.makePos(), "apple");
      this.getListElement(_.first(cells), "apple");
      this.board.snake.grow(2);
    } else if (status === "hitBorder") {
      this.endGame();
    }

    this.getListElement(_.first(cells), "snake");
    this.getListElement(_.last(cells), "snake");
  };

  View.prototype.getListElement = function (cell, type) {
    var $ul = this.$el.find('ul:nth-child(' + (cell[0] + 1) + ')');
    var $li = $ul.find('li:nth-child(' + (cell[1] + 1) + ')');

    this.toggleClass($li, type);
  };

  View.prototype.toggleClass = function (el, type) {
    el.toggleClass(type + '-seg');
  };

  View.prototype.togglePause = function () {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    } else {
      this.playGame();

      // this.pause = true;
    }
  };

  View.prototype.endGame = function () {
    clearInterval(this.interval);
    $(".modal").css("display", "block");
    $(".play-game").text("PLAY AGAIN");
    return;
  };


})();

v = new SG.View();
