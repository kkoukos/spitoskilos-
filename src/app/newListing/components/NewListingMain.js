"use client";
import { useState } from "react";
import NavBarSticky from "../../../components/NavBarSticky";
import FormNewListing from "./FormNewListing";

export default function NewListingMain() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <NavBarSticky />
      <FormNewListing />
    </div>
  );
}
