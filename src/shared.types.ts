export type TicTacToeBoard = (string | null)[][];

export interface TicTacToeLocation {
    rowIndex: number;
    columnIndex: number;
}

export interface TicTacToeRequest {
    board: TicTacToeBoard;
}

export interface TicTacToeResponse {
    checkWinner: string | null;
    anyMovesLeft: boolean;
    isGameOver: boolean;
}