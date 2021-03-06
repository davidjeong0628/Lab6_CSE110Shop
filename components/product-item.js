// product-item.js

let cartItems = localStorage.getItem('cart');
if (cartItems === null) {
  cartItems = [];
} else {
  cartItems = JSON.parse(cartItems);
}

document.getElementById('cart-count').textContent = cartItems.length;

class ProductItem extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({mode: 'open'});
    
    const wrapper = document.createElement('li');
    wrapper.setAttribute('class', 'product');

    const img = document.createElement('img');
    img.src = this.getAttribute('img-src');

    const title = document.createElement('p');
    title.setAttribute('class', 'title');
    title.textContent = this.getAttribute('title');
    img.setAttribute('alt', this.getAttribute('title'));

    const price = document.createElement('p');
    price.setAttribute('class', 'price');
    price.textContent = this.getAttribute('price');

    const btn = document.createElement('button');
    if (cartItems.includes(this.getAttribute('id'))) {
      btn.textContent = 'Remove from Cart';
    } else {
      btn.textContent = 'Add to Cart';
    }

    btn.addEventListener('click', () => {
      alert('Added to Cart!');
    });
    btn.addEventListener('click', () => {
      if ( (btn.textContent === 'Add to Cart') ) {
        btn.textContent = 'Remove from Cart';
        this.updateCart(this.getAttribute('id'), true);
      } else {
        btn.textContent = 'Add to Cart';
        this.updateCart(this.getAttribute('id'), false);
      }
    });

    const style = document.createElement('style');
    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }
    `;
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(img);
    wrapper.appendChild(title);
    wrapper.appendChild(price);
    wrapper.appendChild(btn);
  }

  updateCart(id, add) {
    const cartCount = document.getElementById('cart-count');
    if (add) {
      cartCount.textContent = Number(cartCount.textContent) + 1;
      cartItems.push(id); 
    } else {
      cartCount.textContent = Number(cartCount.textContent) - 1;
      cartItems.splice(cartItems.indexOf(id), 1); 
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }
}

customElements.define('product-item', ProductItem);