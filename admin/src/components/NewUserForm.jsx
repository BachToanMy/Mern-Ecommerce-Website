import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
import Input, { Label } from "./ui/input";
import toast from "react-hot-toast";
import { serverUrl } from "../../config.js";
import axios from "axios";
export default function NewUserForm({
  isOpen,
  setIsOpen,
  close,
  selectedUser,
  setSelectedUser,
  getUsersList,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser?.name || "",
        email: selectedUser?.email || "",
        password: "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  }, [selectedUser, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddOrUpdateUser = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (selectedUser) {
        response = await axios.put(
          `${serverUrl}api/user/update/${selectedUser?._id}`,
          formData
        );
      } else {
        response = await axios.post(`${serverUrl}api/user/register`, formData);
      }
      const data = await response?.data;
      if (data?.success) {
        toast.success(data?.message);
        setIsOpen(false);
        getUsersList();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("Update user error: ", error);
      toast.error(error?.response?.data?.message || "An error occured");
    }
  };
  return (
    <>
      {isOpen && (
        <div className="fixed w-full min-h-screen bg-black/70 top-0 left-0">
          <Dialog
            open={isOpen}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={close}
          >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel
                  className={
                    "w-full max-w-xl rounded-lg px-10 py-5 bg-white shadow-md shadow-orange-200 border border-gray-300 text-black"
                  }
                >
                  <div className="flex items-center justify-between">
                    <DialogTitle>
                      {selectedUser ? "Edit User" : "Add User"}
                    </DialogTitle>
                    <IoMdClose
                      onClick={() => setIsOpen(false)}
                      className="text-lg hover:text-red-600 duration-300 cursor-pointer"
                    />
                  </div>
                  <div className="mt-3">
                    <form
                      onSubmit={handleAddOrUpdateUser}
                      className="flex flex-col gap-5"
                    >
                      <div className="flex flex-col gap-1">
                        <Label>Enter Name</Label>
                        <Input
                          id="name"
                          type="text"
                          name="name"
                          placeholder={"Enter your name..."}
                          onChange={handleChange}
                          value={formData.name}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label>Email</Label>
                        <Input
                          id="email"
                          type="email"
                          name="email"
                          placeholder={"Enter your email..."}
                          onChange={handleChange}
                          value={formData.email}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label>Password</Label>
                        <Input
                          id="password"
                          type="password"
                          name="password"
                          placeholder={"Enter your password..."}
                          onChange={handleChange}
                          value={formData.password}
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-black/80 text-white w-32 py-2 rounded-md text-sm font-semibold hover:bg-black duration-300"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </div>
      )}
    </>
  );
}

NewUserForm.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  close: PropTypes.func,
  selectedUser: PropTypes.object,
  setSelectedUser: PropTypes.func,
  getUsersList: PropTypes.object,
};
