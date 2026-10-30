import { strict as assert } from 'assert';
import { describe, it } from 'node:test';
import { createWinConditions, createWinConditionTrackerMap, getLocationKey, WinCondition, WinConditionTracker } from './winCondition';

describe('Win condition functions', () => {
    it('getLocationKey returns correct location', () => {
        assert(getLocationKey({
            rowIndex: 4,
            columnIndex: 5
        }, 10) === 45);
    });

    it('createWinConditionTrackerMap uses passed-in conditions', () => {
        const testWinConditions: WinCondition[] = [];
        const winConditionTrackerMap: { [key: number]: WinConditionTracker[] } = createWinConditionTrackerMap(4, testWinConditions);
        assert(Object.keys(winConditionTrackerMap).length === 0);
    });

    it('createWinConditions returns correct amount of win conditions', () => {
        const winConditions = createWinConditions(5);
        // 5 rows, 5 columns, 2 diagonals, 1 4-corner, 16 2x2
        assert(winConditions.length === 29);
    });

})