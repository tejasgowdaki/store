const categories = {
  Medicine: {
    isTaxApplied: true,
    isSlabApplied: false,
    taxRate: 5
  },
  Food: {
    isTaxApplied: true,
    isSlabApplied: false,
    taxRate: 5
  },
  Imported: {
    isTaxApplied: true,
    isSlabApplied: false,
    taxRate: 18
  },
  Book: {
    isTaxApplied: false,
    isSlabApplied: false,
    taxRate: 0
  },
  Clothes: {
    isTaxApplied: true,
    isSlabApplied: true,
    taxRate: 0,
    slabs: [
      { isLastSlab: false, minAmount: 0, maxAmount: 999, taxRate: 5 },
      { isLastSlab: true, minAmount: 1000, taxRate: 12 }
    ]
  },
  Music: {
    isTaxApplied: true,
    isSlabApplied: false,
    taxRate: 3
  }
};

const discount = { price: 2000, percentage: 5 };

module.exports = Object.freeze({
  categories,
  discount
});
