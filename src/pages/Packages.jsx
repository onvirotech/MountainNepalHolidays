import React from "react";
import "../styles/style.css";
import "../styles/button.css";
import "../styles/responsive.css";
import {useTranslation} from "react-i18next";
import {useParams, useSearchParams, useNavigate} from "react-router-dom";
import axiosBaseURL from "../baseUrl";
import {baseUrl} from "../baseUrl";
import {getCurrentLanguage} from "../components";
import {Helmet} from "react-helmet";
import {addTrekkingData} from "../reduxStore/trekkingSlice";
import {changeFilterId} from "../reduxStore/filterSlice";
import {useDispatch, useSelector} from "react-redux";
import { useCookies } from "react-cookie";

const Packages = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const [cookies, setCookie,removeCookie] = useCookies(['trekkingData']);
    const {slug, grade} = useParams();
    const [packagesData, setPackagesData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [isTrekingActive, setIsTrekingActive] = React.useState(false);
    const [filteredData, setFilteredData] = React.useState([]);
    const [activityData, setActivityData] = React.useState();
    const currentPathname = window.location ?. pathname;
    const [searchParams] = useSearchParams();
    const [dataFound, setDataFound] = React.useState(false)

    const filterIds = useSelector((state) => state.filter.activeFilterId);

    const outbondId = searchParams.get("outbondId");
    const noOfDays = searchParams.get("noOfDays");

    React.useEffect(() => {
        axiosBaseURL.get("/api/index").then((res) => {
            setActivityData(res.data);
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            console.log(err);
        });
    }, [
        currentPathname,
        slug,
        grade,
        outbondId,
        noOfDays
    ]);

    const activitySub = activityData ?. activityCategories;

    React.useEffect(() => {
        axiosBaseURL.get("/api/index").then((res) => {
            setPackagesData(res.data);
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            console.log(err);
        });
    }, [outbondId, noOfDays])

    React.useEffect(() => {
        if (! outbondId && ! currentPathname.includes("grade") && ! currentPathname.includes("region") && packagesData ?. packages ?. length > 0) {
            setDataFound(true)
            setFilteredData(packagesData.packages)
        }
        if (outbondId && packagesData ?. packages ?. length > 0) {
            const filterItem = packagesData.packages.filter((item) => item.outbound_id == outbondId);
            setFilteredData(filterItem)
        }
    }, [outbondId, packagesData])


    React.useEffect(() => {
        if (currentPathname.includes("region")) {
            window.scrollTo(0, 0);
            setLoading(true);
            axiosBaseURL.get(`/api/region/${slug}`).then((res) => {
                console.log(res.data)
                if (res.data ?. packages ?. length > 0) {
                    setDataFound(true)
                    setFilteredData(res.data.packages);
                    setLoading(false);
                } else {
                    setDataFound(false)
                }
            }).catch((err) => {
                setLoading(false);
                setDataFound(false)
                console.log(err);
            });
            return;
        } else if (currentPathname.includes("grade")) {
            window.scrollTo(0, 0);
            setLoading(true);
            axiosBaseURL.get(`/api/grade/${grade}`).then((res) => {
                console.log(res.data)
                if (res.data ?. packages ?. length > 0) {
                    setDataFound(true)
                    setFilteredData(res.data.packages);
                    setLoading(false);
                } else {
                    setDataFound(false)
                }

            }).catch((err) => {
                setLoading(false);
                setDataFound(false)
                console.log(err);
            });
            return;
        }
    }, [
        currentPathname,
        slug,
        grade,
        outbondId,
        noOfDays
    ]);

    const handleTrip = (item) => {
       console.log(item)
       removeCookie('trekkingData')
        setCookie('trekkingData', item);
        navigate(`/TripDetail/${
            item ?. slug
        }`);
    };
    
    const packages = packagesData ?. packages || [];

    /*...Handle Active Filter Category.....*/
    const handleActiveFilterCategory = (item, activityId) => {
        console.log(activityId)
        setDataFound(true)
        if (item.activities ?. length > 0) {
            if (isTrekingActive === true) {
                setIsTrekingActive(false);
                let array = [... filterIds];
                    const filteredArray = array.filter((element) => element !== activityId);
                    dispatch(changeFilterId(filteredArray));
                    const data = packagesData ?. packages?.filter(item => filteredArray.includes(parseInt(item.activity_category_id)));
            
                    setFilteredData(data);
                return;
            } else {
                const filteredArray = [
                    ... filterIds,
                    activityId
                ];
                dispatch(changeFilterId(filteredArray));
                setIsTrekingActive(true);
                const data = packagesData ?. packages?.filter(item => filteredArray.includes(parseInt(item.activity_category_id)));
            
                    setFilteredData(data);
                return;
            }
        } else {
            if (filterIds ?. length > 0) {
                const alreadyPresent = filterIds.filter((item) => item === activityId);
                if (alreadyPresent ?. length > 0) {
                    let array = [... filterIds];
                    const filteredArray = array.filter((element) => element !== activityId);
                    dispatch(changeFilterId(filteredArray));
                    const data = packagesData ?. packages?.filter(item => filteredArray.includes(parseInt(item.activity_category_id)));
                    if(data?.length > 0){
                        setFilteredData(data);
                    }else{
                        setDataFound(false)
                    }
                } else {
                    const filteredArray = [
                        ... filterIds,
                        activityId
                    ];
                    dispatch(changeFilterId(filteredArray));
              
                    const data = packagesData ?. packages?.filter(item => filteredArray.includes(parseInt(item.activity_category_id)));
                    if(data?.length > 0){
                        setFilteredData(data);
                    }else{
                        setDataFound(false)
                    }
                }
            } else {
                const filteredArray = [
                    ... filterIds,
                    activityId
                ];
                dispatch(changeFilterId(filteredArray));
                const data = packagesData ?. packages?.filter(item => filteredArray.includes(parseInt(item.activity_category_id)));
                if(data?.length > 0){
                    setFilteredData(data);
                }else{
                    setDataFound(false)
                }
            }
        }
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
                            t("packages")
                        }</title>
                    </Helmet>
                    <section className="contact_us_page pb-5">
                        <div className="contact_banner">
                            <img src={
                                    process.env.PUBLIC_URL + "/images/packages.png"
                                }
                                alt="English"/>
                            <div className="banner_content">
                                <h4>{
                                    t("packages")
                                }</h4>
                                <p>
                                    <span>{
                                        t("home")
                                    }</span>/ {
                                    t("packages")
                                } </p>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 contact_through_a">
                                    <h3>{
                                        t("holiday_experience")
                                    }</h3>
                                    <h3>{
                                        t("himalayan_packages")
                                    }</h3>
                                </div>
                                <div className="col-md-3 contact_through_a">
                                    <div className="stick">
                                        <div className="check_box_e">
                                            <h3>{
                                                t("all_trips")
                                            }</h3>
                                            <table> {
                                                activitySub ?. length > 0 && activitySub ?. map((item, index) => (
                                                    <tbody key={index}>
                                                        <tr>
                                                            <label onClick={
                                                                () => handleActiveFilterCategory(item, item.id)
                                                            }>
                                                                <td>
                                                                    <input type="checkbox" className="check_c"
                                                                        checked={
                                                                            filterIds.includes(item.id) ? true : false
                                                                        }/>
                                                                    &nbsp;&nbsp; {
                                                                    getCurrentLanguage() === "de" ? item ?. title_nep : item ?. title_en
                                                                } </td>
                                                            </label>
                                                        </tr>
                                                        {
                                                        item.activities ?. length > 0 && isTrekingActive && item.activities.map((child, index) => (
                                                            <tr key={index}>
                                                                <label onClick={
                                                                    () => handleActiveFilterCategory(child, child.id)
                                                                }>
                                                                    <td style={
                                                                        {fontSize: "13px"}
                                                                    }>
                                                                        <input type="checkbox" className="check_d"/>
                                                                        &nbsp;&nbsp; {
                                                                        getCurrentLanguage() === "de" ? child ?. title_nep : child ?. title_en
                                                                    } </td>
                                                                </label>
                                                            </tr>
                                                        ))
                                                    } </tbody>
                                                ))
                                            } </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-9 contact_through_a">
                                    <h4>{
                                        t("unbeatable_packages")
                                    }</h4>
                                    <div className="row pt-2">
                                        {
                                        (loading === false && !dataFound) ? <div>
                                            <p>{
                                                t("no_data_found")
                                            }</p>
                                        </div> : loading ? (
                                            <div className="spinner_main">
                                                <img src={
                                                        process.env.PUBLIC_URL + "/images/loader.gif"
                                                    }
                                                    alt="Loader"
                                                    width={"200px"}
                                                    height={"200px"}/>
                                            </div>
                                        ) : filteredData ?. length > 0 ? (filteredData.map((item, index) => (
                                            <div className="col-md-4 pb-4"
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
                                                            <button onClick={
                                                                    () => handleTrip(item)
                                                                }
                                                                className="read_more">
                                                                {
                                                                t("more")
                                                            } </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))) : (filterIds?.length > 0 && packages ?. length > 0) ? (packages ?. map((item, index) => (
                                            <div className="col-md-4 pb-4"
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
                                                            <button onClick={
                                                                    () => handleTrip(item)
                                                                }
                                                                className="read_more">
                                                                {
                                                                t("more")
                                                            } </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))) : (
                                            <div>
                                                <p>{
                                                    t("no_data_found")
                                                }</p>
                                            </div>
                                        )
                                    } </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )
        } </div>
    );
};

export default Packages;
