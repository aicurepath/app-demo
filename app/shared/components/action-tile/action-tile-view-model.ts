import { Observable } from '@nativescript/core';

export class ActionTileViewModel extends Observable {
    constructor(
        private _icon: string,
        private _title: string,
        private _onTap: () => void
    ) {
        super();
    }

    get icon(): string {
        return this._icon;
    }

    get title(): string {
        return this._title;
    }

    onTap() {
        this._onTap();
    }
}