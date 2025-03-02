import { Observable } from '@nativescript/core';
import { NavigationService } from '~/shared/navigation/navigation.service';

export class HomeViewModel extends Observable {
    constructor() {
        super();
    }

    onChatTap() {
        NavigationService.navigate('chat');
    }

    onFindPractitioner() {
        NavigationService.navigate('practitioners');
    }

    onViewHealthPlan() {
        NavigationService.navigate('health-plan');
    }
}