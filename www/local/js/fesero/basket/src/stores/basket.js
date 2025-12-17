import { defineStore } from 'pinia';
import { basketApi } from '../api';

export const useBasketStore = defineStore('basket', {
    state: () => ({
        items: [], // Массив объектов
        totalPrice: 0,
        totalCount: 0,
        isLoading: false,
        isSyncing: false, // Флаг фоновой синхронизации
        error: null,
        
        // Хранилище таймеров для debounce: Map<itemId, timeoutId>
        _debounceTimers: new Map(), 
    }),

    getters: {
        hasItems: (state) => state.items.length > 0,
    },

    actions: {
        // Инициализация (первая загрузка)
        async fetchBasket() {
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

        // Применение данных от сервера (DRY - Don't Repeat Yourself)
        applyServerData(data) {
            this.items = data.items || [];
            this.totalPrice = data.totalPrice;
            this.totalCount = data.totalCount;
        },

        async addToBasket(productId) {
            this.isSyncing = true;
            try {
                // Тут оптимистично добавить сложно, так как мы не знаем ID записи корзины заранее.
                // Поэтому просто спиннер или ждем.
                const data = await basketApi.add(productId, 1);
                this.applyServerData(data);
            } catch (err) {
                this.error = err.message;
            } finally {
                this.isSyncing = false;
            }
        },

        async removeItem(basketItemId) {
            // 1. Optimistic Update: Удаляем из UI мгновенно
            const originalItems = [...this.items]; // бэкап на случай ошибки
            this.items = this.items.filter(item => item.id !== basketItemId);
            
            try {
                const data = await basketApi.delete(basketItemId);
                this.applyServerData(data);
            } catch (err) {
                this.items = originalItems; // Rollback
                this.error = "Не удалось удалить товар";
                console.error(err);
            }
        },

        // DEBOUNCED UPDATE
        updateQuantity(basketItemId, newQuantity) {
            // 0. Валидация
            if (newQuantity < 1) return; 

            // 1. Находим товар локально
            const item = this.items.find(i => i.id === basketItemId);
            if (!item) return;

            // 2. Optimistic Update UI
            item.quantity = newQuantity;
            // Можно пересчитать локально total, но точная цена с скидками известна только серверу.
            // Для простоты оставим пока старый total, он обновится после ответа.

            // 3. Debounce Logic
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
                    // Тут можно сделать rollback или показать уведомление
                } finally {
                    this.isSyncing = false;
                    this._debounceTimers.delete(basketItemId);
                }
            }, 600); // 600ms задержка

            this._debounceTimers.set(basketItemId, timeoutId);
        }
    }
});