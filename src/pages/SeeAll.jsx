import React from "react";
import "../styles/style.css";
import "../styles/button.css";
import "../styles/responsive.css";
import { useTranslation } from "react-i18next";
import { baseUrl } from "../baseUrl";
import { getCurrentLanguage } from "../components";
import { useNavigate } from "react-router-dom";
import {
  addTrekkingData,
  addTrekkingPackage,
} from "../reduxStore/trekkingSlice";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useCookies } from "react-cookie";

const SeeAll = ({ SeeAllData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cookie, setCookie, removeCookie] = useCookies();

  const SeeAllDatas = SeeAllData?.homepagePackages || [];

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(false);
  }, []);

  const handleClick = (item) => {
    removeCookie("trekkingData")
    setCookie('trekkingData', item);
    navigate(`/TripDetail/${
        item ?. slug
    }`);
  };

  return (
    <div>
      {loading ? (
        <div className="spinner_main">
          <img
            src={process.env.PUBLIC_URL + "/images/loader.gif"}
            alt="Loader"
            width={"200px"}
            height={"200px"}
          />
        </div>
      ) : (
        <>
          <Helmet>
            <title>{t("packages")}</title>
          </Helmet>
          <section className="contact_us_page pb-5 mt-5">
            <div className="container">
              <div className="row"></div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-12 activities_title pb-4">
                  <h3 className="text-center">
                    {t("discover")}
                  </h3>
                </div>
                {SeeAllDatas &&
                  SeeAllDatas?.map((item, index) => (
                    <div className="col-md-3 pb-4" key={index}>
                      <div className="item text-center">
                        <div className="position_img">
                          <img src={baseUrl + item?.image} alt="English" />
                          <div className="carousel_cont">
                            <h4>
                            {getCurrentLanguage() === "de"
                                        ? item?.title_nep
                                        : item?.title_en}
                            </h4>
                            <p
                              dangerouslySetInnerHTML={{
                                __html:
                                (getCurrentLanguage() === "de" && item.description_nep.length > 201) ? item?.description_nep.slice(0,201) : (getCurrentLanguage() === "de" && item.description_nep.length <= 201) ? item.description_nep : (item?.description_en.length > 201) ? item?.description_en.slice(0,201) : item?.description_en
                              }}
                            ></p>

                            <button
                              className="read_more"
                              onClick={() => handleClick(item)}
                            >
                              {t("more")}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default SeeAll;
