console.log('====================================');
console.log("Connected");
console.log('====================================');

document.addEventListener('DOMContentLoaded', function () {
    showCategory('Men');
});

function showCategory(category) {
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            const categoryData = data.categories.find(cat => cat.category_name === category);
            renderProducts(categoryData.category_products);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function renderProducts(products) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const badge = product.badge_text ? `<div class="badge">${product.badge_text}</div>` : '';

        const discount = calculateDiscount(product.price, product.compare_at_price);

        productCard.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <div class="item">
           <span class="badge"> ${badge}</span>
         </div>
         <div class="card-data">
            <div class="name"> ${product.title}</div>
            <div> &#8226${product.vendor}</div>
            <div>Rs ${product.price}</div>
            <div><del>${product.compare_at_price}</del></div>
            <div class="discount"> ${discount}% off</div>
         </div>
            <button class="add-to-cart-btn" onclick="addToCart()">Add to Cart</button>
        `;

        productContainer.appendChild(productCard);
    });
}

function calculateDiscount(price, comparePrice) {
    if (!comparePrice) return 0;

    const discount = ((comparePrice - price) / comparePrice) * 100;
    return Math.round(discount);
}

function addToCart() {
    // Implement your add to cart logic here
    console.log('Product added to cart');
}

// button things

