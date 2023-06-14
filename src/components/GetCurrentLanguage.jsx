import { Cookies } from "react-cookie";

const getCurrentLanguage = () => {
  const cookies = new Cookies();
  return cookies.get("lang");
};

export default getCurrentLanguage;
