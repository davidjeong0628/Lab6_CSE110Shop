// Script.js

window.addEventListener('DOMContentLoaded', () => {
  fetchJSON('https://fakestoreapi.com/products').then(data => {console.log(data);});
});

async function fetchJSON(url) {
  const response = await fetch(url);
  return response.json();
}