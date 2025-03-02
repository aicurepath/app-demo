import { StackLayout } from '@nativescript/core';

export class ScoreDisplay extends StackLayout {
    private _score: number = 0;

    constructor() {
        super();
    }

    get score(): number {
        return this._score;
    }

    set score(value: number) {
        if (this._score !== value) {
            this._score = value;
            this.notify({ object: this, eventName: 'propertyChange', propertyName: 'score', value });
        }
    }

    onAssessment() {
        console.log('Starting assessment');
    }
}