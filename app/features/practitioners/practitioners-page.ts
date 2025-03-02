import { NavigatedData, Page } from '@nativescript/core';
import { PractitionersViewModel } from './practitioners-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new PractitionersViewModel();
}