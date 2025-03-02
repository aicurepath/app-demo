import { Observable } from '@nativescript/core';

export class ScoreDisplayViewModel extends Observable {
    private _score: number = 0;

    constructor() {
        super();
    }

    get score(): number {
        return this._score;
    }

    onAssessment() {
        // Will be implemented when we add navigation
        console.log('Starting assessment');
    }
}