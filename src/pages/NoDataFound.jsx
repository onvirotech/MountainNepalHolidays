import React from "react";
import "../styles/style.css";
import "../styles/button.css";
import "../styles/responsive.css";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const NoDataFound = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t("no_data_found")}</title>
      </Helmet>
      <div className="not_found">
        <img
          src={process.env.PUBLIC_URL + "/images/error.webp"}
          alt="NoDataFound"
        />
      </div>
    </>
  );
};

export default NoDataFound;
