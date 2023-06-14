import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";
import "react-bootstrap-submenu/dist/index.css";
import { Link } from "react-router-dom";
import { baseUrl } from "../baseUrl";
import { useTranslation } from "react-i18next";
import getCurrentLanguage from "../components/GetCurrentLanguage";

function OffcanvasExample({ navData }) {
  const { t } = useTranslation();
  const logos = navData?.siteSetting;
  const packagesData = navData?.regions;
  const outboundsData = navData?.outbounds;
  const activityCategories = navData?.activityCategories;

  const grade = [
    {
      id: 1,
      value: "Beginner",
    },
    {
      id: 2,
      value: "Moderate",
    },
    {
      id: 3,
      value: "Sporting",
    },
    {
      id: 4,
      value: "Expert",
    },
  ];

  const offCanvasRef = React.useRef();
  const closeOffCanvas = () => {
    offCanvasRef.current?.backdrop?.click();
  };

  return (
    <>
      {["lg"].map((expand) => (
        <Navbar key={expand} bg="#fff" expand={expand}>
          <Container>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <div className="main_logo2">
              <img
                src={baseUrl + logos?.logo}
                alt="Logo"
                width={"60px"}
                height={"40px"}
              />
            </div>

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
              ref={offCanvasRef}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img
                    src={baseUrl + logos?.logo}
                    alt="Logo"
                    width={"60px"}
                    height={"40px"}
                  />
                </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>
                <Nav className="justify-content-start flex-grow-1 pe-3 pt_nav">
                  <Nav.Link
                    as={Link}
                    to={"/"}
                    data-bs-dismiss="offcanvas"
                    onClick={closeOffCanvas}
                  >
                    {t("home")}
                  </Nav.Link>

                  {packagesData && packagesData?.length > 0 ? (
                    <NavDropdown
                      title={t("packages")}
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      <DropdownSubmenu title={t("region")}>
                        {packagesData?.map((item, index) => (
                          <NavDropdown.Item
                            as={Link}
                            to={`/region/${item?.slug}`}
                            key={index}
                            onClick={closeOffCanvas}
                          >
                            {getCurrentLanguage() == "en"
                              ? `${item?.title_en}`
                              : `${item?.title_nep}`}
                          </NavDropdown.Item>
                        ))}
                      </DropdownSubmenu>
                      <DropdownSubmenu title={t("grade")}>
                        {grade?.map((item, index) => (
                          <NavDropdown.Item
                            as={Link}
                            to={`/grade/${item?.value}`}
                            onClick={closeOffCanvas}
                            key={index}
                          >
                            {item?.value}
                          </NavDropdown.Item>
                        ))}
                      </DropdownSubmenu>
                    </NavDropdown>
                  ) : (
                    "null"
                  )}

                  <NavDropdownMenu
                    title={t("activities")}
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    {activityCategories?.map((item, index) => (
                      <div key={index}>
                        {item?.activities.length === 0 ? (
                      <NavDropdown.Item
                      as={Link}
                      to={`/Activities/category/${item?.id}`}
                      onClick={closeOffCanvas}
                    >
                      {getCurrentLanguage()==="de"? item?.title_nep : item?.title_en}
                    </NavDropdown.Item>
                  ) : (
                    <DropdownSubmenu title={item.title_en}>
                      {item.activities.map((child, index) => (
                        <NavDropdown.Item
                          as={Link}
                          to={`/Activities/${child?.id}`}
                          onClick={closeOffCanvas}
                          key={index}
                        >
                             {getCurrentLanguage() === "de"
                                        ? child?.title_nep
                                        : child?.title_en}
                        </NavDropdown.Item>
                            ))}
                          </DropdownSubmenu>
                        )}
                      </div>
                    ))}
                    {/* <NavDropdown.Item as={Link} to={`/Activities`} onClick={closeOffCanvas}>Sijan</NavDropdown.Item>  */}
                  </NavDropdownMenu>

                  <Nav.Link as={Link} to={"/PlanTrip"} onClick={closeOffCanvas}>
                    {t("trip")}
                  </Nav.Link>
                </Nav>
                <div className="main_logo">
                  <img
                    src={baseUrl + logos?.logo}
                    alt="Logo"
                    width={"115px"}
                    height={"80px"}
                  />
                </div>
                <Nav className="justify-content-end flex-grow-1 pe-3 pt_nav">
                  <Nav.Link as={Link} to={"/Blogs"} onClick={closeOffCanvas}>
                    Blogs
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/gallery"} onClick={closeOffCanvas}>
                    {t("gallery")}
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to={"/contactus"}
                    onClick={closeOffCanvas}
                  >
                    {t("contact")}
                  </Nav.Link>

                  {outboundsData && outboundsData?.length > 0 ? (
                    <NavDropdownMenu
                      title="Outbound"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      {outboundsData?.map((item, index) => (
                        <NavDropdown.Item
                          as={Link}
                          to={`/outbond/${item?.slug}`}
                          key={index}
                          onClick={closeOffCanvas}
                        >
                          {getCurrentLanguage() == "en"
                            ? `${item?.title_en}`
                            : `${item?.title_nep}`}
                        </NavDropdown.Item>
                      ))}
                    </NavDropdownMenu>
                  ) : (
                    "null"
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;
