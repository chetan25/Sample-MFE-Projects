import faker from 'faker';

const cartLabel = `<div>You have ${faker.random.number()} in your cart`;


// when we create a element with id as 'carts', browser will create a global variable with the same name
// so when we have the same name in our ModuleFederation plugin it will get overrwritten by the browser created variable and 
// we can get error like 'fn is not a function'
document.querySelector('#carts').innerHTML = cartLabel;