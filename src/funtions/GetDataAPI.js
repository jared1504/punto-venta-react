
export const getProductsAPI = async (token) => {

    try {
        const url = `${import.meta.env.VITE_API_URL}/products`;
        const resp = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const resul = await resp.json();
        //console.log(resul)
        return resul;

    } catch (error) {
        console.log(error);
    }

}


export const getSalesAPI = async (token) => {//obtener todas la ventas de la API
    try {
        const url = `${import.meta.env.VITE_API_URL}/sales`;
        const resp = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const resul = await resp.json();
        return resul;
    } catch (error) {
        console.log(error);
    }
};


export const getOrdersAPI = async (token) => {//obtener todos los pedidos de la API
    try {
        const url = `${import.meta.env.VITE_API_URL}/orders`;
        const resp = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const resul = await resp.json();
       
        return resul;
    } catch (error) {
        console.log(error);
    }
}
