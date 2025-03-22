import React, { useState } from "react";
import Title from "../components/Title";
import { IoMdAdd, IoMdCloudUpload } from "react-icons/io";
const Add = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    discount: "",
    _type: "",
    category: "",
    offer: false,
    available: true,
    badge: false,
    tags: [],
    image1: null,
    image2: null,
  });
  const handleImageChange = (e) =>{
    const { id, files } = e.target;
    setFormData({
      ...formData,
      [id]:files[0],
    });
  };
  console.log(formData);
  return (
    <form className="flex flex-col items-start gap-3 w-full pb-10">
      <Title>Upload products to Database</Title>
      <div className="flex flex-wrap items-center gap-5">
        {
          (["image1", "image2","image3"].map((imageId) => (
            <label htmlFor={imageId} key={imageId}>
              <div className="text-gray-500 border-2 border-gray-500 border-dashed px-4 py-2 hover:border-black duration-300 ease-in-out cursor-pointer rounded-md">
                <IoMdCloudUpload className="text-5xl" />
                <input type="file" hidden id={imageId}  onChange={handleImageChange}/>
                <p>{formData[imageId] ? "Change" : "Upload"}</p>
              </div>
            </label>
          )))
        }
      </div>
    </form>
  );
};

export default Add;
