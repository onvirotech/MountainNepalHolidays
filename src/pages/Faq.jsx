import React, { useState } from "react";
import "../styles/style.css";
import "../styles/button.css";
import "../styles/responsive.css";
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import chevronDown from "../chevron-down.svg";
import styled from "styled-components";
import axiosBaseURL from "../baseUrl";
import { useTranslation } from "react-i18next";
import { getCurrentLanguage } from "../components";
import { Helmet } from "react-helmet";

const Wrapper = styled.div`
  font-family: sans-serif;
  margin-top: 1rem;
  border-top: 1px solid #ccc;
`;

const ItemWithChevron = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={
      <>
        {header}
        <img className="chevron-down" src={chevronDown} alt="Chevron Down" />
      </>
    }
  />
);

/**
 * @type {React.ExoticComponent<import('@szhsin/react-accordion').AccordionItemProps>}
 */
const AccordionItem = styled(ItemWithChevron)`
  background-color: #e7e7e7;
  margin-bottom: 2%;
  .szh-accordion__item {
    &-btn {
      cursor: pointer;
      display: flex;
      align-items: center;
      width: 100%;
      margin: 0;
      padding: 1rem;
      text-align: left;
      color: #0c1d2e;
      font-size: 15px;
      font-weight: 700;
      background-color: transparent;
      border: none;
      &:hover {
        background-color: #f3f3f3;
      }
    }

    &-content {
      transition: height 0.2s ease-in-out;
    }

    &-panel {
      padding: 1rem;
    }
  }

  .chevron-down {
    margin-left: auto;
    transition: transform 0.2s ease-in-out;
  }

  &.szh-accordion__item--expanded {
    .szh-accordion__item-btn {
      background-color: #e7e7e7;
    }
    .chevron-down {
      transform: rotate(180deg);
    }
  }
`;
const Faqs = () => {
  const { t } = useTranslation();
  const [faqData, setFaqData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    window.scrollTo(0, 0);
    axiosBaseURL
      .get("/api/faq")
      .then((res) => {
        setFaqData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const faq = faqData?.faqs;

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
            <title>Faq</title>
          </Helmet>
          <section className="contact_us_page pb-5">
            <div className="contact_banner mb-5">
              <img
                src={process.env.PUBLIC_URL + "/images/trip.png"}
                alt="English"
              />
              <div className="banner_content">
                <h4>{t("frequently_asked")}</h4>
                <p>
                  <span>{t("home")}</span>/ FAQ
                </p>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-12 faq_title">
                  <h3>{t("frequently_asked")}</h3>
                  <p>
                  {t("frequently_asked_p")}
                  </p>
                </div>

                <Wrapper>
                  <Accordion>
                    {faq?.map((item, index) => (
                      <div className="col-md-12 mt-3" key={index}>
                        <AccordionItem
                          header={
                            getCurrentLanguage() === "en"
                              ? item?.title_en
                              : item?.title_nep
                          }
                        >
                          <p
                            dangerouslySetInnerHTML={{
                              __html:
                                getCurrentLanguage() === "en"
                                  ? `${item?.description_en}`
                                  : `${item?.description_nep}`,
                            }}
                          ></p>
                        </AccordionItem>
                      </div>
                    ))}
                  </Accordion>
                </Wrapper>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Faqs;
