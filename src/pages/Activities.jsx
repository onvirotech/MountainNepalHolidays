import React from "react";
import "../styles/style.css";
import "../styles/button.css";
import "../styles/responsive.css";
import { Discover } from "../components";
import axiosBaseURL from "../baseUrl";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Activities = ({ props,child }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [activityData, setActivityData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(true);
    axiosBaseURL.get(`/api/activity/${child}/${id}`)
      .then(res => {
        setActivityData(res.data);
        setLoading(false);
      }
      )
      .catch(err => console.log(err))
  }, [props?.match?.params?.id, id,child]);
  const activitiesData = activityData?.packages;
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
            <title>{t("activities")}</title>
          </Helmet>
          <section className="contact_us_page pb-5 mt-5">
            <div className="container">
              <div className="row">
                <div className="col-md-6 activities_title">
                  <h3>
                    {t("thrilling_adventures")}
                  </h3>
                  <p>
               {t("activities_p_a")}
                  </p>
                </div>

                <div className="col-md-6 activities_img">
                  <img
                    src={process.env.PUBLIC_URL + "/images/ImgActivities.jpeg"}
                    alt="English"
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
                  activitiesData?.length > 0 && (
                    <div className="col-md-12 activities_title pt-5 text-center">
                      <h3 className="pb-4 pt-4">
                        {t("Our Exciting Activity Packages")}
                      </h3>
                      <Discover discovery={activitiesData} />
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

export default Activities;
