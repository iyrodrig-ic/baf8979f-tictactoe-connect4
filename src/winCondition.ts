import { TicTacToeLocation } from "./shared.types";

// use as hash key
export const getLocationKey = (location: TicTacToeLocation, rowSize : number): number => {
    return location.rowIndex * rowSize + location.columnIndex
}

export class WinCondition {
    public locations: TicTacToeLocation[];
    public rowSize: number;

    constructor(locations: TicTacToeLocation[], rowSize: number) {
        this.locations = locations;
        this.rowSize = rowSize;
    }

    public getLocationKeys = (): number[] => this.locations.map(location => getLocationKey(location, this.rowSize));
}

export class WinConditionTracker {
    private winCondition: WinCondition;
    private locationsToCheckCount: number;
    public currentWinner: string | null = null;
    public outcomeDetermined: boolean = false;

    constructor(winCondition: WinCondition) {
        this.winCondition = winCondition;
        this.locationsToCheckCount = winCondition.locations.length
    }

    public getLocationKeys = (): number[] => this.winCondition.getLocationKeys()

    public processLocation = (player: string | null): void => {
        if (this.outcomeDetermined) {
            return;
        }
        // Initial check
        if (this.locationsToCheckCount === this.winCondition.locations.length) {
            if (player !== null) {
                this.currentWinner = player;
                this.locationsToCheckCount -= 1;
            } else {
                this.locationsToCheckCount = 0;
            }
        } else if (this.currentWinner === player) {
            // not initial check, keep going if same player
            this.locationsToCheckCount -= 1;
        } else {
            // not same player, this win condition cannot be met
            this.currentWinner = null;
            this.locationsToCheckCount = 0;
        }
        if (this.locationsToCheckCount === 0) {
            // keep current winner, no further processing needed
            this.outcomeDetermined = true;
        }
    }
}

// create win conditions, assume square board of size `size` > 0
export const createWinConditions = (size: number): WinCondition[] => {
    const rowWinConditions: WinCondition[] = [];
    for (let row: number = 0; row < size; row++) {
        let locations: TicTacToeLocation[] = [];
        for (let column: number = 0; column < size; column++) {
            locations.push({
                rowIndex: row,
                columnIndex: column,
            });
        }
        rowWinConditions.push(new WinCondition(locations, size));
    }

    const columnWinConditions: WinCondition[] = rowWinConditions.map(
        ((winCondition: WinCondition) => new WinCondition(winCondition.locations.map(
            (location: TicTacToeLocation) => ({
                rowIndex: location.columnIndex,
                columnIndex: location.rowIndex,
            })
        ), size))
    );

    const firstDiagonalWinCondition: WinCondition = new WinCondition(
        rowWinConditions[0].locations.map(
            (location: TicTacToeLocation) => ({
                rowIndex: location.columnIndex,
                columnIndex: location.columnIndex,
            })
        ), size
    );

    const secondDiagonalWinCondition: WinCondition = new WinCondition(
        firstDiagonalWinCondition.locations.map(
            (location: TicTacToeLocation) => ({
                rowIndex: location.rowIndex,
                columnIndex: size - 1 - location.columnIndex,
            })
        ), size
    );

    const cornersWinCondition: WinCondition = new WinCondition(
        [
            {
                rowIndex: 0,
                columnIndex: 0,
            },
            {
                rowIndex: 0,
                columnIndex: size - 1,
            },
            {
                rowIndex: size - 1,
                columnIndex: 0,
            },
            {
                rowIndex: size - 1,
                columnIndex: size - 1,
            }
        ],
        size
    );

    const twoByTwoBoxWinConditions: WinCondition[] = [];
    for (let row: number = 0; row < size - 1; row++) {
        for (let column: number = 0; column < size - 1; column++) {
            twoByTwoBoxWinConditions.push(new WinCondition(
                [
                    {
                        rowIndex: row,
                        columnIndex: column,
                    },
                    {
                        rowIndex: row + 1,
                        columnIndex: column,
                    },
                    {
                        rowIndex: row,
                        columnIndex: column + 1,
                    },
                    {
                        rowIndex: row + 1,
                        columnIndex: column + 1,
                    }
                ],
                size
            ));
        }
    }

    return [
        ...rowWinConditions,
        ...columnWinConditions,
        firstDiagonalWinCondition,
        secondDiagonalWinCondition,
        cornersWinCondition,
        ...twoByTwoBoxWinConditions
    ]
}

export const createWinConditionTrackerMap = (size: number, winConditions?: WinCondition[]): { [key: number]: WinConditionTracker[] } => {
    const winConditionTrackerMap: { [key: number]: WinConditionTracker[] } = {}
    const definedWinConditions: WinCondition[] = winConditions ?? createWinConditions(size);
    definedWinConditions.forEach(
        (winCondition: WinCondition) => {
            const winConditionTracker: WinConditionTracker = new WinConditionTracker(winCondition);
            const locationKeys: number[] = winCondition.getLocationKeys();
            locationKeys.forEach(
                (locationKey: number) => {
                    if (!(locationKey in winConditionTrackerMap)) {
                        winConditionTrackerMap[locationKey] = [];
                    }
                    winConditionTrackerMap[locationKey].push(winConditionTracker);
                }
            )
        }
    )
    return winConditionTrackerMap;
}