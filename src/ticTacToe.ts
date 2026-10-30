import { TicTacToeBoard } from "./shared.types";
import { createWinConditionTrackerMap, getLocationKey, WinCondition, WinConditionTracker } from "./winCondition";

export class TicTacToe {
    private winner: (string | null) = null;
    private openSpaces: number = 0;
    private board: (string | null)[][] | null = null;
    private processed: boolean = false;
    private winConditionTrackerMap: { [key: number]: WinConditionTracker[] } = {};
    private winConditions?: WinCondition[];

    constructor(board: TicTacToeBoard, winConditions?: WinCondition[]) {
        this.board = board;
        if (winConditions) {
            this.winConditions = winConditions;
        }
    }

    private processBoard = (): void => {
        if (this.processed) {
            return;
        }
        if (this.board === null || this.board.length < 1 || this.board[0].length < 1) {
            return;
        }
        // assume board is square
        const boardSize: number = this.board.length;
        this.winConditionTrackerMap = createWinConditionTrackerMap(boardSize, this.winConditions);
        let gameFinished: boolean = false;
        for (let row: number = 0; row < boardSize; row++) {
            if (gameFinished) {
                break;
            }
            for (let column: number = 0; column < boardSize; column++) {
                if (gameFinished) {
                    break;
                }
                const playerName: (string | null) = this.board[row][column];
                if (playerName === null) {
                    this.openSpaces += 1;
                }
                this.winConditionTrackerMap[
                    getLocationKey(
                        {
                            rowIndex: row,
                            columnIndex: column,
                        },
                        boardSize
                    )
                ].forEach(
                    (winConditionTracker: WinConditionTracker) => {
                        if (gameFinished) {
                            return;
                        }
                        winConditionTracker.processLocation(playerName);
                        if (winConditionTracker.outcomeDetermined && winConditionTracker.currentWinner !== null) {
                            gameFinished = true;
                            this.winner = winConditionTracker.currentWinner;
                        }
                    }
                )
            }
        }
        this.processed = true;
    }

    public checkWinner = (): (string | null) => {
        if (!this.processed) {
            this.processBoard();
        }
        return this.winner;
    }

    public anyMovesLeft = (): boolean => {
        if (!this.processed) {
            this.processBoard();
        }
        if (this.winner !== null) {
            return false;
        }
        return this.openSpaces !== 0;
    }

    public isGameOver = (): boolean => {
        if (!this.processed) {
            this.processBoard();
        }
        return !this.anyMovesLeft();
    }
}