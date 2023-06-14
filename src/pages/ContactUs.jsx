import React, { useState } from "react";
import "../styles/style.css";
import "../styles/button.css";
import "../styles/responsive.css";
import axiosBaseURL from "../baseUrl";
import { toast, ToastContainer } from "react-toastify";
import { AllCountryFlags } from "../components";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Contact_Us = ({ contact }) => {
  const { t } = useTranslation();
  const contactData = contact?.siteSetting;

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [country, setCountry] = useState("");

  const [error, setError] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = {
      fullname: fullname,
      email: email,
      phone_no: phone,
      special_request: specialRequest,
      country: country,
    };

    axiosBaseURL
      .post("/api/contact-us", formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        toast.success("Submitted Successfully");
        setFullname("");
        setEmail("");
        setPhone("");
        setSpecialRequest("");
        setCountry("");
        setError("");
      })
      .catch((res) => {
        setError(res?.response?.data?.errors);
        toast.error("Please Fill All Fields");
      });
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>{t("contact")}</title>
      </Helmet>
      <section className="contact_us_page pb-5">
        <div className="contact_banner">
          <img
            src={process.env.PUBLIC_URL + "/images/contact_banner.png"}
            alt="English"
          />
          <div className="banner_content">
            <h4>{t("contact")}</h4>
            <p>
              <span>{t("home")}</span> / {t("contact")}
            </p>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-6 contact_through">
              <h3>{t("get_in_touch")}</h3>
              <form className="apply_online" onSubmit={handleSubmit}>
                <div className="fields_a">
                  <label htmlFor="fullname">
                    <strong>
                      {t("your_name")}<span>*</span>
                    </strong>
                  </label>
                  <br />
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Full name"
                    required
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                  {error?.fullname && (
                    <p className="error">{error?.fullname}</p>
                  )}
                </div>
                <div className="fields_a">
                  <label htmlFor="email">
                    <strong>
                      {t("email_address")}<span>*</span>
                    </strong>
                  </label>
                  <br />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email adress"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error?.email && <p className="error">{error?.email}</p>}
                </div>

                <div className="fields_a">
                  <label htmlFor="phone">
                    <strong>
                      {t("phone_no")}<span>*</span>
                    </strong>
                  </label>
                  <br />
                  <div className="d-flex cont_code">
                    <AllCountryFlags
                      setCountry={setCountry}
                      country={country}
                    />
                    {error?.country && (
                      <p className="error">{error?.country}</p>
                    )}
                    <input
                      type="number"
                      name="phone_no"
                      placeholder="Your phone number"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <br></br>
                    {error?.phone_no && (
                      <p className="error">{error?.phone_no}</p>
                    )}
                  </div>
                </div>
                <div className="fields_a">
                  <label htmlFor="message">
                    <strong>{t("special_request")}</strong>
                  </label>
                  <br />
                  <textarea
                    name="special_request"
                    cols="50"
                    rows="4"
                    placeholder="Your message"
                    required
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                  ></textarea>
                  {error?.special_request && (
                    <p className="error">{error?.special_request}</p>
                  )}
                </div>
                <div className="submit_button_abroad">
                  <button type="submit" className="read_more_a mt-3">
                  {t("submit")}
                  </button>
                </div>
              </form>
              <ToastContainer />
            </div>
            <div className="col-md-6 contact_through">
              <img
                src={process.env.PUBLIC_URL + "/images/Logo.png"}
                alt="English"
                width={"115px"}
                height={"80px"}
              />
              <ul>
                <li>
                  <h5>Mountain Nepal Holidays</h5>
                </li>
                <li>{contactData?.location}</li>
                <li>{contactData?.contact}</li>
                <li>{contactData?.email}</li>
              </ul>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0736103117!2d85.31008241548213!3d27.715013431760994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fcb77fd4bd%3A0x58099b1deffed8d4!2sThamel%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1680851780659!5m2!1sen!2snp"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="contact_us"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact_Us;
