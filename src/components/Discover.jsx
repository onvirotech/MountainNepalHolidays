import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import {useTranslation} from "react-i18next";
import getCurrentLanguage from "./GetCurrentLanguage";
import {baseUrl} from "../baseUrl";
import {Cookies, useCookies} from "react-cookie";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const options = {
    margin: 30,
    responsiveClass: true,
    nav: false,
    autoplay: true,
    autoplayHoverPause: true,
    loop: true,
    responsive: {
        0: {
            items: 1
        },
        400: {
            items: 1
        },
        600: {
            items: 2
        },
        700: {
            items: 3
        },
        1000: {
            items: 5
        }
    }
};

const Discover = ({discovery}) => {
    const [cookie, setCookie, removeCookie] = useCookies();
    const cookies = new Cookies();
    const {t} = useTranslation();
    const lang = getCurrentLanguage();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [language, setLanguage] = React.useState("");
    React.useEffect(() => {
        const currentLang = cookies.get("lang");
        setLanguage(currentLang);
    }, [lang]);

    const handleClick = (item) => {
        removeCookie("trekkingData")
        cookies.set('trekkingData', item);
        navigate(`/TripDetail/${
            item ?. slug
        }`);
    };

    const discoveryMain = discovery || [];
    return (
        <OwlCarousel className="slider-items owl-carousel" {...options}>
            {
            discoveryMain.map((item, index) => (
                <div className="item text-center"
                    key={index}>
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
            ))
        } </OwlCarousel>
    );
};

export default Discover;
