function addToCart(itemName, price) {
    const cart = document.getElementById('cart-items');
    const li = document.createElement('li');
    //to allow users to remove items in cart
    li.textContent = itemName + " - $" + price.toFixed(2);
    const removebtn = document.createElement('rembt');
    removebtn.textContent = 'Delete';
    removebtn.classList.add('rembt');
    removebtn.onclick = function() {
        li.remove();
        updateTotal(-price); // Subtracts the price when item is removed
    };
    li.appendChild(removebtn);
    cart.appendChild(li);

    // Update total price
    updateTotal(price);
}

function updateTotal(price) {
    const totalPriceElement = document.getElementById('total-price');
    const currentTotal = parseFloat(totalPriceElement.textContent.split(':')[1].trim().replace('$', ''));
    const newTotal = currentTotal + price;
//shows the total price while updating it when multiple items are added
    // Smoothly update the total price using animation
    animateValue(currentTotal, newTotal, 1000, totalPriceElement);
}

function animateValue(start, end, duration, element) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = "Total: $" + ((end - start) * progress + start).toFixed(2);
        if (progress < 1) {
            //start up and show
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function calculateTotal() {
    const cartItems = document.querySelectorAll('#cart-items li');
    let total = 0;
    cartItems.forEach(item => {
        const price = parseFloat(item.textContent.split('-')[1].trim().replace('$', ''));
        total += price;
    });

    alert("Total price of items in the cart: $" + total.toFixed(2));
//shows an alert when clicking on to pay
}