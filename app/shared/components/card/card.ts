import { StackLayout } from '@nativescript/core';

export class Card extends StackLayout {
    constructor() {
        super();
        this.className = 'bg-white rounded-lg p-4 shadow-md';
    }
}