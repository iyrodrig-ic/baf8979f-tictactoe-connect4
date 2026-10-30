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
        // process location to determine winner
    }
}