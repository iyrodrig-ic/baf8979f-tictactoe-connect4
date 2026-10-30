# baf8979f-tictactoe-connect4
TicTacToe/Connect4

## Running / Testing
To run the server:
```npm start```
Then, use curl to pass in JSON to `localhost:3000/` of the following structure:
```
{
    "board": [["a", "b", null, ...], ...]
}
```
Input board is expected to be square and at least contain one item in the inner array.

To run the tests:
```npm test```

Uses node v24.12.0