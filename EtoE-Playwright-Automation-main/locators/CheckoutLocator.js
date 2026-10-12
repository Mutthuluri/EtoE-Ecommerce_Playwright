const CheckoutLocator = {
  countryInput: 'input[placeholder="Select Country"]',
  dropdown: '.ta-results',
  dropdownButton: 'button',
  cardNumberInput: '.payment__cc .row:has-text("Credit Card Number") input',
  expiryMonthSelect: '.payment__cc .row:has-text("Expiry Date") select',
  cvvInput: '.payment__cc .row:has-text("CVV Code") input',
  nameInput: '.payment__cc .row:has-text("Name on Card") input',
  couponInput: 'input[name="coupon"]',
  applyCouponButton: 'button:has-text("Apply Coupon")',
  placeOrderButton: 'a.btnn.action__submit.ng-star-inserted',
  orderConfirmationText: 'Thankyou for the Order.',
  orderIdLocator: '.em-spacer-1 .ng-star-inserted',
  emailLocator: '.user__name [type="text"]',
  couponAppliedText: 'Coupon Applied'
};

module.exports = { CheckoutLocator };
