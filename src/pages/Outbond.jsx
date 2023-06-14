import React, { useState } from "react";
import "../styles/style.css";
import "../styles/button.css";
import "../styles/responsive.css";
import Discover from "../components/Discover";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axiosBaseURL, { baseUrl } from "../baseUrl";
import { Helmet } from "react-helmet";
import getCurrentLanguage from "../components/GetCurrentLanguage";

const Outbond = ({ props }) => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [outBondData, setOutBondData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    axiosBaseURL
      .get(`/api/outbound/${slug}`)
      .then((res) => {
        setOutBondData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [props?.match?.params?.slug, slug]);
  const outBond = outBondData?.packages;
  const outBondDetail = outBondData?.outbound;
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
            <title>{t("outboundsz")}</title>
          </Helmet>
          <section className="contact_us_page pb-5 mt-5">
            <div className="container">
              <div className="row">
                <div className="col-md-6 activities_title">
                <h3>{getCurrentLanguage()==="de"? outBondDetail?.title_nep : outBondDetail?.title_en}</h3>
                      <p dangerouslySetInnerHTML={{ __html:  getCurrentLanguage()==="en"? `${outBondDetail?.description_en}`: `${outBondDetail?.description_nep}` }}></p>
                </div>

                <div className="col-md-6 activities_img">
                  <img
                    src={baseUrl + outBondDetail?.image}
                    alt="outbondImage"
                  />
                </div>
              </div>
            </div>
            <div className="container-fluid tab_padding">
              <div className="row">
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
                  outBond?.length > 0 && (
                    <div className="col-md-12 activities_title pt-5">
                      <h3 className="text-center pt-4">
                        {t("outbound_packages")}
                      </h3>
                      <p className="text-end see_all_d">
                        <Link to={`/outbondAll/${slug}`}>{t("seeall")}</Link>
                      </p>
                      <Discover discovery={outBond} />
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Outbond;
