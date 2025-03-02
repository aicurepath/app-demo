import { Observable } from '@nativescript/core';
import { HealthPlan } from '../models/health-plan.model';

export class HealthPlanService extends Observable {
    private static instance: HealthPlanService;

    private constructor() {
        super();
    }

    static getInstance(): HealthPlanService {
        if (!HealthPlanService.instance) {
            HealthPlanService.instance = new HealthPlanService();
        }
        return HealthPlanService.instance;
    }

    getHealthPlan(): HealthPlan {
        // Placeholder data - will be replaced with actual API call
        return {
            id: '1',
            title: 'Default Health Plan',
            description: 'Your personalized health plan',
            recipes: [],
            therapies: []
        };
    }
}