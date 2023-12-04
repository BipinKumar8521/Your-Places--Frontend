import React from "react";
import "./Map.css";

// import GoogleMapReact from "google-map-react";

export default function Map(props) {
  return (
    <div className={`map ${props.className}`}>
      {/* <GoogleMapReact
        defaultCenter={props.center}
        defaultZoom={props.zoom}
        yesIWantToUseGoogleMapApiInternals
      ></GoogleMapReact> */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6173564335163!2d-73.9882393245223!3d40.74844453538455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sin!4v1701674358168!5m2!1sen!2sin"
        width="100%"
        height="100%"
        title="Map"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
