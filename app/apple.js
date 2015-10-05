(function () {
    if (typeof SG === "undefined") {
      window.SG = {};
    }

    var Apple = SG.Apple = function(board) {
      this.board = board;
      this.snake = board.snake;
    };

    Apple.prototype.makePos = function () {
      this.pos = [this.makeRandom(), this.makeRandom()];

      while (!this.checkEmptySquare(this.pos)) {
        this.pos = [this.makeRandom(), this.makeRandom()];
      }
      
      return this.pos;
    };

    Apple.prototype.checkEmptySquare = function (pos) {
      return _.findIndex(this.snake.segments, pos) === -1;
    };

    Apple.prototype.makeRandom = function () {
      return _.random(0, this.board.dim - 1);
    };

    Array.prototype.flipSign = function () {
      return _.map(this, function(num) {
        return num * -1;
      });
    };
})();
