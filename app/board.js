(function () {
  if (typeof SG === "undefined") {
    window.SG = {};
  }

  var Board = SG.Board = function(dim) {
    this.dim = dim;

    this.snake = new SG.Snake(this);
    this.apple = new SG.Apple(this);
  };

  Board.EMPTY_SPACE = "_";

  Board.prototype.isCollision = function () {
    var seg = _.first(this.snake.segments);
    var pos = this.apple.pos;

    if (this.appleEaten(pos, seg)) {
      return "newApple";
    }

    if (this.gameOver(seg)) {
      return "hitBorder";
    }
  };

  Board.prototype.appleEaten = function (pos, seg) {
    return (seg[0] === pos[0] && seg[1] === pos[1]);
  };

  Board.prototype.gameOver = function (seg) {
    return this.snake.hitItself() || this.borderCollision(seg);
  };

  Board.prototype.borderCollision = function (seg) {
    return (seg[1] >= this.dim || seg[1] < 0 || seg[0] < 0 || seg[0] >= this.dim );
  };

  Board.prototype.blankGrid = function (dim) {
    var grid = [];

    for (var i = 0; i < dim; i++ ) {
      var row = [];
      grid.push(row);

      for (var j = 0; j < dim; j++) {
        row.push("_");
      }
    }

    return grid;
  };

  Board.prototype.render = function () {
    var grid = Board.prototype.blankGrid(this.dim);

    _.each(this.snake.segments, function(segment) {

      grid[segment[0]][segment[1]] = "S";
    });

    var applePos = this.apple.pos;
    grid[applePos[0]][applePos[1]] = "A";

    return grid;
  };
})();

// b = new SG.Board(4);
