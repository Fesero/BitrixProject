<template>
    <div class="checkout-overlay" @click.self="$emit('close')">
      <div class="checkout-panel">
        
        <header class="checkout-header">
          <h3>Оформление заказа</h3>
          <button @click="$emit('close')" class="btn-close">&times;</button>
        </header>
  
        <div v-if="successOrderId" class="success-state">
          <div class="success-icon">✓</div>
          <h4>Заказ #{{ successOrderId }} оформлен!</h4>
          <p>Мы свяжемся с вами в ближайшее время.</p>
          <button @click="$emit('close')" class="btn-primary">Закрыть</button>
        </div>
  
        <form v-else @submit.prevent="handleSubmit" class="checkout-form">
  
          <div class="form-group" :class="{ 'has-error': errors.name }">
            <label>ФИО *</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Иван Иванов"
              @input="clearError('name')"
            />
            <span v-if="errors.name" class="error-msg">{{ errors.name }}</span>
          </div>
  
          <div class="form-group" :class="{ 'has-error': errors.email }">
            <label>Email *</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="ivan@example.com"
              @input="clearError('email')"
            />
            <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
          </div>
  
          <div class="form-group" :class="{ 'has-error': errors.phone }">
            <label>Телефон *</label>
            <input
              v-model="form.phone"
              type="tel"
              placeholder="+7 (900) 000-00-00"
              @input="clearError('phone')"
            />
            <span v-if="errors.phone" class="error-msg">{{ errors.phone }}</span>
          </div>
  
          <div class="form-group" :class="{ 'has-error': errors.address }">
            <label>Адрес доставки *</label>
            <textarea
              v-model="form.address"
              placeholder="г. Москва, ул. Пушкина, д. 1, кв. 1"
              rows="2"
              @input="clearError('address')"
            ></textarea>
            <span v-if="errors.address" class="error-msg">{{ errors.address }}</span>
          </div>
  
          <div class="order-summary">
            <span>Товаров: {{ basketStore.totalCount }} шт.</span>
            <strong>{{ formatPrice(basketStore.totalPrice) }}</strong>
          </div>
  
          <div v-if="serverError" class="server-error">
            {{ serverError }}
          </div>
  
          <button
            type="submit"
            class="btn-primary btn-submit"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">Оформляем...</span>
            <span v-else>Оформить заказ</span>
          </button>
        </form>
  
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  import { useBasketStore } from '../stores/basket';
  import { orderApi } from '../api';
  
  const emit = defineEmits(['close']);
  
  const basketStore = useBasketStore();
  
  const form = reactive({
      name: '',
      email: '',
      phone: '',
      address: '',
  });
  
  const errors = reactive({
      name: '',
      email: '',
      phone: '',
      address: '',
  });
  
  const isSubmitting = ref(false);
  const serverError = ref('');
  const successOrderId = ref(null);
  
  const clearError = (field) => {
      errors[field] = '';
  };
  
  const validate = () => {
      let isValid = true;
  
      if (!form.name.trim()) {
          errors.name = 'Введите ФИО';
          isValid = false;
      } else if (form.name.trim().length < 3) {
          errors.name = 'ФИО слишком короткое';
          isValid = false;
      }
  
      if (!form.email.trim()) {
          errors.email = 'Введите email';
          isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
          errors.email = 'Некорректный email';
          isValid = false;
      }
  
      if (!form.phone.trim()) {
          errors.phone = 'Введите телефон';
          isValid = false;
      } else if (form.phone.replace(/\D/g, '').length < 10) {
          errors.phone = 'Телефон слишком короткий';
          isValid = false;
      }
  
      if (!form.address.trim()) {
          errors.address = 'Введите адрес доставки';
          isValid = false;
      }
  
      return isValid;
  };
  
  const handleSubmit = async () => {
      if (!validate()) return;
  
      serverError.value = '';

      isSubmitting.value = true;
  
      try {
          const dto = {
              personTypeId: 1,
              deliveryServiceId: 1,
              paySystemId: 1,
              properties: {
                  NAME: form.name.trim(),
                  EMAIL: form.email.trim(),
                  PHONE: form.phone.trim(),
                  ADDRESS: form.address.trim(),
              },
          };
  
          const data = await orderApi.create(dto);
  
          successOrderId.value = data?.order?.orderId ?? data?.orderId;
  
          await basketStore.fetchBasket();
  
      } catch (err) {
          serverError.value = err.message || 'Неизвестная ошибка';
      } finally {
          isSubmitting.value = false;
      }
  };
  
  const formatPrice = (v) => new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
  }).format(v);
  </script>
  
  <style scoped>
  .checkout-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
  }
  
  .checkout-panel {
      background: #fff;
      border-radius: 12px;
      width: 100%;
      max-width: 480px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }
  
  .checkout-header {
      padding: 20px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  
  .checkout-header h3 {
      margin: 0;
      font-size: 18px;
      color: #333;
  }
  
  .btn-close {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #999;
      line-height: 1;
  }
  
  .checkout-form {
      padding: 20px;
  }
  
  .form-group {
      margin-bottom: 16px;
  }
  
  .form-group label {
      display: block;
      font-size: 13px;
      color: #555;
      margin-bottom: 6px;
      font-weight: 600;
  }
  
  .form-group input,
  .form-group textarea {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
      transition: border-color 0.2s;
      box-sizing: border-box;
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
      outline: none;
      border-color: #2fc6f6;
  }
  
  /* Стили для поля с ошибкой */
  .form-group.has-error input,
  .form-group.has-error textarea {
      border-color: #ff4d4f;
  }
  
  .error-msg {
      display: block;
      color: #ff4d4f;
      font-size: 12px;
      margin-top: 4px;
  }
  
  .order-summary {
      display: flex;
      justify-content: space-between;
      padding: 12px;
      background: #f8f9fa;
      border-radius: 6px;
      margin-bottom: 16px;
      font-size: 14px;
  }
  
  .server-error {
      background: #fff2f0;
      border: 1px solid #ffccc7;
      color: #ff4d4f;
      padding: 10px 12px;
      border-radius: 6px;
      font-size: 13px;
      margin-bottom: 16px;
  }
  
  .btn-primary {
      display: block;
      width: 100%;
      padding: 12px;
      background: #2fc6f6;
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
  }
  
  .btn-primary:hover:not(:disabled) {
      background: #1eb5e5;
  }
  
  .btn-primary:disabled {
      background: #b0e8fb;
      cursor: not-allowed;
  }
  
  /* Экран успеха */
  .success-state {
      padding: 40px 20px;
      text-align: center;
  }
  
  .success-icon {
      width: 60px;
      height: 60px;
      background: #52c41a;
      color: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      margin: 0 auto 16px;
  }
  
  .success-state h4 {
      font-size: 20px;
      margin-bottom: 8px;
  }
  
  .success-state p {
      color: #777;
      margin-bottom: 20px;
  }
  </style>
  