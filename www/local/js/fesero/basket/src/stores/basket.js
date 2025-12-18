import { defineStore } from 'pinia';
import { basketApi } from '../api';

const debounce = (fn, ms) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), ms);
    };
};

export const useBasketStore = defineStore('basket', {
    state: () => ({
        items: [],
        totalPrice: 0,
        totalCount: 0,
        isLoading: false,
        isSyncing: false,
        error: null,
        _debounceTimers: new Map(), 
    }),

    getters: {
        hasItems: (state) => state.items.length > 0,
    },

    actions: {
        async fetchBasket() {
            if (this.isLoading) return;
            this.isLoading = true;
            try {
                const data = await basketApi.get();
                this.applyServerData(data);
            } catch (err) {
                this.error = "Ошибка загрузки корзины";
                console.error(err);
            } finally {
                this.isLoading = false;
            }
        },

        applyServerData(data) {
            this.items = data.items || [];
            this.totalPrice = data.totalPrice;
            this.totalCount = data.totalCount;

            this.notifyOtherTabs();
        },

        async addToBasket(productId) {
            this.isSyncing = true;
            try {
                const data = await basketApi.add(productId, 1);
                this.applyServerData(data);
            } catch (err) {
                this.error = err.message;
            } finally {
                this.isSyncing = false;
            }
        },

        async removeItem(basketItemId) {
            const originalItems = [...this.items];
            this.items = this.items.filter(item => item.id !== basketItemId);
            
            try {
                const data = await basketApi.delete(basketItemId);
                this.applyServerData(data);
            } catch (err) {
                this.items = originalItems;
                this.error = "Не удалось удалить товар";
                console.error(err);
            }
        },

        updateQuantity(basketItemId, newQuantity) {
            if (newQuantity < 1) return; 

            const item = this.items.find(i => i.id === basketItemId);
            if (!item) return;

            item.quantity = newQuantity;

            if (this._debounceTimers.has(basketItemId)) {
                clearTimeout(this._debounceTimers.get(basketItemId));
            }

            const timeoutId = setTimeout(async () => {
                this.isSyncing = true;
                try {
                    const data = await basketApi.update(basketItemId, newQuantity);
                    this.applyServerData(data);
                } catch (err) {
                    console.error(err);
                } finally {
                    this.isSyncing = false;
                    this._debounceTimers.delete(basketItemId);
                }
            }, 600);

            this._debounceTimers.set(basketItemId, timeoutId);
        },

        initGlobalListeners() {
            const debouncedFetch = debounce(() => {
                console.log('[BasketStore] Sync triggered by external event');
                this.fetchBasket();
            }, 150);

            if (typeof window.BX !== 'undefined') {
                window.BX.addCustomEvent('OnBasketChange', () => {
                    debouncedFetch();
                });
                
                window.BX.addCustomEvent(window, 'OnBasketChange', () => {
                    debouncedFetch();
                });
            }

            window.addEventListener('storage', (event) => {
                if (event.key === 'app_basket_updated_timestamp') {
                    debouncedFetch();
                }
            });
        },

        notifyOtherTabs() {
            localStorage.setItem('app_basket_updated_timestamp', Date.now().toString());
        }
    }
});