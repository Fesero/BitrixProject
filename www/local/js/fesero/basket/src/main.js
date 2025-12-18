import { createApp } from 'vue';
import { createPinia } from 'pinia';
import BasketWidget from './App.vue';

const pinia = createPinia();

const COMPONENTS = {
    'basket-widget': BasketWidget,
};

class AppManager {
    static init() {
        const roots = document.querySelectorAll('[data-component]');
        
        roots.forEach(el => {
            const componentName = el.dataset.component;
            const Component = COMPONENTS[componentName];
            
            if (!Component) return;

            let props = {};
            try {
                props = JSON.parse(el.dataset.initial || '{}');
            } catch (e) {
                console.error('JSON Parse Error', e);
            }

            const app = createApp(Component, { initialConfig: props });
            app.use(pinia);
            app.mount(el);
            
            console.log(`[System] Mounted ${componentName}`);
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AppManager.init());
} else {
    AppManager.init();
}

AppManager.init();