import React from "react";
import "../styles/style.css";
import "../styles/button.css";
import "../styles/responsive.css";
import axiosBaseURL from "../baseUrl";
import { getCurrentLanguage } from "../components";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const AboutUs = () => {
  const { t } = useTranslation();
  const [aboutUsData, setAboutUsData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    window.scrollTo(0, 0);
    axiosBaseURL
      .get("/api/about-us")
      .then((res) => {
        setAboutUsData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const AboutUs = aboutUsData?.aboutUs;
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
            <title>{t("about_us")}</title>
          </Helmet>
          <section className="about_us pb-3 ">
            <div className="about_banner">
              <img
                src={process.env.PUBLIC_URL + "/images/about_us.png"}
                alt="English"
              />
              <div className="about_banner_content">
                <h4 className="text-center pb-4">{t("about_us")}</h4>
                <h4>
                  "{t("memories")}"
                </h4>
                <p>
                  {t("cout")}
                </p>
              </div>
            </div>
            <div className="about_discription">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 pt-5 pb-3">
                    <h4>{t("about")} Mountain Nepal Holidays</h4>
                  </div>
                  <div className="col-md-12 about_contant_a">
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          getCurrentLanguage() === "en"
                            ? `${AboutUs?.description_en}`
                            : `${AboutUs?.description_nep}`,
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default AboutUs;
