"use client";
import { Button } from "@nextui-org/react";
import { ExitToApp } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default async function LogOutButton() {
  const router = useRouter();
  async function handleLogOut(event) {
    event.preventDefault();

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
        router.refresh();
      }
    });
  }
  return (
    <form onSubmit={handleLogOut}>
      <Button isIconOnly color="danger" type="submit" size="sm">
        <ExitToApp />
      </Button>
    </form>
  );
}
