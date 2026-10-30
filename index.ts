import express, {Request, Response} from 'express';
import { createWinConditions, WinCondition } from './src/winCondition';
import { TicTacToeBoard, TicTacToeRequest, TicTacToeResponse } from './src/shared.types';
import { TicTacToe } from './src/ticTacToe';

const PORT = 3000
const DEFAULT_SIZE = 4
const WIN_CONDITION_MAP: { [key : number] : WinCondition[]} = {}

WIN_CONDITION_MAP[DEFAULT_SIZE] = createWinConditions(DEFAULT_SIZE);

const app = express();

app.use(express.json());

app.post("/", (req: Request<{}, {}, TicTacToeRequest>, res: Response<TicTacToeResponse>) => {
    const board: TicTacToeBoard = req.body.board;
    const ticTacToe: TicTacToe = new TicTacToe(board, WIN_CONDITION_MAP[board.length]);
    const ticTacToeResponse: TicTacToeResponse = {
        checkWinner: ticTacToe.checkWinner(),
        anyMovesLeft: ticTacToe.anyMovesLeft(),
        isGameOver: ticTacToe.isGameOver(),
    };
    res.json(ticTacToeResponse);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));