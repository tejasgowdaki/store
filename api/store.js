const response = require("../response");

const { computeAmount } = require("../helpers/index");

const generateReceipt = async (req, res) => {
  try {
    const result = await computeAmount(req.body);

    res.status(200).json(response.success({ result }));
  } catch (error) {
    res
      .status(500)
      .json(
        response.error({ message: "Something went wrong. Please try again." })
      );
  }
};

module.exports = { generateReceipt };
