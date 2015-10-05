

(function () {
  if (typeof SG === "undefined") {
    window.SG = {};
  }

  var Snake = SG.Snake = function (board) {
    this.currentDir = "W";

    var middle = [Math.floor(board.dim/2), Math.floor(board.dim/2)];
    this.segments = [middle];

    this.board = board;
  };

  Snake.prototype.move = function () {
    var firstSeg = _.last(this.segments);
    var lastSeg = _.clone(_.last(this.segments));

    firstSeg[0] = _.first(this.segments)[0] +
      Snake.DIRS[this.currentDir][0];
    firstSeg[1] = _.first(this.segments)[1] +
      Snake.DIRS[this.currentDir][1];

    this.segments.unshift(this.segments.pop());

    return([firstSeg, lastSeg]);
  };

  Snake.prototype.turn = function (dir) {
    if (this.segments.length > 1 &&
          ((this.currentDir === "N" && dir === "S") ||
           (this.currentDir === "E" && dir === "W") ||
           (this.currentDir === "S" && dir === "N") ||
           (this.currentDir === "W" && dir === "E"))) {

            this.currentDir = this.currentDir;

        } else {
          this.currentDir = dir;
        }
  };

  Snake.prototype.grow = function (numberOfSegments) {
    var lastSegment = _.last(this.segments);
    var delta = Snake.DIRS[this.currentDir];
    delta = delta.flipSign();

    _.times(numberOfSegments, function () {
      this.addTailPiece(lastSegment, delta);
    }.bind(this));
  };

  Snake.prototype.addTailPiece = function (segment, delta) {
    var newSegment = [];
    newSegment.push(segment[0] + delta[0]);
    newSegment.push(segment[1] + delta[1]);

    this.segments.push(newSegment);
  };

  Snake.prototype.hitItself = function () {
    var firstSegment = _.first(this.segments);
    var restOfSegments = _.rest(this.segments);

    var x = false;

    _.each(restOfSegments, function(segmentLink) {
      if (segmentLink[0] === firstSegment[0] && segmentLink[1] === firstSegment[1]) {
        x = true;
      }
    });

    return x;
  };

  Snake.DIRS = {
    "N" : [ 0, -1],
    "E" : [ 1,  0],
    "S" : [ 0,  1],
    "W" : [-1,  0]
  };

})();
