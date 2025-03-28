import React, { useState } from "react";
import Title from "../components/Title";
import {
  IoIosArrowDown,
  IoMdAdd,
  IoMdArrowDown,
  IoMdCloudUpload,
} from "react-icons/io";
import Input, { Label } from "../components/ui/input";
import SmallLoader from "../components/SmallLoader";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Add = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    discount: "",
    _type: "",
    category: "",
    offer: false,
    isAvailable: true,
    badge: false,
    tags: [],
    image1: null,
    image2: null,
  });
  const handleImageChange = (e) => {
    const { id, files } = e.target;
    setFormData({
      ...formData,
      [id]: files[0],
    });
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  return (
    <form className="flex flex-col items-start gap-3 w-full pb-60">
      <Title>Upload products to Database</Title>
      <div className="flex flex-wrap items-center gap-5">
        {["image1", "image2"].map((imageId) => (
          <label htmlFor={imageId} key={imageId}>
            <div className="text-gray-500 border-2 border-gray-500 border-dashed px-4 py-2 hover:border-black duration-300 ease-in-out cursor-pointer rounded-md">
              {formData[imageId] ? (
                <img
                  src={URL.createObjectURL(formData[imageId])}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded-md"
                />
              ) : (
                <IoMdCloudUpload className="w-20 h-20" />
              )}
              <input
                type="file"
                hidden
                id={imageId}
                onChange={handleImageChange}
              />
              <p className=" items-center text-center mt-1">
                {formData[imageId] ? "Change" : "Upload"}
              </p>
            </div>
          </label>
        ))}
      </div>
      <div className="flex flex-col w-full gap-1">
        <Label htmlFor={"name"}>Product name</Label>
        <Input
          type={"text"}
          placeholder={"Enter product name here"}
          name="name"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col w-full gap-1">
        <Label htmlFor={"description"}>Product description</Label>
        <textarea
          rows={4}
          type="text"
          placeholder="Enter product description..."
          name="description"
          onChange={handleChange}
          className="border px-4 py-2 border-gray-500 rounded-md max-w-lg resize-none"
        />
      </div>
      <div className="flex flex-col w-full gap-1">
        <Label htmlFor={"brand"}>Product brand</Label>
        <Input
          type={"text"}
          placeholder={"Enter product brand here"}
          name="brand"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-5">
        <div className="flex flex-col w-full gap-1">
          <Label htmlFor={"price"}>Product price</Label>
          <Input
            type={"number"}
            placeholder={"Enter product price here"}
            name="price"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col w-full gap-1">
          <Label htmlFor={"discount"}>Product discount</Label>
          <Input
            type={"number"}
            placeholder={"Enter product discount here...%"}
            name="discount"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-5">
        <div className="flex flex-col w-full gap-1 relative">
          <Label htmlFor={"_type"}>Product type</Label>
          <select
            name="_type"
            onChange={handleChange}
            className="border px-4 pr-6 py-2 border-gray-500 rounded-md max-w-[150px] appearance-none relative"
          >
            <option value={""}>Select Type</option>
            <option value={"new_arrivals"}>New Arrivals</option>
            <option value={"best_sellers"}>Best Sellers</option>
            <option value={"special_offers"}>Special Offers</option>
            <option value={"promotions"}>Promotions</option>
          </select>
          <IoIosArrowDown className="text-sm absolute top-10 right-2" />
        </div>
        <div className="flex flex-col w-full gap-1 relative">
          <Label htmlFor={"category"}>Product category</Label>
          <select
            name="category"
            onChange={handleChange}
            className="border pl-4 pr-6 py-2 border-gray-500 rounded-md max-w-[170px] appearance-none relative"
          >
            <option value={""}>Select category</option>
            <option value={"men"}>Men</option>
            <option value={"women"}>Women</option>
            <option value={"kids"}>Kids</option>
            <option value={"accessories"}>Accessories</option>
            <option value={"others"}>Others</option>
          </select>
          <IoIosArrowDown className="text-sm absolute top-10 right-2" />
        </div>
        <div className="flex flex-col w-full gap-1 relative">
          <Label htmlFor={"offer"}>Offer</Label>
          <select
            name="offer"
            onChange={handleChange}
            className="border px-4 pr-6 py-2 border-gray-500 rounded-md max-w-[150px] appearance-none relative"
          >
            <option value={"false"}>False</option>
            <option value={"true"}>True</option>
          </select>
          <IoIosArrowDown className="text-sm absolute top-10 right-2" />
        </div>
        <div className="flex flex-col w-full gap-1 relative">
          <Label htmlFor={"isAvailable"}>Available</Label>
          <select
            name="isAvailable"
            onChange={handleChange}
            className="border pl-4 pr-6 py-2 border-gray-500 rounded-md max-w-[150px] appearance-none relative"
          >
            <option value={"true"}>True</option>
            <option value={"false"}>False</option>
          </select>
          <IoIosArrowDown className="text-sm absolute top-10 right-2" />
        </div>
        <div className="flex flex-col w-full gap-1 relative">
          <Label htmlFor={"badge"}>Badge</Label>
          <select
            name="badge"
            onChange={handleChange}
            className="border pl-4 pr-6 py-2 border-gray-500 rounded-md max-w-[150px] appearance-none relative"
          >
            <option value={"false"}>False</option>
            <option value={"true"}>True</option>
          </select>
          <IoIosArrowDown className="text-sm absolute top-10 right-2" />
        </div>
      </div>
      <div className="flex flex-col gap-1 items-start ">
        <Label htmlFor={"tags"}>Tags</Label>
        <div>
          {["Fashion", "Electronics", "Sports", "Accessories", "Others"].map(
            (tag) => (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={tag.toLowerCase()}
                  name="tags"
                  value={tag}
                  className="cursor-pointer"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData((prevData) => ({
                        ...prevData,
                        tags: [...prevData.tags, tag],
                      }));
                    } else {
                      setFormData((prevData) => ({
                        ...prevData,
                        tags: prevData.tags.filter((t) => t !== tag),
                      }));
                    }
                  }}
                />
                <p>{tag}</p>
              </div>
            )
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-black/80 text-white uppercase font-semibold flex items-center justify-center gap-2 tracking-wide w-44 py-2.5 rounded-md hover:bg-black duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Add
        {loading ? (
          <span className="text-white animate-spin">
            <AiOutlineLoading3Quarters />
          </span>
        ) : (
          <IoMdAdd className="text-lg mt-0.5" />
        )}
      </button>
    </form>
  );
};

export default Add;
