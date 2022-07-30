export const getHourFormat = hourString => {
    let hour = parseInt(hourString.substr(11, 2), 10);
    const minuts = hourString.substr(14, 2);
    let formato = ' AM';
    if (hour > 12) {
        hour -= 12;
        formato = ' PM';
    }
    const aux = hour + ":" + minuts + formato;
    return aux;
}

export const getDate = () => {//obtener la fecha actual YYYY-MM-DD
    const aux = new Date();
    if (aux.getMonth() > 8) {
        return aux.getFullYear() + "-" + (aux.getMonth() + 1) + "-" + (aux.getDate());
    } else {
        return aux.getFullYear() + "-0" + (aux.getMonth() + 1) + "-" + (aux.getDate());
    }
}

export const formatMoney = value => {//da formato a cantidades de dinero
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });
    return formatter.format(value)
}
export const formatDate = (date) => {
    const fecha = new Date(date);
    fecha.setDate(fecha.getDate() + 1);//aumentar un dia porque resateba un dia a la fecha
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return (fecha.toLocaleDateString('es-us', opciones));
}
