import React, { useState, useCallback } from "react";
import Script from "react-load-script";
import { getTranslations } from "../../../utilities/translations";

const GooglePlace = ({ onselect = () => {} }) => {
  let [autocomplete, setAutocomplete] = useState(null);
  const setPlaces = useCallback(() => {
    const addressObject = autocomplete.getPlace();
    const {
      address_components,
      formatted_address,
      geometry: {
        location: { lat, lng }
      }
    } = addressObject;
    // Check if address is valid
    if (addressObject) {
      const zip = address_components.find(
        (i) => i.types.indexOf("postal_code") > -1
      );
      const city = address_components.find(
        (i) =>
          i.types.indexOf("administrative_area_level_2") > -1 ||
          i.types.indexOf("locality") > -1
      );
      const local = address_components.find(
        (i) =>
          i.types.indexOf("sublocality_level_3") > -1 ||
          i.types.indexOf("sublocality") > -1 ||
          i.types.indexOf("route") > -1 ||
          i.types.indexOf("sublocality_level_1") > -1
      );
      let obj = {
        postal_code: (zip && zip.long_name) || "",
        city: (city && city.long_name) || "",
        local: (local && local.long_name) || "",
        formatted_address,
        lat: lat(),
        lng: lng()
      };

      onselect(obj);
    }
  }, [autocomplete, onselect]);

  const handleScriptLoad = useCallback(() => {
    // Declare Options For Autocomplete
    //  const options = { types: [‘(cities)’] };

    // Initialize Google Autocomplete
    /*global google*/
    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete")
    );

    autocomplete.setFields([
      "address_components",
      "formatted_address",
      "geometry",
      "types"
    ]);
    autocomplete.addListener("place_changed", setPlaces);
  });
  return (
    <>
      <Script
        url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBNZUbdv3yyvvnAOxh33diYantEbTF3ZDk&libraries=places"
        onLoad={handleScriptLoad}
      />
      <div className="col-md-12">
        <label className="input-title">{getTranslations("address")}</label>
        <div className="form-group">
          <div className="position-relative d-flex flex-wrap align-items-center ">
            <input
              id="autocomplete"
              type="text"
              name="place"
              placeholder={getTranslations("enter_address")}
              className="form-control"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GooglePlace;
