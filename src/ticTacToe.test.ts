import { strict as assert } from 'assert';
import { describe, it } from 'node:test';
import { TicTacToe } from './ticTacToe';

describe('Tic Tac Toe', () => {
    it('correctly checks winner and other functions', () => {
        const ticTacToeWin: TicTacToe = new TicTacToe(
            [["y", null, null, "y"], ["x", "x", null, null], ["x", null, "z", "z"], ["y", "y", "z", "z"]]
        );
        assert(ticTacToeWin.checkWinner() === 'z');
        assert(ticTacToeWin.isGameOver() === true);
        assert(ticTacToeWin.anyMovesLeft() === false);

        const ticTacToeNoWinMovesLeft: TicTacToe = new TicTacToe(
            [["y", null, null, "y"], ["x", "x", null, null], ["x", null, "z", "x"], ["y", "y", "z", "z"]]
        );
        assert(ticTacToeNoWinMovesLeft.checkWinner() === null);
        assert(ticTacToeNoWinMovesLeft.isGameOver() === false);
        assert(ticTacToeNoWinMovesLeft.anyMovesLeft() === true);

        const ticTacToeNoWinNoMovesLeft: TicTacToe = new TicTacToe(
            [["y", "a", "a", "y"], ["x", "x", "b", "b"], ["x", "y", "z", "x"], ["y", "y", "z", "z"]]
        );
        assert(ticTacToeNoWinNoMovesLeft.checkWinner() === null);
        assert(ticTacToeNoWinNoMovesLeft.isGameOver() === true);
        assert(ticTacToeNoWinNoMovesLeft.anyMovesLeft() === false);
    });
})