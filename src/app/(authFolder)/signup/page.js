"use client";

import Image from "next/image";

import { useState } from "react";
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
                isInvalid={false}
                errorMessage="test"
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
                isInvalid={false}
                errorMessage="test"
                onChange={(e) => setUsername(e.target.value)}
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
                isInvalid={false}
                errorMessage="test"
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
                errorMessage=""
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
                isInvalid={false}
                errorMessage="test"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
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
