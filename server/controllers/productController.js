import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import mongoose from "mongoose";
///ADD PRODUCT/////////////////////////////////
const addProduct = async (req, res) => {
  try {
    const {
      _type,
      name,
      price,
      discountedPercentage,
      category,
      brand,
      badge,
      isAvailable,
      offer,
      description,
      tags,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];

    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Product's name is required!",
      });
    }
    if (!price) {
      return res.status(400).send({
        success: false,
        message: "Product's price is required!",
      });
    }
    if (!category) {
      return res.status(400).send({
        success: false,
        message: "Category of product is required!",
      });
    }
    if (!description) {
      return res.status(400).send({
        success: false,
        message: "Description of product is required!",
      });
    }

    let images = [image1, image2].filter((item) => item !== undefined);
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    let parsedTags;
    try {
      parsedTags = JSON.parse(tags);
    } catch (error) {
      parsedTags = tags ? tags.split(", ").map((tag) => tag.trim()) : [];
    }

    const productData = {
      _type: _type ? _type : "",
      name,
      price: Number(price),
      discountedPercentage: Number(discountedPercentage),
      category,
      brand: brand ? brand : "",
      badge: badge === "true" ? true : false,
      isAvailable: isAvailable === "true" ? true : false,
      offer: offer == "true" ? true : false,
      description,
      tags: tags ? parsedTags : [],
      images: imagesUrl,
    };
    const product = new productModel(productData);
    product.save();
    return res.send({
      success: true,
      message: `${name} is added successfully!`,
    });
  } catch (error) {
    console.log("Add product error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
///REMOVE PRODUCT////////////////////////////////
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Product not found!",
      });
    }
    const product = await productModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: `${product?.name} is deleted successfully!`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal sever error: ${error?.message}`,
    });
  }
};
///LIST PRODUCT//////////////////////////////////////
const listProduct = async (req, res) => {
  try {
    const total = await productModel.countDocuments({});
    const products = await productModel.find({});
    if (total === 0) {
      return res.status(200).json({
        success: true,
        message: "No product found!",
      });
    }
    res.status(200).json({
      success: true,
      total: total,
      products: products,
    });
  } catch (error) {
    console.error("List products information failed: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
///UPDATE PRODUCT//////////////////////////////////
const updateProduct = async (req, res) => {
  try {
  } catch (error) {
    console.error("Update product's information failed: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
///DETAIL PRODUCT//////////////////////////////////
const detailProduct = async (req, res) => {
  try {
    const { id } = req.body;

    // Kiểm tra nếu id bị undefined hoặc null
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required!",
      });
    }

    console.log("Product ID:", id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }
    // Tìm sản phẩm dựa trên _id
    const product = await productModel.findOne({ _id: id });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    } else {
      return res.status(200).json({
        success: true,
        product: product,
      });
    }
  } catch (error) {
    console.error("Detail information load failed:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { addProduct, removeProduct, listProduct, detailProduct };
