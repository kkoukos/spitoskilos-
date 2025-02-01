"use client";

import Image from "next/image";
import { useState } from "react";
import LogoBlue from "../../../components/LogoBlue";
import { Button, Input, Link } from "@nextui-org/react";
import { AlternateEmail, LocalPhone, Lock } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { validateSignupInput } from "./signupValidation.js";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
    setServerError("");
  };

  async function handleSignUp(event) {
    event.preventDefault();
    setLoading(true);
    setServerError("");

    // Validate all inputs
    const { errors, isValid, sanitizedData } = validateSignupInput(formData);

    if (!isValid) {
      setErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add CSRF token if you have it
          // 'X-CSRF-Token': getCsrfToken(),
        },
        credentials: "same-origin",
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        router.push("/");
      } else {
        setServerError(data.message || "Username already exists");
      }
    } catch (error) {
      setServerError("An error occurred during signup");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center w-full h-screen text-primary-text justify-center bg-login-back bg-center bg-cover bg-no-repeat">
      <div className="w-2/5 h-full items-center justify-center flex flex-col">
        <div className="min-w-[21rem] border h-4/5 min-h-[44rem] text-black w-3/5 flex flex-col items-center justify-center bg-white gap16 rounded-xl">
          <LogoBlue />
          <div className="w-1/2 flex items-center flex flex-col">
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
                name="name"
                label="Name"
                type="text"
                labelPlacement="outside"
                placeholder="Enter your full name"
                variant="faded"
                size="lg"
                value={formData.name}
                isInvalid={!!errors.name}
                errorMessage={errors.name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Input
                name="username"
                label="Username"
                type="text"
                labelPlacement="outside"
                placeholder="Enter your username"
                variant="faded"
                size="lg"
                value={formData.username}
                isInvalid={!!errors.username}
                errorMessage={errors.username}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Input
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                labelPlacement="outside"
                variant="faded"
                size="lg"
                value={formData.password}
                isInvalid={!!errors.password}
                errorMessage={errors.password}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Input
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                labelPlacement="outside"
                startContent={<AlternateEmail />}
                variant="faded"
                size="lg"
                value={formData.email}
                isInvalid={!!errors.email}
                errorMessage={errors.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Input
                name="phone"
                label="Phone"
                type="tel"
                labelPlacement="outside"
                startContent={<LocalPhone />}
                variant="faded"
                size="lg"
                inputMode="numeric"
                value={formData.phone}
                isInvalid={!!errors.phone}
                errorMessage={errors.phone}
                onChange={handleInputChange}
                maxLength={15}
              />
            </div>

            {serverError && (
              <p className="mt-4 text-red-600 text-center">{serverError}</p>
            )}

            <Button
              type="submit"
              radius="full"
              className="text-white font-bold"
              color="primary"
              startContent={!loading && <Lock />}
              isLoading={loading}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
