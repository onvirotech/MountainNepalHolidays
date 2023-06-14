import React, { useState } from "react";
import "../styles/style.css";
import "../styles/button.css";
import "../styles/responsive.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import getCurrentLanguage from "../components/GetCurrentLanguage";

const FilterSearch = ({ filter }) => {
  const filterDestination = filter?.outbounds;
  const filterPackages = filter?.packages;
  const [outbounds, setOutbounds] = useState("");
  const [noOfDays, setNoOfDays] = useState(1);
  const { t } = useTranslation();
  const navigate = useNavigate();
  function onSubmit(e) {
    e.preventDefault();
    console.log(outbounds);
    const values = {
      destination: e.target.value,
      // packages: e.target.value,
      duration: e.target.value,
    };
    navigate(`/Packages?outbondId=${outbounds}&noOfDays=${noOfDays}`, {
      state: values,
    });
  }

  return (
    <>
      <div className="banner_box">
        <form className="row text-center enquiry_form" onSubmit={onSubmit}>
          <div className="col-md-4 fields">
            <label>
              <select
                name="destination"
                defaultValue=""
                onChange={(e) => setOutbounds(e.target.value)}
              >
                <option value="" disabled hidden>                  
                  {t("destination")}
                </option>
                {filterDestination?.map((item, index) => (
                  <option value={item?.id} key={index}>
                    {getCurrentLanguage() == "en"
                      ? `${item?.title_en}`
                      : `${item?.title_nep}`}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {/* <div className="col-md-3 fields">
                                    <label>
                                        <select name="packages" defaultValue="">
                                            <option value="" disabled hidden>Trek Packages</option>
                                            {filterPackages?.map((item,index)=>                                        
                                         <option value={`/Packages/${item?.slug}`} key={index}>{getCurrentLanguage()=="en"? `${item?.title_en}`:`${item?.title_nep}`}</option>                                         
                                        )}
                                        </select>
                                    </label>
                                </div> */}
          <div className="col-md-4 fields">
            <label>
              <select
                name="duration"
                defaultValue=""
                onChange={(e) => setNoOfDays(e.target.value)}
              >
                <option value="" disabled hidden>
                {t("duration")}
                </option>
                {filterPackages?.map((item, index) => (
                  <option value={item?.duration_en} key={index}>
                    {getCurrentLanguage() == "en"
                      ? `${item?.duration_en}`
                      : `${item?.duration_nep}`}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="col-md-4 submit_button_abroad">
            <button type="submit" className="search_form">
              <FontAwesomeIcon icon={faSearch} />
              &nbsp; {t("search")}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FilterSearch;
