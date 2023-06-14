import React from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css"; // Import additional CSS if needed

const AllCountryFlags = ({ country, setCountry }) => {
  return (
    <>
      <PhoneInput
        country={country}
        value={country}
        onChange={(value) => setCountry(value)}
        inputProps={{
          name: "country",
          placeholder: "",
        }}
        containerStyle={{ width: "120px" }}
        defaultCountry="np"
        required
      />
    </>
  );
};

export default AllCountryFlags;
