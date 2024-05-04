"use client";

import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { Button, ButtonGroup, Tooltip } from "@nextui-org/react";
import { Slider } from "@nextui-org/react";
import React from "react";
import Image from "next/image";
import { Dvr, Map, Tune } from "@mui/icons-material";

export default function Filters({
  listings,
  filteredListings,
  setFilteredListings,
}) {
  const [type, setType] = React.useState();

  const [subCategory, setSubCategory] = React.useState(new Set());

  const [category, setCategory] = React.useState("");

  const [price, setPrice] = React.useState([100, 300]);
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(1000000);

  React.useEffect(() => {
    if (listings.length > 0) {
      let maxPrice = Math.max(...listings.map((listing) => listing.price));
      setMaxPrice(maxPrice);
    }
    setPrice([minPrice, maxPrice]);
  }, []);

  const sub_categories_houses = [
    "Apartment",
    "Studio",
    "Maisonette",
    "Villa",
    "Building",
    "Other",
  ];
  const categories = ["House", "Commercial", "Land", "Other"];

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

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  React.useEffect(() => {
    let templist = listings;

    // Checking if subCategory Set is empty

    if (subCategory.size !== 0) {
      templist = templist.filter((listing) =>
        subCategory.has(listing.propertyCategory)
      );
    }

    if (price[0] > 0 || price[1] !== maxPrice) {
      templist = templist.filter(
        (listing) => price[0] <= listing.price && listing.price <= price[1]
      );
    }

    setFilteredListings(templist);
  }, [category, subCategory, price]);

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
              defaultSelectedKeys={["buy"]}
              // selectedKeys={[type]}
              onSelectionChange={handleTypeChange}
            >
              <SelectItem value={"buy"} key={"buy"}>
                BUY
              </SelectItem>
              <SelectItem value={"rent"} key={"rent"}>
                RENT
              </SelectItem>
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
                <SelectItem key={tcategory}>{tcategory}</SelectItem>
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
              {sub_categories_houses.map((tcategory, index) => (
                <SelectItem key={tcategory}>{tcategory}</SelectItem>
              ))}
            </Select>

            <Slider
              label="Price"
              color="primary"
              formatOptions={{ style: "currency", currency: "EUR" }}
              step={maxPrice / 10000}
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
