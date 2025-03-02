import { StackLayout } from '@nativescript/core';

export class ActionTile extends StackLayout {
    constructor() {
        super();
        this.className = 'bg-white p-4 rounded-lg shadow-md';
    }

    get icon(): string {
        return this.get('icon');
    }

    set icon(value: string) {
        this.set('icon', value);
    }

    get title(): string {
        return this.get('title');
    }

    set title(value: string) {
        this.set('title', value);
    }
}