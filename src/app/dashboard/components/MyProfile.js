"use client";

import TempPic from "../../../../public/pfp.jpg";
import { League_Spartan } from "next/font/google";
import { Button, Input } from "@nextui-org/react";
import {
  Clear,
  Delete,
  Edit,
  Logout,
  Preview,
  Save,
  Upload,
} from "@mui/icons-material";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import AlertDialog from "./AlertDialog";

export default function MyProfile({ user }) {
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [editing, setEditing] = useState(false);
  const [file, setFile] = useState(null);

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function handleEdit(type) {
    if (type === 0) {
      const response = await fetch("/api/user/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      router.refresh();
    }

    setEditing(!editing);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
    });
  }

  async function handleLogOut() {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    response.json().then((data) => {
      console.log(data);
      const success = data.success;
      console.log(success);
      if (success) {
        router.push("/");
      }
    });
  }

  async function handleDelete() {
    const response = await fetch("/api/auth/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user.username }),
    });

    console.log(response);

    response.json().then((data) => {
      console.log(data);
      const success = data.success;
      console.log(success);
      if (success) {
        router.push("/");
      }
    });
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  async function handleUpload() {
    setLoadingUpload(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", user.username);
    const response = await fetch("/api/uploadUserPhoto", {
      method: "POST",
      body: formData,
    });
    console.log(response);
    response.json().then((data) => {
      console.log(data);
      if (data.success) {
        setLoadingUpload(false);
        router.refresh();
      }
    });
  }

  const validateEmail = (email) =>
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  const emailIsInvalid = useMemo(() => {
    const { email } = formData; // Destructure email from formData
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [formData]);

  const validateName = (name) =>
    /^[a-zA-Z]+(?:\s[a-zA-Z]+)?(?:\s[a-zA-Z]+)?$/.test(name); // Only alphabetic characters with at most one whitespace

  const nameIsInvalid = useMemo(() => {
    const { name } = formData; // Destructure name from formData
    if (name === "") return false;

    return validateName(name) ? false : true;
  }, [formData]);

  const validatePhoneNumber = (phone) => /^[0-9]{8,15}$/.test(phone);

  const phoneNumberIsInvalid = useMemo(() => {
    const { phone } = formData; // Destructure phone from formData
    if (phone === "") return false;

    return validatePhoneNumber(phone) ? false : true;
  }, [formData]);
  return (
    <>
      <h1 className="font-bold text-4xl w-[90%] ">My Profile</h1>
      <div className="h-4/5 bg-[#14293A] border-t-1 border-gray-700 w-[90%] flex items-center">
        <div className="w-[40%] h-4/5 flex flex-col items-center gap-6 border-r-1 border-gray-700">
          {user.profile_picture === "" && (
            <img
              src={TempPic.src}
              className="w-3/5 border-1 rounded-xl border-gray-500 h-3/5 max-h-72"
            />
          )}
          {user.profile_picture !== "" && (
            <img
              src={user.profile_picture}
              className="w-3/5 border-1 rounded-xl border-gray-500 h-3/5 max-h-72"
            />
          )}

          <div className="w-3/5 flex justify-between">
            <Button
              isIconOnly
              color="danger"
              aria-label="Delete photo."
              size="lg"
            >
              <Delete />
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="w-3/4 text-white hover:text-black"
              startContent={!loadingUpload && <Upload />}
              onPress={handleUpload}
              isLoading={loadingUpload}
            >
              UPLOAD
            </Button>
          </div>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="w-[60%] h-4/5 flex items-start flex-col gap-6 text-xl justify-between ">
          <div className="ml-5 pl-4 w-4/5 gap-4 flex flex-col border-b-1 border-gray-700 pb-2 ">
            <h1 className="text-2xl font-bold">General Information</h1>
            {!editing && (
              <>
                <div className="flex justify-between w-full">
                  <div className="w-3/4 flex flex-col gap-1">
                    <p>Name:</p>
                    <div className="text-gray-400 truncate">{user.name}</div>
                  </div>
                  <div className="w-3/4 flex flex-col gap-1">
                    <p>Username:</p>
                    <div className="text-gray-400 truncate">
                      {user.username}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between w-full">
                  <div className="w-3/4 flex flex-col gap-1">
                    <p>Email:</p>
                    <div className="text-gray-400 truncate">{user.email}</div>
                  </div>
                  <div className="w-3/4 flex flex-col gap-1">
                    <p>Phone:</p>
                    <div className="text-gray-400 truncate">{user.phone}</div>
                  </div>
                </div>
                <div className=" flex gap-4 items-center">
                  <Button
                    size="xl"
                    startContent={<Edit />}
                    onPress={() => handleEdit(1)}
                  >
                    <span className="tracking-wide">Edit Profile</span>
                  </Button>
                  <Button
                    color="danger"
                    size="xl"
                    variant="flat"
                    startContent={<Logout />}
                    onPress={handleLogOut}
                  >
                    Log Out
                  </Button>
                  <Button
                    color="danger"
                    size="xl"
                    variant="bordered"
                    startContent={<Delete />}
                    onPress={handleOpenDialog}
                  >
                    Delete Account
                    <AlertDialog
                      open={open}
                      onClose={handleCloseDialog}
                      onAgree={handleDelete}
                    />
                  </Button>
                </div>
              </>
            )}
            {editing && (
              <>
                <div className="flex flex-col justify-between w-full gap-2 ">
                  <div className="w-3/4 flex gap-1 items-start  justify-between">
                    <p className="h-[40px]">Name:</p>
                    <Input
                      name="name"
                      className="w-3/4"
                      value={formData.name}
                      onChange={handleChange}
                      isInvalid={nameIsInvalid}
                      errorMessage="Name should be only alphabetic characters with only 2 whitespaces."
                    />
                  </div>

                  <div className="w-3/4 flex  gap-1 items-start justify-between">
                    <p className="h-[40px]">Email:</p>
                    <Input
                      name="email"
                      className="w-3/4"
                      value={formData.email}
                      onChange={handleChange}
                      errorMessage="Email is invalid."
                      isInvalid={emailIsInvalid}
                    />
                  </div>
                  <div className="w-3/4 flex  gap-1 items-start justify-between">
                    <p className="h-[40px]">Phone:</p>
                    <Input
                      name="phone"
                      className="w-3/4"
                      value={formData.phone}
                      onChange={handleChange}
                      isInvalid={phoneNumberIsInvalid}
                      errorMessage="Phone number must contain only numeric characters and be between 8 and 15 digits long"
                      maxLength={10}
                    />
                  </div>
                  <div className="mt-6 flex justify-between w-3/4">
                    <Button
                      size="xl"
                      startContent={<Save />}
                      onPress={() => handleEdit(0)}
                      className="w-[40%]"
                    >
                      <span className="tracking-wide">Save</span>
                    </Button>
                    <Button
                      size="xl"
                      color="danger"
                      startContent={<Clear />}
                      onPress={() => handleEdit(1)}
                      className="w-[40%]"
                    >
                      <span className="tracking-wide">Cancel</span>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
