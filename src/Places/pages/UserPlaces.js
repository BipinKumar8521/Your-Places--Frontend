import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

export default function UserPlaces() {
  const DUMMY_PLACES = [
    {
      id: "p1",
      title: "Empire State Building",
      description: "One of the most famous sky scrapers in the world!",
      imageUrl:
        "https://www.esbnyc.com/sites/default/files/2020-01/ESB%20Day.jpg",
      address: "20 W 34th  St, New York, NY 10001",
      location: {
        lat: 40.7484405,
        lng: -73.9878584,
      },
      creator: "u1",
    },
    {
      id: "p2",
      title: "Empire State Building",
      description: "One of the most famous sky scrapers in the world!",
      imageUrl:
        "https://s-i.huffpost.com/gen/1359704/images/o-EMPIRE-STATE-BUILDING-facebook.jpg",
      address: "20 W 34th  St, New York, NY 10001",
      location: {
        lat: 40.7484405,
        lng: -73.9878584,
      },
      creator: "u2",
    },
  ];

  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => {
    return place.creator === userId;
  });
  return <PlaceList items={loadedPlaces} />;
}
