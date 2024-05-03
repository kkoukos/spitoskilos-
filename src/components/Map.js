import React from "react";
import { Marker, GoogleMap, useJsApiLoader } from "@react-google-maps/api";

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

  console.log(lat);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={21}
      onLoad={onLoad}
    >
      {markers.map(({ lat, lng }) => (
        <Marker position={{ lat, lng }} />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}
