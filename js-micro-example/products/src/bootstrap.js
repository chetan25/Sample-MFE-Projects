import faker from 'faker';


const mount = (id) => {
    let products = '';

    Array.from([1,2,3], x => {
        const name = faker.commerce.productName();
        products += `<div>${name}</div>`;  
    });

    document.querySelector(`#${id}`).innerHTML = products;
}

if (process.env.NODE_ENV === 'development') {
    const hostEl = document.querySelector('#products-host');
    if (hostEl)
    mount('products-host');
}

export { mount }
