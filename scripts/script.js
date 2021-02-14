// Script.js

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('items') === null) {
    fetchJSON('https://fakestoreapi.com/products').then(data => {
      localStorage.setItem('items', JSON.stringify(data))
    }).then(() => {
      createList();
    });
  } else {
    createList();
  }
});

async function fetchJSON(url) {
  const response = await fetch(url);
  return response.json();
}

async function createList() {
  const items = JSON.parse(localStorage.getItem('items'));
  const productList = document.getElementById('product-list');

  for (let item of items) {
    productList.innerHTML += `<product-item title="${item.title}" price="$${String(item.price)}" img-src="${item.image}"></product-item>`;
  }
}