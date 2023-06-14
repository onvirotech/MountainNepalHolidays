import React, {useState} from "react";
import "../styles/style.css";
import "../styles/button.css";
import "../styles/responsive.css";
import Carousel from "react-bootstrap/Carousel";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import axiosBaseURL from "../baseUrl";
import {baseUrl} from "../baseUrl";
import {getCurrentLanguage, Discover, PureCarousel} from "../components";
import {Helmet} from "react-helmet";
import {Cookies, useCookies} from "react-cookie";

const TripDetail = ({props}) => {
    const [cookies, setCookie,removeCookie] = useCookies(['trekkingData']);
    const navigate = useNavigate();
    const [key, setKey] = useState("Overview");
    const {t} = useTranslation();
    const {slug} = useParams();
    const [packageData, setPackageData] = React.useState([]);


    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        window.scrollTo(0, 0);

        axiosBaseURL.get(`/api/package/${slug}`).then((res) => {
            setPackageData(res.data);
            setLoading(false);
        }).catch((err) => console.log(err));
    }, [props ?. match ?. params ?. slug, slug]);
    const packages = packageData ?. package;

    const relatedPackages = packageData ?. relatedPackages;
    const packagesa = packages ?. activity_category;
    const sliderImages = (packages ?. package_galleries || []).map((item) => `${baseUrl}${
        item ?. package_image
    }`);

    const handleBook = (item) => {
      console.log(item)
        removeCookie('trekkingData')
        setCookie('trekkingData', {
          title_en:item?.title_en,
          title_nep: item?.title_nep,
          id: item?.id
        });
        navigate(`/BookNow`);
    }

    return (
        <div> {
            loading ? (
                <div className="spinner_main">
                    <img src={
                            process.env.PUBLIC_URL + "/images/loader.gif"
                        }
                        alt="Loader"
                        width={"200px"}
                        height={"200px"}/>
                </div>
            ) : (
                <>
                    <Helmet>
                        <title> {
                            getCurrentLanguage() === "de" ? packages ?. title_nep : packages ?. title_en
                        }</title>
                    </Helmet>
                    <section className="contact_us_page pb-5">
                        <div className="contact_banner">
                            <img src={
                                    process.env.PUBLIC_URL + "/images/faq.png"
                                }
                                alt="TripDetail"/>
                            <div className="banner_content">
                                <h4> {
                                    getCurrentLanguage() === "de" ? packages ?. title_nep : packages ?. title_en
                                } </h4>
                                <p>
                                    <span>{
                                        t("home")
                                    }</span>/ {
                                    t("packages")
                                }
                                    / {
                                    getCurrentLanguage() === "de" ? packages ?. title_nep : packages ?. title_en
                                } </p>
                            </div>
                        </div>
                        <div className="container-fluid tab_padding">
                            <div className="row">
                                <div className="col-md-3 contact_through_a">
                                    <div className="check_box_e">
                                        <h3 className="pb-2">
                                            {
                                            t("trip_details")
                                        }</h3>
                                        <table className="mb-3">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                            <path d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z"/>
                                                        </svg>
                                                    </td>
                                                    <td>{
                                                        t("price_range")
                                                    }</td>
                                                    <td>
                                                        <strong>
                                                            $ {
                                                            packages ?. min_price
                                                        }- $ {
                                                            packages ?. max_price
                                                        } </strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                            <path d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152z"/>
                                                        </svg>
                                                    </td>
                                                    <td>{
                                                        t("Activity")
                                                    }</td>
                                                    <td>
                                                        <strong> {
                                                            getCurrentLanguage() === "de" ? packagesa ?. title_nep : packagesa ?. title_en
                                                        } </strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
                                                        </svg>
                                                    </td>
                                                    <td>{
                                                        t("duration")
                                                    }</td>
                                                    <td>
                                                        <strong> {
                                                            getCurrentLanguage() === "de" ? packages ?. duration_nep : packages ?. duration_en
                                                        } </strong>
                                                        <strong> {
                                                            packages ?. duration_en > 1 ? "Days" : "Day"
                                                        } </strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                            <path d="M48 24C48 10.7 37.3 0 24 0S0 10.7 0 24V64 350.5 400v88c0 13.3 10.7 24 24 24s24-10.7 24-24V388l80.3-20.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L48 52V24zm0 77.5l96.6-24.2c27-6.7 55.5-3.6 80.4 8.8c54.9 27.4 118.7 29.7 175 6.8V334.7l-24.4 9.1c-33.7 12.6-71.2 10.7-103.4-5.4c-48.2-24.1-103.3-30.1-155.6-17.1L48 338.5v-237z"/>
                                                        </svg>
                                                    </td>
                                                    <td>{
                                                        t("level")
                                                    }</td>
                                                    <td>
                                                        <strong> {
                                                            getCurrentLanguage() === "en" ? packages ?. grade : packages ?. grade
                                                        } </strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                            <path d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z"/>
                                                        </svg>
                                                    </td>
                                                    <td>{
                                                        t("max_altitude")
                                                    }</td>
                                                    <td>
                                                        <strong> {
                                                            getCurrentLanguage() === "de" ? packages ?. max_altitude_nep : packages ?. max_altitude_en
                                                        } </strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path d="M256 0c17.7 0 32 14.3 32 32V66.7C368.4 80.1 431.9 143.6 445.3 224H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H445.3C431.9 368.4 368.4 431.9 288 445.3V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.3C143.6 431.9 80.1 368.4 66.7 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H66.7C80.1 143.6 143.6 80.1 224 66.7V32c0-17.7 14.3-32 32-32zM128 256a128 128 0 1 0 256 0 128 128 0 1 0 -256 0zm128-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/>
                                                        </svg>
                                                    </td>
                                                    <td>{
                                                        t("trip_starts")
                                                    }</td>
                                                    <td>
                                                        <strong> {
                                                            getCurrentLanguage() === "de" ? packages ?. trip_start_nep : packages ?. trip_start_en
                                                        } </strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                                            <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                                                        </svg>
                                                    </td>
                                                    <td>{
                                                        t("trip_ends")
                                                    }</td>
                                                    <td>
                                                        <strong> {
                                                            getCurrentLanguage() === "de" ? packages ?. trip_end_nep : packages ?. trip_end_en
                                                        } </strong>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>


                                        <button onClick={
                                                () => handleBook(packages)
                                            }
                                            className="read_more">Book</button>

                                        <button className="plan_trip_a mt-3 mb-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                \
                                                <path d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>
                                            </svg>
                                            {
                                            t("download")
                                        } </button>
                                    </div>
                                </div>
                                <div className="col-md-9 contact_through_a">
                                    <h4> {
                                        getCurrentLanguage() === "de" ? packages ?. title_nep : packages ?. title_en
                                    } </h4>
                                    <p dangerouslySetInnerHTML={
                                        {
                                            __html: getCurrentLanguage() === "de" ? packages ?. description_nep : packages ?. description_en
                                        }
                                    }></p>
                                    {/* <div className="carousel-item">
                                    <img className="d-block w-100" src={baseUrl + packages?.image} alt="image"/>
                                    </div> */}
                                    <Carousel controls={false}
                                        indicators={false}>
                                        <Carousel.Item>
                                            <img className="d-block w-100"
                                                src={
                                                    baseUrl + packages ?. image
                                                }
                                                alt="trekkingImage"/>
                                        </Carousel.Item>
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid tab_padding">
                            <div className="row">
                                <div className="col-md-12">
                                    <Tabs id="controlled-tab-example"
                                        activeKey={key}
                                        onSelect={
                                            (k) => setKey(k)
                                        }
                                        className="mb-3">
                                        <Tab eventKey="Overview"
                                            title={
                                                t("overview")
                                        }>
                                            <p dangerouslySetInnerHTML={
                                                {
                                                    __html: getCurrentLanguage() === "de" ? packages ?. overview_nep : packages ?. overview_en
                                                }
                                            }></p>
                                        </Tab>
                                        <Tab eventKey="Itinerary"
                                            title={
                                                t("itinerary")
                                        }>
                                            <p dangerouslySetInnerHTML={
                                                {
                                                    __html: getCurrentLanguage() === "de" ? packages ?. itenary_nep : packages ?. itenary_en
                                                }
                                            }></p>
                                        </Tab>
                                        <Tab eventKey="Cost_Details"
                                            title={
                                                t("cost_details")
                                        }>
                                            <p dangerouslySetInnerHTML={
                                                {
                                                    __html: getCurrentLanguage() === "de" ? packages ?. costDetail_nep : packages ?. costDetail_en
                                                }
                                            }></p>
                                        </Tab>
                                        <Tab eventKey="Gallery"
                                            title={
                                                t("gallery")
                                        }>
                                            <PureCarousel purecarousel={sliderImages}/>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid tab_padding">
                            <div className="row">
                                {
                                relatedPackages ?. length > 0 && (
                                    <div className="col-md-12 activities_title pt-5 ">
                                        <h3 className="pb-4">
                                            {
                                            t("related_packages")
                                        }</h3>
                                        <Discover discovery={relatedPackages}/>
                                    </div>
                                )
                            } </div>
                        </div>
                    </section>
                </>
            )
        } </div>
    );
};

export default TripDetail;
