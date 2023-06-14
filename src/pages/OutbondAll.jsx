import React from "react";
import "../styles/style.css";
import "../styles/button.css";
import "../styles/responsive.css";
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import axiosBaseURL from "../baseUrl";
import {baseUrl} from "../baseUrl";
import getCurrentLanguage from "../components/GetCurrentLanguage";
import {Helmet} from "react-helmet";
import { Cookies, useCookies } from "react-cookie";
import {useNavigate} from "react-router-dom";

const OutbondAll = ({props}) => {
    const [cookie, setCookie, removeCookie] = useCookies();
    const cookies = new Cookies();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {slug} = useParams();
    const [outBondData, setOutBondData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        window.scrollTo(0, 0);
        console.log(slug);
        axiosBaseURL.get(`/api/outbound/${slug}`).then((res) => {
            setOutBondData(res.data);
            setLoading(false);
        }).catch((err) => console.log(err));
    }, [
        props ?. match ?. params ?. slug,
        slug
    ]);
    const outBond = outBondData ?. packages;

    const handleClick = (item) => {
        removeCookie("trekkingData")
        cookies.set('trekkingData', item);
        navigate(`/TripDetail/${
            item ?. slug
        }`);
    };
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
                        <title>{
                            t("outbonds_packages")
                        }</title>
                    </Helmet>
                    <section className="contact_us_page pb-5 mt-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 activities_title pb-4">
                                    <h3 className="text-center">
                                        {
                                        t("outbound_packages")
                                    } </h3>
                                </div>
                                {
                                outBond && outBond ?. map((item, index) => (
                                    <div className="col-md-3 pb-4"
                                        key={index}>
                                        <div className="item text-center">
                                            <div className="position_img">
                                                <img src={
                                                        baseUrl + item ?. image
                                                    }
                                                    alt="English"/>
                                                <div className="carousel_cont">
                                                    <h4> {
                                                        getCurrentLanguage() === "de" ? item ?. title_nep : item ?. title_en
                                                    } </h4>
                                                    <p dangerouslySetInnerHTML={
                                                        {
                                                            __html: (getCurrentLanguage() === "de" && item.description_nep.length > 201) ? item ?. description_nep.slice(0, 201) : (getCurrentLanguage() === "de" && item.description_nep.length <= 201) ? item.description_nep : (item ?. description_en.length > 201) ? item ?. description_en.slice(0, 201) : item ?. description_en
                                                        }
                                                    }></p>

                                                    <button className="read_more"
                                                        onClick={
                                                            () => handleClick(item)
                                                    }>
                                                        {
                                                        t("more")
                                                    } </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            } </div>
                        </div>
                    </section>
                </>
            )
        } </div>
    );
};

export default OutbondAll;
