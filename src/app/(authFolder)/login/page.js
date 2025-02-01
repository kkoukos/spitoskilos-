"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import LogoBlue from "../../../components/LogoBlue";
import { Button, Input, Link } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { EyeFilledIcon } from "./components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "./components/EyeSlashFilledIcon";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { validateLoginInput, validateGoogleCredential } from "./validation";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleError, setGoogleError] = useState("");
  const [clientId, setClientId] = useState(null);

  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!googleClientId) {
      console.error("Google Client ID is not configured");
      setGoogleError("Google login is not configured properly");
    } else {
      setClientId(googleClientId);
    }
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

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
  };

  async function handleLogIn(event) {
    event.preventDefault();
    setLoading(true);

    // Validate input
    const { errors, isValid, sanitizedData } = validateLoginInput(
      formData.username,
      formData.password
    );

    if (!isValid) {
      setErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add CSRF token if you have it
          // 'X-CSRF-Token': getCsrfToken(),
        },
        credentials: "same-origin", // Important for security
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        router.push("/");
      } else {
        setErrors({
          auth: "Invalid credentials",
        });
      }
    } catch (error) {
      setErrors({
        auth: "An error occurred during login",
      });
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleLogin = async (credentialResponse) => {
    setLoading(true);
    setGoogleError("");

    const { errors, isValid } = validateGoogleCredential(
      credentialResponse?.credential
    );

    if (!isValid) {
      setGoogleError(errors.credential || "Invalid Google credentials");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add CSRF token if you have it
        },
        credentials: "same-origin",
        body: JSON.stringify({
          googleCredential: {
            credential: credentialResponse.credential,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        router.push("/");
      } else {
        setGoogleError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Google login error:", error);
      setGoogleError("An error occurred during Google login");
    } finally {
      setLoading(false);
    }
  };

  // Form content remains largely the same but with enhanced error handling
  const content = (
    <div className="flex items-center w-full h-screen text-primary-text justify-center bg-login-back bg-center bg-cover bg-no-repeat">
      <div className="w-2/5 h-full items-center justify-center flex flex-col">
        <div className="min-w-[30rem] border h-2/5 min-h-[36rem] text-black w-1/2 flex flex-col items-center justify-center bg-white gap-8 rounded-xl py-16">
          <LogoBlue />

          <div className="w-1/2 flex items-center flex-col">
            <h1 className="font-bold text-2xl text-center">Welcome back!</h1>
            <h2>
              Don&apos;t have an account yet?
              <Link href="/signup" underline="always" color="primary">
                Register.
              </Link>
            </h2>
          </div>

          <form
            className="h-3/4 justify-evenly flex-col flex w-3/5 mb-6"
            onSubmit={handleLogIn}
          >
            <div>
              <Input
                name="username"
                label="Username/Email"
                type="text"
                labelPlacement="outside"
                variant="faded"
                size="lg"
                isInvalid={!!errors.username || !!errors.auth}
                value={formData.username}
                onChange={handleInputChange}
                errorMessage={errors.username}
              />
            </div>
            <div>
              <Input
                name="password"
                label="Password"
                type={isVisible ? "text" : "password"}
                labelPlacement="outside"
                variant="faded"
                size="lg"
                isInvalid={!!errors.password || !!errors.auth}
                value={formData.password}
                onChange={handleInputChange}
                errorMessage={errors.password}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
              />
            </div>

            <p className="mt-4 text-red-600">
              {errors.auth && errors.auth}
              {googleError && googleError}
            </p>

            <Button
              type="submit"
              radius="full"
              className="text-white font-bold mt-2 text-lg"
              color="primary"
              isLoading={loading}
            >
              LogIn
            </Button>
          </form>

          {clientId && (
            <div className="w-3/5 flex flex-col items-center gap-4">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-2">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    setGoogleError("Google login failed");
                    setLoading(false);
                  }}
                  useOneTap
                  theme="outline"
                  shape="square"
                  size="large"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return clientId ? (
    <GoogleOAuthProvider clientId={clientId}>{content}</GoogleOAuthProvider>
  ) : (
    content
  );
}
