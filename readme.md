[link to live version]

# Snake!

## About
  I re-created the classic arcade game, Snake. I primarily used CSS, Javascript, and jQuery.

## Instructions:
  * Use arrow keys to control the snake
  * Try to navigate your snake into the apple (the red square)
  * Avoid navigating into any of the borders or any part of the snake's body.
  * Continue eating apples!

## Implementation
  I took advantage of the lovely methods provided by Underscore.js to clean up the code.

  I'm proud of the efficiency of the 'step' function in the 'View' class, which renders the snake's new position after it moves. In my initial implementation, it re-rendered the entire grid. After refactoring, it keeps the same grid, and toggles the class of only a few squares on the board.
