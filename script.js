// Danh sách sản phẩm mẫu
const products = [
  {
    id: 1,
    name: 'Sp 1',
    price: 350000,
    image: 'Sp1.jpg'
  },
  {
    id: 2,
    name: 'Sp 2',
    price: 10000,
    image: 'Sp2.jpg'
  },
  {
    id: 3,
    name: 'Sp 3',
    price: 650000,
    image: 'Sp3.jpg'
  }
]

// Lấy giỏ hàng từ localStorage hoặc khởi tạo mới
let cart = JSON.parse(localStorage.getItem('cart')) || []

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart))
}

function renderProducts() {
  const productList = document.getElementById('product-list')
  productList.innerHTML = ''
  products.forEach((product) => {
    const div = document.createElement('div')
    div.className = 'product'
    div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-name">${product.name}</div>
            <div class="product-price">${product.price.toLocaleString()} VNĐ</div>
            <button class="add-to-cart" onclick="addToCart(${
              product.id
            })">Thêm vào giỏ hàng</button>
        `
    productList.appendChild(div)
  })
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  const cartItem = cart.find((item) => item.id === productId)
  if (cartItem) {
    cartItem.quantity += 1
  } else {
    cart.push({ ...product, quantity: 1 })
  }
  saveCart()
  renderCart()
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)
  saveCart()
  renderCart()
}

function updateQuantity(productId, value) {
  const cartItem = cart.find((item) => item.id === productId)
  if (cartItem) {
    let qty = parseInt(value)
    if (isNaN(qty) || qty < 1) qty = 1
    cartItem.quantity = qty
    saveCart()
    renderCart()
  }
}

function renderCart() {
  const tbody = document.querySelector('#cart-table tbody')
  tbody.innerHTML = ''
  let total = 0
  cart.forEach((item) => {
    const tr = document.createElement('tr')
    const itemTotal = item.price * item.quantity
    total += itemTotal
    tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price.toLocaleString()} VNĐ</td>
            <td><input type="number" min="1" value="${
              item.quantity
            }" onchange="updateQuantity(${item.id}, this.value)"></td>
            <td>${itemTotal.toLocaleString()} VNĐ</td>
            <td><button class="remove-btn" onclick="removeFromCart(${
              item.id
            })">Xóa</button></td>
        `
    tbody.appendChild(tr)
  })
  document.getElementById('total-price').textContent = total.toLocaleString()
}

// Khởi tạo giao diện
renderProducts()
renderCart()
