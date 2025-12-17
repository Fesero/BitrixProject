<template>
  <div class="fesero-basket-widget" :class="{ 'loading': store.isLoading }">
    <!-- Header -->
    <div class="header">
      <div class="title">
        <h3>🛒 Корзина</h3>
        <span v-if="store.isSyncing" class="sync-badge">Обновление...</span>
      </div>
      <div class="stats">
        <div class="total-price">{{ formatPrice(store.totalPrice) }}</div>
        <div class="total-count">{{ store.totalCount }} шт.</div>
      </div>
    </div>

    <!-- Error Alert -->
    <div v-if="store.error" class="error-alert">
      {{ store.error }}
      <button @click="store.error = null">✕</button>
    </div>

    <!-- Empty State -->
    <div v-if="!store.hasItems && !store.isLoading" class="empty-state">
      Корзина пуста
    </div>

    <!-- Items List -->
    <div class="items-list" v-else>
      <div 
        v-for="item in store.items" 
        :key="item.id" 
        class="basket-item"
      >
        <div class="item-info">
          <div class="item-name">{{ item.name }}</div>
          <div class="item-price">{{ formatPrice(item.price) }} / шт.</div>
        </div>

        <div class="item-controls">
          <div class="qty-changer">
            <button 
                @click="store.updateQuantity(item.id, item.quantity - 1)"
                :disabled="item.quantity <= 1"
            >-</button>
            <input 
                type="number" 
                :value="item.quantity" 
                readonly
            >
            <button 
                @click="store.updateQuantity(item.id, item.quantity + 1)"
            >+</button>
          </div>
          
          <button 
            class="btn-delete" 
            @click="store.removeItem(item.id)"
            title="Удалить"
          >
             &times;
          </button>
        </div>
      </div>
    </div>
    
    <!-- Footer / Debug (Optional) -->
    <div class="footer">
         <small>System Level 22 Active</small>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useBasketStore } from './stores/basket';

const props = defineProps({
  initialConfig: Object
});

const store = useBasketStore();

// Форматтер валюты (Intl API)
const formatPrice = (value) => {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0
    }).format(value);
};

onMounted(() => {
  // Если данные пришли из PHP при инициализации (initialConfig), применяем их сразу,
  // чтобы избежать лишнего запроса get().
  if (props.initialConfig && props.initialConfig.items) {
      store.applyServerData(props.initialConfig);
  } else {
      store.fetchBasket();
  }
});
</script>

<style scoped>
.fesero-basket-widget {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  width: 320px;
  font-family: 'Open Sans', sans-serif;
  overflow: hidden;
  border: 1px solid #eef2f4;
}

.header {
  padding: 15px;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h3 { margin: 0; font-size: 16px; color: #333; }
.sync-badge { font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 0.5px; animation: pulse 1s infinite; }

.stats { text-align: right; }
.total-price { font-weight: bold; color: #28a745; font-size: 16px; }
.total-count { font-size: 12px; color: #666; }

.items-list {
  max-height: 400px;
  overflow-y: auto;
}

.basket-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.2s;
}

.basket-item:hover { background: #fafafa; }

.item-info { flex: 1; padding-right: 10px; }
.item-name { font-size: 13px; font-weight: 600; line-height: 1.2; margin-bottom: 4px; color: #444; }
.item-price { font-size: 12px; color: #888; }

.item-controls { display: flex; align-items: center; gap: 8px; }

.qty-changer {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.qty-changer button {
  border: none;
  background: none;
  width: 24px;
  height: 24px;
  cursor: pointer;
  color: #555;
  font-weight: bold;
}
.qty-changer button:hover { background: #eee; }
.qty-changer button:disabled { color: #ccc; cursor: default; }

.qty-changer input {
  width: 30px;
  text-align: center;
  border: none;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  font-size: 12px;
  height: 24px;
  padding: 0;
  -moz-appearance: textfield;
}

.btn-delete {
  background: none;
  border: none;
  color: #dc3545;
  font-size: 18px;
  cursor: pointer;
  padding: 0 4px;
  opacity: 0.6;
}
.btn-delete:hover { opacity: 1; }

.error-alert {
  background: #ffebee;
  color: #c62828;
  padding: 10px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}

.empty-state { padding: 30px; text-align: center; color: #999; }

@keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
</style>