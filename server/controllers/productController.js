///ADD PRODUCT/////////////////////////////////
const addProduct = (req, res) => {
  try {
    res.send({
        success:true,
        message:"Product is added successfully!",
    })
  } catch (error) {
    console.log("Add product error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
///REMOVE PRODUCT////////////////////////////////
const removeProduct = (req, res) => {};
///LIST PRODUCT//////////////////////////////////////
const listProduct = (req, res) => {
  res.send("List products");
};
///UPDATE PRODUCT//////////////////////////////////
const updateProduct = (req, res) => {};
///DETAIL PRODUCT//////////////////////////////////
const detailProduct = (req, res) => {};

export { addProduct, removeProduct, listProduct, detailProduct };
