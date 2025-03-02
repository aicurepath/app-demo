import { StackLayout } from '@nativescript/core';
import { HealthPlan } from '../../models/health-plan.model';

export class PlanSummary extends StackLayout {
    private _plan: HealthPlan;

    constructor() {
        super();
        this.className = 'p-4';
    }

    get plan(): HealthPlan {
        return this._plan;
    }

    set plan(value: HealthPlan) {
        if (this._plan !== value) {
            this._plan = value;
            this.notify({ 
                object: this, 
                eventName: 'propertyChange', 
                propertyName: 'plan', 
                value 
            });
        }
    }
}