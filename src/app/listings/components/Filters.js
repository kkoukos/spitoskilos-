"use client";

import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { Button, ButtonGroup, Tooltip } from "@nextui-org/react";
import { Slider } from "@nextui-org/react";
import React from "react";
import Image from "next/image";
import { Dvr, Map, Tune } from "@mui/icons-material";

export default function Filters() {
  const [value, setValue] = React.useState([100, 300]);
  return (
    <>
      <div className="w-full  pt-6 h-24 flex justify-center shadow-sm pb-6">
        <div className="w-full  h-full flex justify-between items-center pl-4 pr-4">
          <div className="flex justify-start w-full gap-6">
            <Select
              label="Rent"
              className="max-w-52"
              variant="bordered"
              color="primary"
            >
              <SelectItem>BUY</SelectItem>
              <SelectItem>RENT</SelectItem>
            </Select>

            <Select
              label="Type"
              selectionMode="multiple"
              variant="bordered"
              color="primary"
              className="max-w-52"
            >
              <SelectItem>Apartment</SelectItem>
              <SelectItem>Studio</SelectItem>
              <SelectItem>Maisonette</SelectItem>
              <SelectItem>Villa</SelectItem>
              <SelectItem>Building</SelectItem>
              <SelectItem>Land</SelectItem>
              <SelectItem>Other</SelectItem>
            </Select>

            <Slider
              label="Price"
              color="primary"
              formatOptions={{ style: "currency", currency: "EUR" }}
              step={10}
              maxValue={1000}
              minValue={0}
              value={value}
              onChange={setValue}
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
