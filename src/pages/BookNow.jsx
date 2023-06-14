import React from "react";
import "../styles/style.css";
import "../styles/button.css";
import "../styles/responsive.css";
import {AllCountryFlags, AllCountryName, getCurrentLanguage} from "../components";
import {useSelector} from "react-redux";
import axiosBaseURL from "../baseUrl";
import {toast} from "react-toastify";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {Cookies} from "react-cookie";

const BookNow = ({bookNow}) => {
    const bookNowData = bookNow ?. outbounds;
    const {t} = useTranslation();
    const cookies = new Cookies();
    const [fullName, setFullName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [nationality, setNationality] = React.useState([]);
    const [numberOfPeople, setNumberOfPeople] = React.useState();
    const [message, setMessage] = React.useState();
    const [packageId, setPackageId] = React.useState();
    const [medicalCondition, setMedicalCondition] = React.useState();
    const [numberOfDay, setNumberOfDay] = React.useState();
    const [travelDate, setTravelDate] = React.useState();
    const [error, setError] = React.useState(false);
    const [country, setCountry] = React.useState("");
    const [countryCode, setCountryCode] = React.useState();

    const [trekkingData, setTrekkingData] = React.useState();
    const [language, setLanguage] = React.useState("");
    const [filteredPackage, setFilteredPackage] = React.useState();
    const [selectedPackageData, setSelectedPackageData] = React.useState();

    const state = cookies.get("trekkingData")
    console.log(state)
    const packages = useSelector((state) => state.trekking.trekkingPackage);

    const selectedPackage = () => {
        if (bookNowData && state) {
            const selected = bookNowData.filter(item => item.id === state.id);
            setSelectedPackageData(selected[0])
        }
    }

    React.useEffect(() => {
        if (state) {
            setTrekkingData(state);
            setPackageId(state.id);
        }

        if (packages && state) {
            const pack = packages.filter((item) => item.id != state.id);
            setFilteredPackage(pack);
        }

        selectedPackage()
    }, [state]);

    const [inputs, setInputs] = React.useState([]);

    const handleAddInputPair = () => {
        setInputs([
            ...inputs, {
                nationality: "",
                numberOfPeople: ""
            }
        ]);
    };

    const handleCancelInputPair = (index) => {
        const updatedInputs = [...inputs];
        updatedInputs.splice(index, 1);
        setInputs(updatedInputs);
    };

    const handleInputChange = (index, field, value) => {
        console.log(index, field, value);
        const updatedInputs = [...inputs];
        updatedInputs[index][field] = value;
        setInputs(updatedInputs);
    };

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Handle Nations
    React.useEffect(() => {
        if (typeof country === "number") {
            return;
        } else if (country) {
            setNationality((prev) => [
                ...prev,
                country
            ]);
        }
    }, [country]);

    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const contact = `${countryCode}${phone}`;
        const data = {
            fullname: fullName,
            contact: "84376594",
            travel_date: travelDate,
            no_of_day: numberOfDay,
            medical_condition: medicalCondition,
            package_id: packageId,
            email,
            message,
            nationality,
            no_of_people: numberOfPeople
        };

        console.log(data);
        axiosBaseURL.post("/api/package/booking", data, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            toast.success("Submitted Successfully");
        }).catch((res) => {
            setError(res ?. response ?. data ?. errors);
            toast.error("Please Fill All Fields");
        });
    };

    return (
        <>
            <Helmet>
                <title>{
                    t("book_now")
                }</title>
            </Helmet>
            <section className="contact_us_page pb-5">
                <div className="contact_banner">
                    <img src={
                            process.env.PUBLIC_URL + "/images/Book_Now.png"
                        }
                        alt="English"/>
                    <div className="banner_content">
                        <h4>{
                            t("packages")
                        }</h4>
                        <p>
                            <span>{
                                t("home")
                            } </span>/ {
                            t("packages")
                        }
                            / {
                            getCurrentLanguage() === "de" ? trekkingData ?. title_nep : trekkingData ?. title_en
                        }
                            / Book
                        </p>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 contact_through_b pt-5 pb-2">
                            <h3>{
                                t("epic_journey")
                            }</h3>
                            <h3>{
                                t("adventure_today")
                            }</h3>
                            <h6>
                                ({
                                t("please_fill")
                            }
                                “<span>*</span>” {
                                t("the_below")
                            }
                                )
                            </h6>
                        </div>
                    </div>
                    <div className="plan_padding">
                        <div className="row">
                            <div className="col-md-6 contact_through_b">
                                <form className="apply_online">
                                    <div className="fields_a">
                                        <div className="nation_b">
                                            <label htmlFor="phone">
                                                <strong>{
                                                    t("select_destination")
                                                }</strong>
                                            </label>
                                            <br/> {/* {trekkingData && (
                        <select
                          name="english_score_type"
                          required
                          onChange={(e) => setPackageId(e.target.value)}
                        >
                          <option value="Nepal">
                            {getCurrentLanguage() === "de"
                              ?trekkingData?.title_nep 
                              : trekkingData?.title_en}
                          </option>
                          
                          {filteredPackage?.map((item, index) => (
                            <option key={index} value={item.id}>
                              {
                            getCurrentLanguage() === "de" ? item?.title_nep : item?.title_en
                        }
                            </option>
                          ))}
                        </select>
                      )} */}


                                            <select name="english_score_type" required
                                                onChange={
                                                    (e) => setPackageId(e.target.value)
                                            }>
                                                <option value={
                                                        selectedPackageData?.id
                                                    }
                                        >
                                                    {
                                                    getCurrentLanguage() == "en" ? `${
                                                        selectedPackageData ?. title_en
                                                    }` : `${
                                                        selectedPackageData ?. title_nep
                                                    }`
                                                } </option>
                                                {
                                                bookNowData ?. map((item, index) => (
                                                    <option value={
                                                            item.id
                                                        }
                                                        key={index}>
                                                        {
                                                        getCurrentLanguage() == "en" ? `${
                                                            item ?. title_en
                                                        }` : `${
                                                            item ?. title_nep
                                                        }`
                                                    } </option>
                                                ))
                                            } </select>


                                        </div>
                                    </div>
                                    <div className="fields_a">
                                        <label htmlFor="fullname">
                                            <strong> {
                                                t("your_name")
                                            }
                                                <span>*</span>
                                            </strong>
                                        </label>
                                        <br/>
                                        <input type="text" name="fullname"
                                            onChange={
                                                (e) => setFullName(e.target.value)
                                            }
                                            placeholder="Full name"
                                            required/> {
                                        error ?. fullname && (
                                            <p className="error">
                                                {
                                                error ?. fullname
                                            }</p>
                                        )
                                    } </div>
                                    <div className="fields_a">
                                        <label htmlFor="email">
                                            <strong> {
                                                t("email_address")
                                            }
                                                <span>*</span>
                                            </strong>
                                        </label>
                                        <br/>
                                        <input type="email" name="email"
                                            onChange={
                                                (e) => setEmail(e.target.value)
                                            }
                                            placeholder="Your email adress"
                                            required/> {
                                        error ?. email && <p className="error">
                                            {
                                            error ?. email
                                        }</p>
                                    } </div>

                                    <div className="fields_a">
                                        <label htmlFor="phone">
                                            <strong> {
                                                t("phone_no")
                                            }
                                                <span>*</span>
                                            </strong>
                                        </label>
                                        <br/>
                                        <div className="d-flex cont_code">
                                            <AllCountryFlags setCountry={setCountryCode}
                                                country={countryCode}/>
                                            <input type="number" name="phone_number" min="0"
                                                onChange={
                                                    (e) => setPhone(e.target.value)
                                                }
                                                placeholder="Your phone number"
                                                required/>
                                        </div>
                                        {
                                        error ?. contact && (
                                            <p className="error">
                                                {
                                                error ?. contact
                                            }</p>
                                        )
                                    } </div>

                                    <div className="fields_a">
                                        <div className="row">
                                            <div className="col-md-6 nation_a">
                                                <label htmlFor="phone">
                                                    <strong> {
                                                        t("nationality")
                                                    }
                                                        <span>*</span>
                                                    </strong>
                                                </label>
                                                <br/>

                                                <AllCountryName setCountry={setCountry}
                                                    country={country}/>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="phone">
                                                    <strong> {
                                                        t("no_of_people")
                                                    }
                                                        <span>*</span>
                                                    </strong>
                                                </label>
                                                <br/>
                                                <input type="number" name="no_of_people" min="1"
                                                    onChange={
                                                        (e) => setNumberOfPeople(e.target.value)
                                                    }
                                                    placeholder="Add no. of people"
                                                    required/>
                                            </div>
                                        </div>
                                        {
                                        error ?. no_of_people && (
                                            <p className="error">
                                                {
                                                error ?. no_of_people
                                            }</p>
                                        )
                                    } </div>

                                    <div className="fields_a">
                                        <div className="col-md-12">
                                            {
                                            inputs.map((input, index) => (
                                                <div key={index}>
                                                    <div className="row mt-2">
                                                        <div className="col-md-6 nation_a">
                                                            <label htmlFor={
                                                                `nationality_${index}`
                                                            }>
                                                                <strong>{
                                                                    t("nationality")
                                                                }</strong>
                                                            </label>
                                                            <br/>

                                                            <AllCountryName id={
                                                                    `nationality_${index}`
                                                                }
                                                                value={
                                                                    input.nationality
                                                                }
                                                                setCountry={setCountry}
                                                                country={country}
                                                                onChange={
                                                                    (e) => handleInputChange(index, "nationality", e.target.value)
                                                                }/>
                                                        </div>
                                                        <div className="col-md-5 nation_a">
                                                            <label htmlFor={
                                                                `numberOfPeople_${index}`
                                                            }>
                                                                <strong>{
                                                                    t("no_of_people")
                                                                }</strong>
                                                            </label>
                                                            <br/>
                                                            <input type="number" min="1"
                                                                id={
                                                                    `numberOfPeople_${index}`
                                                                }
                                                                name={
                                                                    `numberOfPeople_${index}`
                                                                }
                                                                placeholder="Add no. of people"
                                                                value={
                                                                    input.numberOfPeople
                                                                }
                                                                onChange={
                                                                    (e) => handleInputChange(index, "numberOfPeople", e.target.value)
                                                                }/> {
                                                            error ?. no_of_people && (
                                                                <p className="error">
                                                                    {
                                                                    error ?. no_of_people
                                                                }</p>
                                                            )
                                                        } </div>
                                                        <div className="col-md-1 nation_a">
                                                            <button onClick={
                                                                () => handleCancelInputPair(index)
                                                            }>

                                                                X
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                            <div className="col-md-12">
                                                <button onClick={handleAddInputPair}
                                                    className="add_nationality mt-1">
                                                    <h3>{
                                                        t("add_nationality")
                                                    }
                                                        +</h3>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fields_a">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label htmlFor="phone">
                                                    <strong> {
                                                        t("wish_to_travel")
                                                    }
                                                        <span>*</span>
                                                    </strong>
                                                </label>
                                                <br/>
                                                <input type="date"
                                                    min={
                                                        new Date().toISOString().split("T")[0]
                                                    }
                                                    name="appointment_date"
                                                    onChange={
                                                        (e) => setTravelDate(e.target.value)
                                                    }/> {
                                                error ?. travel_date && (
                                                    <p className="error">
                                                        {
                                                        error ?. travel_date
                                                    }</p>
                                                )
                                            } </div>
                                            <div className="col-md-6">
                                                <label htmlFor="phone">
                                                    <strong> {
                                                        t("no_of_days")
                                                    }
                                                        <span>*</span>
                                                    </strong>
                                                </label>
                                                <br/>
                                                <input type="number" name="no_of_days" min="1"
                                                    onChange={
                                                        (e) => setNumberOfDay(e.target.value)
                                                    }
                                                    placeholder="Add no. of days willing to travel"
                                                    required/> {
                                                error ?. no_of_day && (
                                                    <p className="error">
                                                        {
                                                        error ?. no_of_day
                                                    }</p>
                                                )
                                            } </div>
                                        </div>
                                    </div>

                                    <div className="fields_a">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label htmlFor="phone">
                                                    <strong>{
                                                        t("medical_condition")
                                                    }</strong>
                                                </label>
                                                <br/>
                                                <input type="tel" name="phone_number" placeholder="Medical condition / Allergy"
                                                    onChange={
                                                        (e) => setMedicalCondition(e.target.value)
                                                    }
                                                    required/> {
                                                error ?. medical_condition && (
                                                    <p className="error">
                                                        {
                                                        error ?. medical_condition
                                                    }</p>
                                                )
                                            } </div>
                                        </div>
                                    </div>
                                    <div className="fields_a">
                                        <label htmlFor="message">
                                            <strong>{
                                                t("special_request")
                                            }</strong>
                                        </label>
                                        <br/>
                                        <textarea name="message" cols="50" rows="4"
                                            onChange={
                                                (e) => setMessage(e.target.value)
                                            }
                                            placeholder="Your message"
                                            required></textarea>
                                        {
                                        error ?. message && (
                                            <p className="error">
                                                {
                                                error ?. message
                                            }</p>
                                        )
                                    } </div>
                                    <div className="submit_button_abroad">
                                        <button type="submit"
                                            onClick={handleSubmit}
                                            className="read_more_a mt-3">
                                            {
                                            t("submit")
                                        } </button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-6 contact_through_b">
                                <div className="stick">
                                    <div className="d-flex justify-content-end">
                                        <img src={
                                                process.env.PUBLIC_URL + "/images/Logo.png"
                                            }
                                            alt="English"
                                            width={"115px"}
                                            height={"80px"}/>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <img src={
                                                process.env.PUBLIC_URL + "/images/bus.gif"
                                            }
                                            alt="English"
                                            width={"250px"}
                                            height={"250px"}/>
                                    </div>
                                    <ul className="text-center">
                                        <li>
                                            <h5> {
                                                t("planTrip_static_right")
                                            } </h5>
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

export default BookNow;
