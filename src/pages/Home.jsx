import React from "react";
import "../styles/style.css";
import "../styles/button.css";
import "../styles/responsive.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { baseUrl } from "../baseUrl";
import { FilterSearch, getCurrentLanguage, Discover } from "../components";

const Index = ({ homeData }) => {
  const { t } = useTranslation();
  const BannerItem = homeData?.banner;
  const aboutItem = homeData?.homepageDescription;
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(false);
  }, []);
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
          <section
            className="main_banner"
            style={{
              backgroundImage: `linear-gradient(rgb(7 7 7 / 44%),rgb(7 7 7 / 44%) 20%), url(${
                baseUrl + BannerItem?.image
              })`,
              backgroundRepeat: "no-repeat",
              objectFit: "cover",
              width: "100%",
              backgroundAttachment: "fixed",
              backgroundSize: "100% 100%",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-12 banner_text">
                  <h2>
                    {getCurrentLanguage() === "de"
                      ? `${BannerItem?.title_nep}`
                      : `${BannerItem?.title_en}`}
                  </h2>

                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        getCurrentLanguage() === "de"
                          ? `${BannerItem?.description_nep}`
                          : `${BannerItem?.description_en}`,
                    }}
                  ></p>
                </div>
                <FilterSearch filter={homeData} />
              </div>
            </div>
          </section>
          <section className="discover">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 d-flex justify-content-between discover_cont">
                  <h2>{t("discover")}</h2>
                  <p className="see_all_d">
                    <Link to={"/SeeAll"}>{t("seeall")}</Link>
                  </p>
                </div>
                <Discover discovery={homeData?.homepagePackages} />
              </div>
            </div>
          </section>
          <section className="discover mb-2">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6 discover_cont">
                  <h2>
                    {getCurrentLanguage() == "en"
                      ? `${aboutItem?.title_en}`
                      : `${aboutItem?.title_nep}`}
                  </h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        getCurrentLanguage() == "en"
                          ? `${aboutItem?.description_en}`
                          : `${aboutItem?.description_en}`,
                    }}
                  ></p>
                  <Link to={"/PlanTrip"}>
                    <button className="plan_trip mt-4 mb-3">
                      {t("trip")}
                    </button>
                  </Link>
                </div>
                <div className="col-md-6 discover_cont text-end">
                  <img src={baseUrl + aboutItem?.image} alt="about" />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Index;
