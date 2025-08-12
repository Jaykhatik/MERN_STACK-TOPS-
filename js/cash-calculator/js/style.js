function calculateTotals() {
    var totalCash = 0;
    var totalNotes = 0;

    // Row 1 (₹2000)
    var qty2000 = parseInt(document.getElementById('qty2000').value) || 0;
    document.getElementById('total2000').textContent = qty2000 * 2000;
    totalCash += qty2000 * 2000;
    totalNotes += qty2000;
    // Row 2 (₹500)
    var qty500 = parseInt(document.getElementById('qty500').value) || 0;
    document.getElementById('total500').textContent = qty500 * 500;
    totalCash += qty500 * 500;
    totalNotes += qty500;

    // Row 3 (₹200)
    var qty200 = parseInt(document.getElementById('qty200').value) || 0;
    document.getElementById('total200').textContent = qty200 * 200;
    totalCash += qty200 * 200;
    totalNotes += qty200;

    // Row 4 (₹100)
    var qty100 = parseInt(document.getElementById('qty100').value) || 0;
    document.getElementById('total100').textContent = qty100 * 100;
    totalCash += qty100 * 100;
    totalNotes += qty100;

    // Row 5 (₹50)
    var qty50 = parseInt(document.getElementById('qty50').value) || 0;
    document.getElementById('total50').textContent = qty50 * 50;
    totalCash += qty50 * 50;
    totalNotes += qty50;

    // Row 6 (₹20)
    var qty20 = parseInt(document.getElementById('qty20').value) || 0;
    document.getElementById('total20').textContent = qty20 * 20;
    totalCash += qty20 * 20;
    totalNotes += qty20;

    // Row 7 (₹10)
    var qty10 = parseInt(document.getElementById('qty10').value) || 0;
    document.getElementById('total10').textContent = qty10 * 10;
    totalCash += qty10 * 10;
    totalNotes += qty10;

    // Row 8 (₹5)
    var qty5 = parseInt(document.getElementById('qty5').value) || 0;
    document.getElementById('total5').textContent = qty5 * 5;
    totalCash += qty5 * 5;
    totalNotes += qty5;

    // Row 9 (₹2)
    var qty2 = parseInt(document.getElementById('qty2').value) || 0;
    document.getElementById('total2').textContent = qty2 * 2;
    totalCash += qty2 * 2;
    totalNotes += qty2;

    // Row 10 (₹1)
    var qty1 = parseInt(document.getElementById('qty1').value) || 0;
    document.getElementById('total1').textContent = qty1 * 1;
    totalCash += qty1 * 1;
    totalNotes += qty1;
    // Update totals
    document.getElementById('totalCash').textContent = totalCash;
    document.getElementById('totalNotes').textContent = totalNotes;
    document.getElementById('totalWords').textContent = numberToWords(totalCash) + " Rupees";
    // Simple number to words (Indian style up to crores)
    function numberToWords(num) {
        var a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
            'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        var b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

        if (num === 0) return 'Zero';
        if (num < 20) return a[num];
        if (num < 100) return b[Math.floor(num / 10)] + (num % 10 ? " " + a[num % 10] : "");
        if (num < 1000) return a[Math.floor(num / 100)] + " Hundred" + (num % 100 ? " " + numberToWords(num % 100) : "");
        if (num < 100000) return numberToWords(Math.floor(num / 1000)) + " Thousand" + (num % 1000 ? " " + numberToWords(num % 1000) : "");
        if (num < 10000000) return numberToWords(Math.floor(num / 100000)) + " Lakh" + (num % 100000 ? " " + numberToWords(num % 100000) : "");
        return numberToWords(Math.floor(num / 10000000)) + " Crore" + (num % 10000000 ? " " + numberToWords(num % 10000000) : "");
    }
}