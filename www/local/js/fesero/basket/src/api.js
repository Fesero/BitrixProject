export const basketApi = {
    request(action, data = {}, method = 'POST') {
        let url = `/api/v1/basket/${action}`;

        if (data?.productId) url += `/${data.productId}`

        if (data?.quantity) url += `/${data.quantity}`

        return new Promise((resolve, reject) => {
            BX.ajax({
                method: method,
                url: url,
                data: data,
                dataType: 'json',
                onsuccess: (response) => {
                    if (response.status === 'success') {
                        resolve(response.data);
                    } else {
                        reject(new Error(response.errors?.[0]?.message || 'Error'));
                    }
                },
                onfailure: (err) => reject(err)
            });
        });
    },

    get() {
        return this.request('get', {}, 'GET');
    },

    add(productId, quantity = 1) {
        return this.request('add', { 'productId': productId, 'quantity': quantity });
    },

    update(productId, quantity) {
        return this.request('update', { 'productId': productId, 'quantity': quantity });
    },

    delete(productId) {
        return this.request('delete', { 'productId': productId });
    }
}

export const orderApi = {
    /**
     * @param {Object} dto - данные заказа
     * @param {number} dto.personTypeId - тип покупателя (1 = физлицо)
     * @param {number} dto.deliveryServiceId   - ID службы доставки
     * @param {number} dto.paySystemId  - ID платёжной системы
     * @param {Object} dto.properties   - свойства заказа (NAME, EMAIL, PHONE, ADDRESS)
     */
    async create(dto) {
        const url = '/api/v1/order/create';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify(dto),
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();

        if (result.status === 'error') {
            const message = result.errors?.[0]?.message || 'Ошибка создания заказа';
            throw new Error(message);
        }

        return result.data;
    }
};