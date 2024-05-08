"use client";

import Image from "next/image";

import { useEffect } from "react";
import LogoBlue from "../../../components/LogoBlue";
import { Button, Input, Link } from "@nextui-org/react";
import { AlternateEmail, LocalPhone, Lock } from "@mui/icons-material";

export default function SignUp() {
  return (
    <div className="flex items-center  w-full h-screen text-primary-text justify-center bg-login-back  bg-center bg-cover bg-no-repeat ">
      <div className=" w-2/5 h-full items-center justify-center flex flex-col ">
        <div className="min-w-32 border h-4/5 min-h-32 text-black  w-3/5 flex flex-col items-center justify-center bg-white gap16 rounded-xl">
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

          <form className="h-3/4 justify-evenly flex-col flex w-4/5">
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
              />
            </div>
            <Button
              type="submit"
              radius="full"
              className=" text-white font-bold"
              color="primary"
              startContent={<Lock />}
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
