const { categories, discount } = require("../constant");

/**
 * calculate tax by slab
 * @param {Number} amount
 * @param {Array} slabs
 * @return {Object}
 */
const calculateSlabTax = (amount, slabs) => {
  try {
    const slab = slabs.find(
      s =>
        amount >= s.minAmount && (s.isLastSlab ? true : amount <= s.maxAmount)
    );
    const totalTax = amount * (slab.taxRate / 100);
    return { taxRate: slab.taxRate, totalTax };
  } catch (error) {
    throw error;
  }
};

const calculateTax = (item, category) => {
  return new Promise((resolve, reject) => {
    try {
      const total = item.quantity * item.price;
      let taxRate = 0;
      let totalTax = 0;

      if (category.isSlabApplied) {
        const taxData = calculateSlabTax(total, category.slabs);
        taxRate = taxData.taxRate;
        totalTax = taxData.totalTax;
      } else {
        taxRate = category.taxRate;
        totalTax = total * (category.taxRate / 100);
      }

      resolve({
        taxRate,
        total,
        taxAmount: totalTax,
        totalWithTax: total + totalTax
      });
    } catch (error) {
      reject(error);
    }
  });
};

const calculateTotalAmountForItem = async item => {
  try {
    const category = categories[item.itemCategory];

    if (category.isTaxApplied) {
      const taxData = await calculateTax(item, category);

      return { ...item, ...taxData };
    }

    const total = item.quantity * item.price;
    return {
      ...item,
      taxRate: 0,
      total,
      taxAmount: 0,
      totalWithTax: total
    };
  } catch (error) {
    throw error;
  }
};

/**
 * calculate total amount and with tax and discount
 * @param {Array} items
 * @return {Object}
 */
const computeAmount = async items => {
  try {
    let resultItemPromises = [];
    for (const item of items) {
      resultItemPromises.push(calculateTotalAmountForItem(item));
    }

    let resultItems = await Promise.all(resultItemPromises);

    // let resultItems = await Promise.all(
    //   items.map(i => calculateTotalAmountForItem(i))
    // );

    const grandTotal = resultItems.reduce(
      (total, item) => (total += item.totalWithTax),
      0
    );

    let discountPercentage = 0;
    let discountAmount = 0;
    let grandTotalWithDiscount = grandTotal;

    if (grandTotal > discount.price) {
      discountPercentage = discount.percentage;
      discountAmount = grandTotal * (discount.percentage / 100);
      grandTotalWithDiscount = grandTotal - discountAmount;
    }

    resultItems = resultItems.sort((a, b) => a.totalWithTax - b.totalWithTax);

    return {
      grandTotal,
      discountPercentage,
      discountAmount,
      grandTotalWithDiscount,
      items: resultItems
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { computeAmount };

// for (const item of items) {
//   const category = categories[item.itemCategory];

//   if (category.isTaxApplied) {
//     const taxData = calculateTax(item, category);

//     resultItems.push({ ...item, ...taxData });

//     grandTotal += taxData.totalWithTax;
//   } else {
//     const total = item.quantity * item.price;
//     resultItems.push({
//       ...item,
//       taxRate: 0,
//       total,
//       taxAmount: 0,
//       totalWithTax: total
//     });
//     grandTotal += total;
//   }
// }
