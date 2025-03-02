import { NavigatedData, Page } from '@nativescript/core';
import { HealthPlanViewModel } from './view-models/health-plan-view-model';
import { NavigationService } from '~/shared/navigation/navigation.service';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new HealthPlanViewModel();
}

export function onBackTap() {
    NavigationService.goBack();
}