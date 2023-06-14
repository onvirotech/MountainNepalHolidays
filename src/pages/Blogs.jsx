import React from "react";
import "../styles/style.css";
import "../styles/button.css";
import "../styles/responsive.css";
import axiosBaseURL from "../baseUrl";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { baseUrl } from "../baseUrl";
import { getCurrentLanguage } from "../components";
import { Helmet } from "react-helmet";

const Blogs = () => {
  const { t } = useTranslation();
  const [blog, setBlog] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    window.scrollTo(0, 0);
    axiosBaseURL
      .get("/api/blog")
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const blogs = blog?.blogs;
  const supportedVideoFormat = ["m4v", "avi", "flv", "mp4", "mov"];
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
            <title>Blogs</title>
          </Helmet>
          <section className="contact_us_page mb-4 pb-5">
            <div className="contact_banner mb-5">
              <img
                src={process.env.PUBLIC_URL + "/images/blogs.png"}
                alt="English"
              />
              <div className="banner_content">
                <h4>Blogs</h4>
                <p>
                  <span>{t("home")} </span>/ Blogs
                </p>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-12 faq_title">
                  <h3>{t("travel_blog")}</h3>
                </div>

                {blogs?.map((item, index) => (
                  <div className="col-md-3" key={index}>
                    <div className="card_g mt-3">
                      <div className="text-center">
                        {supportedVideoFormat.includes(
                          item?.media.match(/\.([^.]+)$/)[1]
                        ) ? (
                          <video src={baseUrl + item?.media} controls />
                        ) : (
                          <img src={baseUrl + item?.media} alt="English" />
                        )}
                      </div>

                      <h4>
                        {getCurrentLanguage() === "en"
                          ? item?.title_en
                          : item?.title_nep}
                      </h4>

                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            getCurrentLanguage() === "en"
                              ? `${item?.description_en}`
                              : `${item?.description_nep}`,
                        }}
                      ></p>
                      <div className="text-center">
                        <Link to={item?.link} target="_blank">
                          <button className="read_more">{t("link")}</button>
                        </Link>
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

export default Blogs;
