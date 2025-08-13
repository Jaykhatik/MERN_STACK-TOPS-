
function calculateDiscount() {
    var originalPrice = Number(document.getElementById('i1').value) || 0;
    var discountPercent = Number(document.getElementById('i2').value) || 0;

    var discountAmount = (originalPrice * discountPercent) / 100;
    var finalPrice = originalPrice - discountAmount;

    document.getElementById('finalPrice').textContent = finalPrice.toFixed(2);
    document.getElementById('youSave').textContent = discountAmount.toFixed(2);
}

// document.getElementById('i1').oninput = calculateDiscount;
// document.getElementById('i2').oninput = calculateDiscount;
