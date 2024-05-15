"use client";

import Image from "next/image";

import { useState, useMemo } from "react";
import LogoBlue from "../../../components/LogoBlue";
import { Button, Input, Link } from "@nextui-org/react";
import { AlternateEmail, LocalPhone, Lock } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState(false);

  const validateEmail = (email) =>
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const emailIsInvalid = useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const validateUsername = (username) => /^[a-zA-Z0-9]{7,30}$/.test(username);

  const usernameIsInvalid = useMemo(() => {
    if (username === "") return false;

    return validateUsername(username) ? false : true;
  }, [username]);

  const validateName = (name) =>
    /^[a-zA-Z]+(?:\s[a-zA-Z]+)?(?:\s[a-zA-Z]+)?$/.test(name); // Only alphabetic characters with at most one whitespace

  const nameIsInvalid = useMemo(() => {
    if (name === "") return false;

    return validateName(name) ? false : true;
  }, [name]);

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/.test(password);

  const passwordIsInvalid = useMemo(() => {
    if (password === "") return false;

    return validatePassword(password) ? false : true;
  }, [password]);

  const validatePhoneNumber = (phone) => /^[0-9]{8,15}$/.test(phone);

  const phoneNumberIsInvalid = useMemo(() => {
    if (phone === "") return false;

    return validatePhoneNumber(phone) ? false : true;
  }, [phone]);

  const router = useRouter();

  async function handleSignUp(event) {
    setLoading(true);
    event.preventDefault();

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        username: username,
        password: password,
        email: email,
        phone: phone,
      }),
    });

    response.json().then((data) => {
      const success = data.success;
      if (success) {
        router.push("/");
      } else {
        setUserExists(true);
        setLoading(false);
      }
    });
  }

  return (
    <div className="flex items-center  w-full h-screen text-primary-text justify-center bg-login-back  bg-center bg-cover bg-no-repeat ">
      <div className=" w-2/5 h-full items-center justify-center flex flex-col ">
        <div className="min-w-[21rem] border h-4/5 min-h-[44rem] text-black  w-3/5 flex flex-col items-center justify-center bg-white gap16 rounded-xl">
          <LogoBlue />
          <div className="w-1/2 flex items-center flex flex-col">
            {" "}
            <h1 className="font-bold text-2xl text-center">
              Your new home awaits!
            </h1>
            <h2>
              Already signed up?
              <Link href="/login" underline="always" color="primary">
                Log in.
              </Link>
            </h2>
          </div>

          <form
            className="h-3/4 justify-evenly flex-col flex w-4/5"
            onSubmit={handleSignUp}
          >
            <div>
              <Input
                label="Name"
                type="text"
                labelPlacement="outside"
                placeholder="Enter your full name."
                variant="faded"
                size="lg"
                isInvalid={nameIsInvalid}
                errorMessage="Name should be only alphabetic characters with only 2 whitespaces."
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Input
                label="Username"
                type="text"
                labelPlacement="outside"
                placeholder="Enter your username."
                variant="faded"
                size="lg"
                errorMessage="Username should be longer than 6 characters and only consists of alphanumeric characters."
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUserExists(false);
                }}
                isInvalid={usernameIsInvalid}
              />
            </div>
            <div>
              <Input
                label="Password"
                type="text"
                placeholder="Enter your password"
                labelPlacement="outside"
                variant="faded"
                size="lg"
                isInvalid={passwordIsInvalid}
                errorMessage="Password must contain at least one uppercase letter, one lowercase letter, one numeric digit, and be between 8 and 30 characters long"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Input
                label="Email"
                type="email"
                placeholder=""
                labelPlacement="outside"
                startContent={<AlternateEmail />}
                variant="faded"
                size="lg"
                isInvalid={emailIsInvalid}
                errorMessage="Email is invalid."
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Input
                label="Phone"
                type="tel"
                labelPlacement="outside"
                startContent={<LocalPhone />}
                variant="faded"
                size="lg"
                inputMode="numeric"
                isInvalid={phoneNumberIsInvalid}
                errorMessage="Phone number must contain only numeric characters and be between 8 and 15 digits long"
                onChange={(e) => setPhone(e.target.value)}
                maxLength={10}
              />
            </div>
            <p className="mt-4 text-red-600">
              &nbsp; {userExists && <center>Username already exists.</center>}
            </p>
            <Button
              type="submit"
              radius="full"
              className=" text-white font-bold"
              color="primary"
              startContent={!loading && <Lock />}
              isLoading={loading}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>
      {/* <div className="bg-login-back  bg-center bg-cover bg-no-repeat w-3/5 h-full flex flex-col items-center justify-center">
        <Logo />
      </div> */}
    </div>
  );
}
