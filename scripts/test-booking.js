// scripts/test-booking.js
const { isJuneBooking, calculatePrice } = require('./booking-calculator');

console.log('Running automated booking discount tests...\n');

// Test Case 1: Booking in May (Not June) with UPI (should have 10% discount)
const test1 = calculatePrice('2026-05-15', 2000, 3, 'upi');
console.log('Test 1 (May Booking + UPI):');
console.log(`- Is June Booking? ${test1.isJune}`);
console.log(`- Discount Applied: ${test1.discountPercentage}%`);
console.log(`- Final Price: ₹${test1.finalTotal} (Expected: ₹5400)`);
console.assert(test1.isJune === false, 'Test 1 Failed: isJune should be false');
console.assert(test1.discountPercentage === 10, 'Test 1 Failed: discount should be 10%');
console.assert(test1.finalTotal === 5400, 'Test 1 Failed: final total should be 5400');

// Test Case 2: Booking in June with UPI (should NOT have discount)
const test2 = calculatePrice('2026-06-15', 2000, 3, 'upi');
console.log('\nTest 2 (June Booking + UPI):');
console.log(`- Is June Booking? ${test2.isJune}`);
console.log(`- Discount Applied: ${test2.discountPercentage}%`);
console.log(`- Final Price: ₹${test2.finalTotal} (Expected: ₹6000)`);
console.assert(test2.isJune === true, 'Test 2 Failed: isJune should be true');
console.assert(test2.discountPercentage === 0, 'Test 2 Failed: discount should be 0%');
console.assert(test2.finalTotal === 6000, 'Test 2 Failed: final total should be 6000');

// Test Case 3: Booking in June with Pay at Property (should NOT have discount)
const test3 = calculatePrice('2026-06-15', 2000, 3, 'pay_at_property');
console.log('\nTest 3 (June Booking + Pay at Property):');
console.log(`- Is June Booking? ${test3.isJune}`);
console.log(`- Discount Applied: ${test3.discountPercentage}%`);
console.log(`- Final Price: ₹${test3.finalTotal} (Expected: ₹6000)`);
console.assert(test3.isJune === true, 'Test 3 Failed: isJune should be true');
console.assert(test3.discountPercentage === 0, 'Test 3 Failed: discount should be 0%');
console.assert(test3.finalTotal === 6000, 'Test 3 Failed: final total should be 6000');

console.log('\nAll tests passed successfully!');
