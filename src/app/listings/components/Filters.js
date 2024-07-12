"use client";

import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { Button, ButtonGroup, Tooltip } from "@nextui-org/react";
import { Slider } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Dvr, Map, Tune } from "@mui/icons-material";
import { useSearchParams } from "next/navigation";

export default function Filters({
  listings,
  filteredListings,
  setFilteredListings,
  category_temp,
  type_temp,
}) {
  const [type, setType] = React.useState(
    new Set([type_temp.toLowerCase()]) || ""
  );

  const [subCategoryChoices, setSubcategoryChoices] = useState([]);

  const [subCategory, setSubCategory] = React.useState(new Set());

  const [category, setCategory] = React.useState(
    new Set([category_temp.toLowerCase()]) || ""
  );

  const [price, setPrice] = React.useState([100, 300]);
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(1000000);

  React.useEffect(() => {
    if (listings.length === 0) {
      // Handle the case where filteredListings is empty
      console.warn("No filtered listings available.");
      return; // Exit the useEffect early
    }
    // Calculate minPrice and maxPrice
    const prices = listings.map((listing) => listing.price);
    const validPrices = prices.filter((price) => !isNaN(price)); // Filter out NaN prices

    let maxPrice = Math.max(...validPrices);

    if (!isNaN(maxPrice)) {
      // Update state with both minPrice and maxPrice

      setMaxPrice(maxPrice);
      setPrice([0, maxPrice]);
    }
  }, [listings]);

  React.useEffect(() => {
    console.log(category);
    if (category.has("house")) {
      setSubcategoryChoices(sub_categories_houses);
    }
    if (category.has("commercial")) {
      setSubcategoryChoices(sub_categories_commercial);
    }
    if (category.has("land")) {
      setSubcategoryChoices(sub_categories_land);
    }
  }, [category]);

  const type_options = ["Buy", "Rent"];

  const sub_categories_houses = [
    "Apartment",
    "Studio",
    "Maisonette",
    "Villa",
    "Building",
    "Other",
  ];
  const sub_categories_commercial = ["Office", "Store", "Warehouse", "Other"];
  const sub_categories_land = ["Plot", "Other"];
  const categories = ["House", "Commercial", "Land"];

  const floors = [
    "Basement",
    "Lower Ground",
    "Ground Floor",
    "1st Floor",
    "2nd Floor",
    "3rd Floor",
    "4th Floor",
    "5th Floor",
    "6th Floor+",
  ];

  React.useEffect(() => {
    let templist = listings;

    templist = templist.filter((listing) =>
      type.has(listing.type.toLowerCase())
    );

    if (category.size !== 0) {
      templist = templist.filter(
        (listing) =>
          listing.propertyMainCategory &&
          category.has(listing.propertyMainCategory.toLowerCase())
      );
    }

    if (subCategory.size !== 0) {
      templist = templist.filter((listing) =>
        subCategory.has(listing.propertyCategory.toLowerCase())
      );
    }

    if (price[0] > 0 || price[1] !== maxPrice) {
      templist = templist.filter(
        (listing) => price[0] <= listing.price && listing.price <= price[1]
      );
    }

    setFilteredListings(templist);
  }, [category, subCategory, price, type]);

  return (
    <>
      <div className="w-full  pt-6 h-24 flex justify-center shadow-sm pb-6">
        <div className="w-full  h-full flex justify-between items-center pl-4 pr-4">
          <div className="flex justify-start w-full gap-6">
            <Select
              label="Type"
              className="max-w-52"
              variant="bordered"
              color="primary"
              selectedKeys={type}
              onSelectionChange={setType}
            >
              {type_options.map((ttype) => (
                <SelectItem
                  key={ttype.toLowerCase()}
                  value={ttype.toLowerCase()}
                >
                  {ttype}
                </SelectItem>
              ))}
            </Select>

            <Select
              label="Category"
              className="max-w-52"
              variant="bordered"
              color="primary"
              selectedKeys={category}
              onSelectionChange={setCategory}
            >
              {categories.map((tcategory) => (
                <SelectItem key={tcategory.toLowerCase()}>
                  {tcategory}
                </SelectItem>
              ))}
            </Select>

            <Select
              label="Subcategory"
              selectionMode="multiple"
              variant="bordered"
              color="primary"
              className="max-w-52"
              value={subCategory}
              onSelectionChange={setSubCategory}
            >
              {subCategoryChoices.map((tcategory, index) => (
                <SelectItem key={tcategory.toLowerCase()}>
                  {tcategory}
                </SelectItem>
              ))}
            </Select>

            <Slider
              label="Price"
              color="primary"
              formatOptions={{ style: "currency", currency: "EUR" }}
              step={maxPrice / 20000}
              maxValue={maxPrice}
              minValue={minPrice}
              value={price}
              onChange={setPrice}
              className="max-w-sm"
            />

            <Button color="primary" variant="ghost" size="lg" isIconOnly>
              <Tune fontSize="xl" />
            </Button>
          </div>

          <ButtonGroup>
            <Tooltip content="Show only listings.">
              <Button color="primary" variant="ghost" size="lg" isIconOnly>
                <Dvr fontSize="xl" />
              </Button>
            </Tooltip>
            <Tooltip content="Show map and listings.">
              <Button color="primary" variant="shadow" size="lg" isIconOnly>
                <Map fontSize="xl"></Map>
              </Button>
            </Tooltip>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
}
