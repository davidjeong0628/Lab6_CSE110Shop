// Script.js

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('items') === null) {
    fetchJSON('https://fakestoreapi.com/products').then(data => {
      localStorage.setItem('items', JSON.stringify(data));
    });
  }
});

async function fetchJSON(url) {
  const response = await fetch(url);
  return response.json();
}