import React from "react";
import "../styles/style.css";
import "../styles/button.css";
import "../styles/responsive.css";
import { SwiperGallery } from "../components";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Gallery = () => {
  const { t } = useTranslation();
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
          <Helmet>
            <title>{t("gallery")}</title>
          </Helmet>
          <section className="gallery pb-5 ">
            <div className="contact_banner">
              <img
                src={process.env.PUBLIC_URL + "/images/gallery.png"}
                alt="English"
              />
              <div className="banner_content">
                <h4>{t("gallery")}</h4>
                <p>
                  <span>{t("home")}</span> / {t("gallery")}
                </p>
              </div>
            </div>

            <div className="panorama-carousel">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="gallery_head pt-5">
                      <h3>{t("your_imagination")}</h3>
                      <p>{t("trekking_images")}</p>
                    </div>
                    <SwiperGallery />
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

export default Gallery;
