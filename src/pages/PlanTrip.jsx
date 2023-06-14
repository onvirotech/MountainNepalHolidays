import React from "react";
import "../styles/style.css";
import "../styles/button.css";
import "../styles/responsive.css";
import { AllCountryFlags, AllCountryName } from "../components";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const PlanTrip = () => {

  const { t } = useTranslation();

  const [country, setCountry] = React.useState("");
  const [countryName, setCountryName] = React.useState("");

  const [inputs, setInputs] = React.useState([]);

  const handleAddInputPair = () => {
    setInputs([...inputs, { nationality: "", numberOfPeople: "" }]);
  };

  const handleCancelInputPair = (index) => {
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
  };

  const handleInputChange = (index, field, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index][field] = value;
    setInputs(updatedInputs);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>{t("trip")}</title>
      </Helmet>
      <section className="contact_us_page pb-5">
        <div className="contact_banner">
          <img
            src={process.env.PUBLIC_URL + "/images/Plan_Trip.png"}
            alt="English"
          />
          <div className="banner_content">
            <h4>{t("trip")}</h4>
            <p>
              <span>{t("home")} </span>/ {t("trip")}
            </p>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 contact_through_b pt-5 pb-4">
              <h3>{t("dream_getaway")}</h3>
              <h3>{t("trip_with_us")}</h3>
              <p className="pt-2">
                {t("planTrip_static")}
              </p>
            </div>
          </div>
          <div className="plan_padding">
            <div className="row">
              <div className="col-md-6 contact_through_b">
                <form className="apply_online">
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
                    />
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
                    />
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
                      <input
                        type="number"
                        name="phone_number"
                        placeholder="Your phone number"
                        required
                      />
                    </div>
                  </div>

                  <div className="fields_a">
                    <div className="row">
                      <div className="col-md-6 nation_a">
                        <label htmlFor="phone">
                          <strong>
                            {t("nationality")}<span>*</span>
                          </strong>
                        </label>
                        <br />
                        <AllCountryName
                          setCountry={setCountryName}
                          country={countryName}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="phone">
                          <strong>
                            {t("no_of_people")}<span>*</span>
                          </strong>
                        </label>
                        <br />
                        <input
                          type="number"
                          name="phone_number"
                          placeholder="Add no. of people"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="fields_a">
                    <div className="col-md-12">
                      {inputs.map((input, index) => (
                        <div key={index}>
                          <div className="row mt-2">
                            <div className="col-md-6 nation_a">
                              <label htmlFor={`nationality_${index}`}>
                                <strong>{t("nationality")}</strong>
                              </label>
                              <br />
                              <AllCountryName
                                id={`nationality_${index}`}
                                value={input.nationality}
                                setCountry={setCountryName}
                                country={countryName}
                                onChange={(value) =>
                                  handleInputChange(index, "nationality", value)
                                }
                              />
                            </div>
                            <div className="col-md-5 nation_a">
                              <label htmlFor={`numberOfPeople_${index}`}>
                                <strong>{t("no_of_people")}</strong>
                              </label>
                              <br />
                              <input
                                type="number"
                                id={`numberOfPeople_${index}`}
                                name={`numberOfPeople_${index}`}
                                placeholder="Add no. of people"
                                value={input.numberOfPeople}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "numberOfPeople",
                                    e.target.value
                                  )
                                }
                                required
                              />
                            </div>
                            <div className="col-md-1 nation_a">
                              <button
                                onClick={() => handleCancelInputPair(index)}
                              >
                                X
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="col-md-12">
                        <button
                          onClick={handleAddInputPair}
                          className="add_nationality mt-1"
                        >
                          <h3>{t("add_nationality")} +</h3>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="fields_a">
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="phone">
                          <strong>
                            {t("wish_to_travel")}<span>*</span>
                          </strong>
                        </label>
                        <br />
                        <input
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          name="appointment_date"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="phone">
                          <strong>
                            {t("no_of_days")}<span>*</span>
                          </strong>
                        </label>
                        <br />
                        <input
                          type="number"
                          name="phone_number"
                          placeholder="Add no. of days willing to travel"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="fields_a">
                    <div className="row">
                      <label htmlFor="phone">
                        <strong>
                          {t("preffered_activities")}<span>*</span>
                        </strong>
                      </label>
                      <br />
                      <div className="col-md-6 pt-3">
                        <input type="checkbox" className="check_c" />
                        <label className="check_d">
                          &nbsp;&nbsp;Everest base camp trek
                        </label>
                        <br />
                        <br />
                        <input type="checkbox" className="check_c" />
                        <label className="check_d">
                          &nbsp;&nbsp;Annapurna area
                        </label>
                        <br />
                        <br />
                        <input type="checkbox" className="check_c" />
                        <label className="check_d">
                          &nbsp;&nbsp;Far-west exploration
                        </label>
                        <br />
                        <br />
                        <input type="checkbox" className="check_c" />
                        <label className="check_d">&nbsp;&nbsp;Rafting</label>
                        <br />
                        <br />
                        <input type="checkbox" className="check_c" />
                        <label className="check_d">
                          &nbsp;&nbsp;World heritage site
                        </label>
                        <br />
                        <br />
                        <input type="checkbox" className="check_c" />
                        <label className="check_d">
                          &nbsp;&nbsp;Bungee jumping
                        </label>
                        <br />
                        <br />
                      </div>
                      <div className="col-md-6 pt-3">
                        <input type="checkbox" className="check_c" />
                        <label className="check_d">
                          &nbsp;&nbsp;Ultralight aircraft
                        </label>
                        <br />
                        <br />
                        <input type="checkbox" className="check_c" />
                        <label className="check_d">
                          &nbsp;&nbsp;Paragliding
                        </label>
                        <br />
                        <br />
                        <input type="checkbox" className="check_c" />
                        <label className="check_d">&nbsp;&nbsp;Safari</label>
                        <br />
                        <br />
                        <input type="checkbox" className="check_c" />
                        <label className="check_d">&nbsp;&nbsp;Heli tour</label>
                        <br />
                        <br />
                        <input type="checkbox" className="check_c" />
                        <label className="check_d">
                          &nbsp;&nbsp;Jungle safari
                        </label>
                        <br />
                        <br />
                        <input type="checkbox" className="check_c" />
                        <label className="check_d">
                          &nbsp;&nbsp;Ballooning
                        </label>
                        <br />
                        <br />
                      </div>
                    </div>
                  </div>
                  <div className="fields_a">
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="phone">
                          <strong>{t("medical_condition")}</strong>
                        </label>
                        <br />
                        <input
                          type="tel"
                          name="phone_number"
                          placeholder="Medical condition / Allergy"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="fields_a">
                    <label htmlFor="message">
                      <strong>{t("special_request")}</strong>
                    </label>
                    <br />
                    <textarea
                      name="message"
                      cols="50"
                      rows="4"
                      placeholder="Your message"
                      required
                    ></textarea>
                  </div>
                  <div className="submit_button_abroad">
                    <button type="submit" className="read_more_a mt-3">
                      {t("submit")}
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-md-6 contact_through_b">
                <div className="stick">
                  <div className="d-flex justify-content-end">
                    <img
                      src={process.env.PUBLIC_URL + "/images/Logo.png"}
                      alt="English"
                      width={"115px"}
                      height={"80px"}
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <img
                      src={process.env.PUBLIC_URL + "/images/bus.gif"}
                      alt="English"
                      width={"250px"}
                      height={"250px"}
                    />
                  </div>
                  <ul className="text-center">
                    <li>
                      <h5>
                        {t("planTrip_static_right")}
                      </h5>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PlanTrip;
