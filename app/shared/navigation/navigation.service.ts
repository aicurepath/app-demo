import { Frame } from '@nativescript/core';

export class NavigationService {
    static navigate(path: string, options = {}) {
        Frame.topmost().navigate({
            moduleName: `features/${path}/${path}-page`,
            ...options
        });
    }

    static goBack() {
        Frame.topmost().goBack();
    }
}