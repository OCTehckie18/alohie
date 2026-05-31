const readline = require('readline');

/**
 * Checks if the check-in date is in the month of June.
 * @param {string} checkInDate - Date in format YYYY-MM-DD
 * @returns {boolean} True if in June, false otherwise
 */
function isJuneBooking(checkInDate) {
  if (!checkInDate) return false;
  // checkInDate is expected to be in YYYY-MM-DD format
  const parts = checkInDate.split('-');
  return parts[1] === '06'; // '06' represents June
}

/**
 * Calculates pricing for a booking, removing the 10% discount if in June.
 * @param {string} checkInDate - Date in format YYYY-MM-DD
 * @param {number} basePrice - Room price per night
 * @param {number} nights - Number of nights
 * @param {string} paymentMethod - 'upi' or 'pay_at_property'
 * @returns {object} Pricing breakdown
 */
function calculatePrice(checkInDate, basePrice, nights, paymentMethod) {
  const isJune = isJuneBooking(checkInDate);
  const originalTotal = basePrice * nights;
  
  let hasDiscount = false;
  let discountPercentage = 0;
  
  if (paymentMethod === 'upi') {
    if (isJune) {
      // 10% discount removed for June bookings
      hasDiscount = false;
      discountPercentage = 0;
    } else {
      hasDiscount = true;
      discountPercentage = 10;
    }
  }

  const discountAmount = hasDiscount ? (originalTotal * 0.10) : 0;
  const finalTotal = originalTotal - discountAmount;
  const advancePayment = paymentMethod === 'upi' ? originalTotal / 2 : 0;

  return {
    isJune,
    originalTotal,
    discountPercentage,
    discountAmount,
    finalTotal,
    advancePayment
  };
}

// If run directly from CLI
if (require.main === module) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('===================================================');
  console.log('    Alohie Lodge Booking & Discount Calculator     ');
  console.log('===================================================');

  rl.question('Enter Check-in Date (YYYY-MM-DD, e.g. 2026-06-15): ', (checkIn) => {
    rl.question('Enter Room Price per night (default: 2000): ', (priceInput) => {
      rl.question('Enter number of nights (default: 1): ', (nightsInput) => {
        rl.question('Enter Payment Method (pay_at_property / upi): ', (paymentMethod) => {
          const basePrice = parseFloat(priceInput) || 2000;
          const nights = parseInt(nightsInput) || 1;
          const selectedMethod = paymentMethod.trim().toLowerCase() === 'upi' ? 'upi' : 'pay_at_property';
          
          const result = calculatePrice(checkIn, basePrice, nights, selectedMethod);
          
          console.log('\n===================================================');
          console.log('               CALCULATION SUMMARY                 ');
          console.log('===================================================');
          console.log(`Check-in Date   : ${checkIn}`);
          console.log(`Is June Booking : ${result.isJune ? 'Yes (10% Discount REMOVED)' : 'No'}`);
          console.log(`Payment Method  : ${selectedMethod === 'upi' ? 'UPI (Online)' : 'Pay at Property'}`);
          console.log(`Nights          : ${nights}`);
          console.log(`Price per night : ₹${basePrice}`);
          console.log(`Original Total  : ₹${result.originalTotal}`);
          console.log(`Discount Applied: ${result.discountPercentage}% (₹${result.discountAmount})`);
          console.log(`Final Total     : ₹${result.finalTotal}`);
          if (selectedMethod === 'upi') {
            console.log(`50% UPI Advance : ₹${result.advancePayment}`);
          }
          console.log('===================================================');
          
          rl.close();
        });
      });
    });
  });
}

module.exports = { isJuneBooking, calculatePrice };
