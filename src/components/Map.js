import React, { useEffect } from "react";
import {
  Marker,
  GoogleMap,
  useJsApiLoader,
  MarkerClusterer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function Map(props) {
  let { lat, lng, markers } = props;

  lat = parseFloat(lat);
  lng = parseFloat(lng);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API,
  });

  const onLoad = (map) => {
    const bounds = new google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };

  const center = {
    lat: lat,
    lng: lng,
  };

  const customMarker = {
    path: "M 0 -1 A 1 1 0 0 0 0 1 A 1 1 0 0 0 0 -1",
    fillColor: "#14293A",
    fillOpacity: 10,
    strokeColor: "white",
    strokeWeight: 2,
    rotation: 0,
    scale: 6,
  };

  console.log(lat);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={21}
      onLoad={onLoad}
    >
      {markers.map(({ lat, lng }, index) => (
        <Marker position={{ lat, lng }} key={index} icon={customMarker} />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}
