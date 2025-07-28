// ITERATION 1
function updateSubtotal(product) {
  const price = parseFloat(product.querySelector('.price span').textContent);
  const quantity = product.querySelector('.quantity input').valueAsNumber;

  const subtotal = price * quantity;
  product.querySelector('.subtotal span').textContent = subtotal.toFixed(2);

  return subtotal;
}

// ITERATION 2 & 3
function calculateAll() {
  const products = document.querySelectorAll('.product');
  let total = 0;

  products.forEach((product) => {
    total += updateSubtotal(product);
  });

  document.querySelector('#total-value span').textContent = total.toFixed(2);
}

// ITERATION 4
function removeProduct(event) {
  const target = event.currentTarget;
  const row = target.closest('.product');
  row.remove();
  calculateAll();
}

// ITERATION 5
function createProduct() {
  const nameInput = document.querySelector(
    '.create-product input[type="text"]'
  );
  const priceInput = document.querySelector(
    '.create-product input[type="number"]'
  );

  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value).toFixed(2);

  if (!name || isNaN(price)) return;

  const table = document.querySelector('#cart tbody');
  const newRow = document.createElement('tr');
  newRow.classList.add('product');

  newRow.innerHTML = `
    <td class="name"><span>${name}</span></td>
    <td class="price">$<span>${price}</span></td>
    <td class="quantity"><input type="number" value="0" min="0" placeholder="Quantity" /></td>
    <td class="subtotal">$<span>0</span></td>
    <td class="action"><button class="btn btn-remove">Remove</button></td>
  `;

  table.appendChild(newRow);

  // Bind remove event to new remove button
  newRow.querySelector('.btn-remove').addEventListener('click', removeProduct);

  // Clear input fields
  nameInput.value = '';
  priceInput.value = '';
}

// Attach all events on load
window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  const removeBtns = document.querySelectorAll('.btn-remove');
  removeBtns.forEach((btn) => {
    btn.addEventListener('click', removeProduct);
  });

  const createBtn = document.getElementById('create');
  createBtn.addEventListener('click', createProduct);
});
