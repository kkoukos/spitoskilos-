"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";
import LogoBlue from "../../../components/LogoBlue";
import { Button, Input, Link, user } from "@nextui-org/react";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMess, setErrorMess] = useState(false);

  const router = useRouter();

  async function handleLogIn(event) {
    setLoading(true);
    event.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    response.json().then((data) => {
      const success = data.success;
      if (success) {
        router.push("/");
      } else {
        setErrorMess(true);
        setLoading(false);
      }
    });
  }

  return (
    <div className="flex items-center  w-full h-screen text-primary-text justify-center bg-login-back  bg-center bg-cover bg-no-repeat ">
      <div className=" w-2/5 h-full items-center justify-center flex flex-col ">
        <div className="min-w-[30rem] border h-2/5 min-h-[36rem] text-black  w-1/2 flex flex-col items-center justify-center bg-white gap-8 rounded-xl py-16">
          <LogoBlue />

          <div className="w-1/2 flex items-center flex flex-col">
            {" "}
            <h1 className="font-bold text-2xl text-center">Welcome back!</h1>
            <h2>
              Don&apos;t have an account yet?
              <Link href="/signup" underline="always" color="primary">
                Register.
              </Link>
            </h2>
          </div>

          <form
            className="h-3/4 justify-evenly flex-col flex w-3/5 mb-6 "
            onSubmit={handleLogIn}
          >
            <div>
              <Input
                label="Username/Email"
                type="text"
                labelPlacement="outside"
                variant="faded"
                size="lg"
                isInvalid={errorMess}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div>
              <Input
                label="Password"
                type="text"
                labelPlacement="outside"
                variant="faded"
                size="lg"
                isInvalid={errorMess}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <p className="mt-4 text-red-600">
              &nbsp; {errorMess && "Wrong username/email or password"}{" "}
            </p>
            <Button
              type="submit"
              radius="full"
              className=" text-white font-bold mt-6 text-lg"
              color="primary"
              isLoading={loading}
            >
              LogIn
            </Button>
            {/* <Button
              type="submit"
              radius="sm"
              className=" text-primary text-lg mt-2"
              color="primary"
              variant="bordered"
            >
              SignUp
            </Button> */}
          </form>
        </div>
      </div>
      {/* <div className="bg-login-back  bg-center bg-cover bg-no-repeat w-3/5 h-full flex flex-col items-center justify-center">
        <Logo />
      </div> */}
    </div>
  );
}
