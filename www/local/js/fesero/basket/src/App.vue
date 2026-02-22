<template>
  <div class="bx-basket-wrapper" v-click-outside="closeBasket">
    <!-- Кнопка-триггер: только она влияет на размер шапки -->
    <div class="bx-basket-trigger" @click="toggleBasket" :class="{ 'is-active': isOpen }">
      <div class="trigger-icon">
        <span class="badge" v-if="store.totalCount > 0">{{ store.totalCount }}</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
      </div>
      <div class="trigger-text">
        <span class="label">Корзина</span>
        <span class="value">{{ formatPrice(store.totalPrice) }}</span>
      </div>
    </div>

    <!-- Выпадающая панель: Position Absolute -->
    <transition name="dropdown-anime">
      <div v-if="isOpen" class="bx-basket-dropdown">
        <header class="dropdown-header">
          <span>Ваши товары ({{ store.totalCount }})</span>
          <button @click="isOpen = false" class="close-flyout">&times;</button>
        </header>

        <div class="dropdown-scroll-area">
          <div v-if="!store.hasItems" class="empty-state">
            <p>Корзина пуста</p>
          </div>
          
          <div v-for="item in store.items" :key="item.id" class="mini-item">
            <img :src="item.image" class="mini-img">
            <div class="mini-info">
              <div class="mini-name">{{ item.name }}</div>
              <div class="mini-meta">
                <span class="mini-qty">{{ item.quantity }} x</span>
                <span class="mini-price">{{ formatPrice(item.price) }}</span>
              </div>
            </div>
            <button @click="store.removeItem(item.id)" class="mini-remove">×</button>
          </div>
        </div>

        <footer class="dropdown-footer">
          <div class="total-row">
            <span>Итого:</span>
            <strong>{{ formatPrice(store.totalPrice) }}</strong>
          </div>
          <a href="/personal/cart" class="btn-go-to-cart">Перейти в корзину</a>
          <button class="btn-checkout-fast">Быстрый заказ</button>
        </footer>
      </div>
    </transition>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useBasketStore } from './stores/basket';
  
  const store = useBasketStore();

  store.fetchBasket();

  store.initGlobalListeners();

  const isOpen = ref(false);
  
  const toggleBasket = () => {
    isOpen.value = !isOpen.value;
  };
  
  const closeBasket = () => {
    isOpen.value = false;
  };
  
  const vClickOutside = {
    mounted(el, binding) {
      el.clickOutsideEvent = (event) => {
        if (!(el === event.target || el.contains(event.target))) {
          binding.value();
        }
      };
      document.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el) {
      document.removeEventListener('click', el.clickOutsideEvent);
    }
  };
  
  const formatPrice = (v) => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(v);
  </script>

<style scoped>
  .bx-basket-wrapper {
    position: relative; /* Критично для позиционирования выпадашки */
    display: inline-block;
    font-family: 'Open Sans', sans-serif;
  }
  
  /* Триггер - компактная кнопка в шапке */
  .bx-basket-trigger {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 16px;
    background: #f8f9fa;
    border-radius: 50px;
    border: 1px solid #e1e4e8;
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;
  }
  
  .bx-basket-trigger:hover {
    background: #fff;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    border-color: #2fc6f6;
  }
  
  .trigger-icon {
    position: relative;
    color: #2fc6f6;
  }
  
  .badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #ff4d4f;
    color: #fff;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 10px;
    font-weight: bold;
    border: 2px solid #fff;
  }
  
  .trigger-text {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }
  
  .trigger-text .label { font-size: 11px; color: #828b95; }
  .trigger-text .value { font-size: 14px; font-weight: 700; color: #333c47; }
  
  /* Выпадающая панель - не ломает верстку! */
  .bx-basket-dropdown {
    position: absolute;
    top: calc(100% + 15px);
    right: 0;
    width: 320px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 15px 40px rgba(0,0,0,0.15);
    border: 1px solid #eef2f4;
    z-index: 9999; /* Поверх всего */
    overflow: hidden;
    transform-origin: top right;
  }
  
  /* Анимация */
  .dropdown-anime-enter-active, .dropdown-anime-leave-active {
    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .dropdown-anime-enter-from, .dropdown-anime-leave-to {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  
  .dropdown-header {
    padding: 15px;
    background: #f8f9fa;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    font-size: 13px;
  }
  
  .dropdown-scroll-area {
    max-height: 350px;
    overflow-y: auto;
  }
  
  .mini-item {
    display: flex;
    align-items: center;
    padding: 12px;
    gap: 12px;
    border-bottom: 1px solid #f5f7f8;
  }
  
  .mini-img { width: 48px; height: 48px; object-fit: cover; border-radius: 6px; background: #eee; }
  .mini-info { flex: 1; }
  .mini-name { font-size: 13px; color: #333; margin-bottom: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .mini-meta { font-size: 12px; color: #828b95; }
  .mini-price { font-weight: 700; color: #333; margin-left: 5px; }
  
  .mini-remove { background: none; border: none; color: #ccc; cursor: pointer; font-size: 18px; }
  .mini-remove:hover { color: #ff4d4f; }
  
  .dropdown-footer {
    padding: 15px;
    border-top: 2px solid #f0f3f5;
    background: #fff;
  }
  
  .total-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    font-size: 16px;
  }
  
  .btn-go-to-cart, .btn-checkout-fast {
    display: block;
    width: 100%;
    text-align: center;
    padding: 10px;
    border-radius: 6px;
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  .btn-go-to-cart { background: #f0f3f5; color: #333c47; }
  .btn-checkout-fast { background: #2fc6f6; color: #fff; border: none; cursor: pointer; }
  .btn-checkout-fast:hover { background: #1eb5e5; }
  </style>