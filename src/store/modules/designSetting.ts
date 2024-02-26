import {defineStore} from 'pinia';
import {store} from '..';
import designSetting from '../../settings/designSetting';

interface DesignSettingState {
    darkTheme: boolean;
}

const {darkTheme} = designSetting;

export const useDesignSettingStore = defineStore({
    id: 'app-design-setting',
    state: (): DesignSettingState => ({
        darkTheme
    }),
    getters: {
        getDarkTheme(): boolean {
            return this.darkTheme;
        }
    },
    actions: {
        reserveTheme() {
            this.darkTheme = !this.darkTheme
        }
    },
});

// Need to be used outside the setup
export function useDesignSetting() {
    return useDesignSettingStore(store);
}