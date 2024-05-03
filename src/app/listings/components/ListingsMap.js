"use client";

import { useState, useEffect } from "react";
import Map from "../../../components/Map";

export default function ListingsMap(props) {
  const { lat, lng, markersList } = props;

  return (
    <div className="bg-red-900 w-full h-full">
      <Map className="w-full h" lat={lat} lng={lng} markers={markersList} />
    </div>
  );
}
