import { Observable } from '@nativescript/core';
import { HealthPlan } from '../models/health-plan.model';
import { HealthPlanService } from '../services/health-plan.service';

export class HealthPlanViewModel extends Observable {
    private _healthPlan: HealthPlan;
    private _healthPlanService: HealthPlanService;

    constructor() {
        super();
        this._healthPlanService = HealthPlanService.getInstance();
        this._healthPlan = this._healthPlanService.getHealthPlan();
    }

    get healthPlan(): HealthPlan {
        return this._healthPlan;
    }
}