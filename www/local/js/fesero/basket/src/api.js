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