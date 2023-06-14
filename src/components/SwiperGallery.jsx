import React from "react";
import "../styles/style.css";
import "../styles/button.css";
import "../styles/responsive.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, EffectCoverflow } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { baseUrl } from "../baseUrl";
import axiosBaseURL from "../baseUrl";
import getCurrentLanguage from "../components/GetCurrentLanguage";
SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

const SwiperGallery = ({ id }) => {
  const { t } = useTranslation();
  const [gallery, setGallery] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    axiosBaseURL
      .get("/api/gallery")
      .then((res) => {
        if (id) {
          const data = res.data.galleries.filter((item) => item.id != id);
          setGallery(data);
          setLoading(false);
        } else {
          setGallery(res.data.galleries);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [id]);
  console.log(loading);
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
          <div className="panorama-carousel">
            <div className="container-fluid">
              <div className="row">
                {gallery?.map((item, index) => (
                  <div className="col-md-12" key={index}>
                    <div className="col-md-12 gallery_head_a pt-4 d-flex justify-content-between">
                      <h4>
                        {getCurrentLanguage() === "de"
                          ? item?.title_nep
                          : item?.title_en}
                      </h4>
                      <Link to={`/AllGallery/${item?.id}`}>
                        {t("seeall")} &nbsp;
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 72L32 192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l288 0 0 72c0 9.6 5.7 18.2 14.5 22z" />
                        </svg>
                      </Link>
                    </div>

                    <Swiper
                      speed={500}
                      loop={true}
                      touchRatio={1.5}
                      navigation={true}
                      spaceBetween={0}
                      pagination={{ clickable: true }}
                      effect="coverflow"
                      coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                      }}
                      autoplay={true}
                      slidesPerView={4}
                      centeredSlides
                      className="swiper_container_a"
                    >
                      {item?.gallery_images.map(function (item, index) {
                        return (
                          <SwiperSlide key={index}>
                            <div className="gallery_img">
                              <img
                                src={baseUrl + item?.image}
                                alt="Gallery-Images"
                              />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SwiperGallery;
