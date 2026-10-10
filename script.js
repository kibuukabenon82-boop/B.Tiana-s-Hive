const cartItemsList = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const clearCartButton = document.getElementById('clear-cart');

const cart = [];

function renderCart() {
  if (!cartItemsList || !cartCount || !clearCartButton) return;

  if (cart.length === 0) {
    cartItemsList.innerHTML = '<li class="cart-empty">Your cart is empty. Add a style you like.</li>';
    cartCount.textContent = '0';
    clearCartButton.disabled = true;
    return;
  }

  cartItemsList.innerHTML = cart
    .map(
      (item) => `
        <li>
          <span>${item}</span>
          <button type="button" class="remove-item" data-item="${item}">Remove</button>
        </li>
      `
    )
    .join('');

  cartCount.textContent = String(cart.length);
  clearCartButton.disabled = false;

  document.querySelectorAll('.remove-item').forEach((button) => {
    button.addEventListener('click', () => {
      const itemToRemove = button.dataset.item;
      const index = cart.indexOf(itemToRemove);
      if (index !== -1) {
        cart.splice(index, 1);
        renderCart();
      }
    });
  });
}

document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const product = button.closest('.gallery-card')?.dataset.product;
    if (!product) return;

    cart.push(product);
    renderCart();
  });
});

clearCartButton?.addEventListener('click', () => {
  cart.length = 0;
  renderCart();
});

renderCart();
