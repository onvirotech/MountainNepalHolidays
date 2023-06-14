import React, { useState } from "react";
import "../styles/style.css";
import "../styles/button.css";
import "../styles/responsive.css";
import { baseUrl } from "../baseUrl";
import axiosBaseURL from "../baseUrl";
import { useParams } from "react-router-dom";
import { SwiperGallery, PureCarousel, getCurrentLanguage } from "../components";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const AllGallery = ({ props }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  console.log(id);
  const [allGalleryData, setAllGalleryData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    window.scrollTo(0, 0);
    console.log(id);
    axiosBaseURL
      .get(`/api/gallery/${id}`)
      .then((res) => {
        setAllGalleryData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [props?.match?.params?.id, id]);
  const galleryAll = allGalleryData?.gallery;
  const sliderImages = (galleryAll?.gallery_images || []).map(
    (item) => `${baseUrl}${item?.image}`
  );
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
            <title>
              {getCurrentLanguage() === "en"
                ? galleryAll?.title_en
                : galleryAll?.title_nep}
            </title>
          </Helmet>
          <section className="all_gallery pb-5 pt-5">
            <div className="all_gallery_a">
              <div className="container-fluid">
                <h3>
                  {getCurrentLanguage() === "en"
                    ? galleryAll?.title_en
                    : galleryAll?.title_nep}
                </h3>
                <PureCarousel purecarousel={sliderImages} />
                <div className="col-md-12 pt-4">
                  <h3>
                    {getCurrentLanguage() === "en"
                      ? galleryAll?.title_en
                      : galleryAll?.title_nep}
                  </h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        getCurrentLanguage() === "en"
                          ? `${galleryAll?.description_en}`
                          : `${galleryAll?.description_nep}`,
                    }}
                  ></p>
                </div>
                <div className="col-md-12 pt-3">
                  <h2>{t("similar_place")}</h2>
                </div>
              </div>
            </div>
            <SwiperGallery id={id} />
          </section>
        </>
      )}
    </div>
  );
};

export default AllGallery;
