import React from "react";
import '../styles/style.css'
import '../styles/button.css'
import '../styles/responsive.css'
import { Link } from 'react-router-dom';
import {baseUrl} from '../baseUrl';
import axiosBaseURL from "../baseUrl";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";

const Footer = ({footerData}) => {
  const { t } = useTranslation();
  const footer = footerData ?. siteSetting;
  const [email, setEmail] = React.useState("");
  var emailadress = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  var bodyFormData = new FormData();
  bodyFormData.append('email', email);

  const handleSubmit = (e) => {
      e.preventDefault();
      if(email.match(emailadress)){
      axiosBaseURL.post("/api/subscription-email", bodyFormData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(console.log)
      .catch(console.error);
      toast.success("We will contact you with in 24 Hours")
      setEmail("")
      }else{
          toast.error("Please Enter Valid Email Adress")
      }
      
  }
  return (
    <>
   <section className="footer_sec">
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-1 foot_logo_b text-center">
            <img src={baseUrl + footer ?. logo} alt="English" />
            </div>
            <div className="col-md-3 foot_list">
            <ul>
              <li><strong>Mountain Nepal Holidays</strong></li>
              <li>{footer?.location}</li>
              <li>{footer?.contact}</li>
              <li>{footer?.email}</li>
             
            </ul>
            <ul className="foot_svg">
              <li>
              <Link to={footer ?. facebook} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
                </svg>
                </Link>
                </li>
                <li>
                <Link to={footer ?. twitter} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg>
                </Link>
                </li>
                <li>
                <Link to={footer ?. instagram} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z"/></svg>
                </Link>
                </li>
                <li>
                <Link to={footer ?. youtube} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M186.8 202.1l95.2 54.1-95.2 54.1V202.1zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-42 176.3s0-59.6-7.6-88.2c-4.2-15.8-16.5-28.2-32.2-32.4C337.9 128 224 128 224 128s-113.9 0-142.2 7.7c-15.7 4.2-28 16.6-32.2 32.4-7.6 28.5-7.6 88.2-7.6 88.2s0 59.6 7.6 88.2c4.2 15.8 16.5 27.7 32.2 31.9C110.1 384 224 384 224 384s113.9 0 142.2-7.7c15.7-4.2 28-16.1 32.2-31.9 7.6-28.5 7.6-88.1 7.6-88.1z"/></svg>
                </Link>
                </li>
                <li>
                <Link to={`https://www.tripadvisor.com/Profile/MountainNepalH?fid=c1eabc23-a968-4341-b70e-949c32138be5`} target="_blank">
                <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.2 320.2" width="2500" height="1563">
                <path className="st0" d="M128.2 127.9C92.7 127.9 64 156.6 64 192c0 35.4 28.7 64.1 64.1 64.1 35.4 0 64.1-28.7 64.1-64.1.1-35.4-28.6-64.1-64-64.1zm0 110c-25.3 0-45.9-20.5-45.9-45.9s20.5-45.9 45.9-45.9S174 166.7 174 192s-20.5 45.9-45.8 45.9z"/><circle className="st0" cx="128.4" cy="191.9" r="31.9"/>
                <path className="st0" d="M384.2 127.9c-35.4 0-64.1 28.7-64.1 64.1 0 35.4 28.7 64.1 64.1 64.1 35.4 0 64.1-28.7 64.1-64.1 0-35.4-28.7-64.1-64.1-64.1zm0 110c-25.3 0-45.9-20.5-45.9-45.9s20.5-45.9 45.9-45.9S430 166.7 430 192s-20.5 45.9-45.8 45.9z"/><circle className="st0" cx="384.4" cy="191.9" r="31.9"/><path className="st0" d="M474.4 101.2l37.7-37.4h-76.4C392.9 29 321.8 0 255.9 0c-66 0-136.5 29-179.3 63.8H0l37.7 37.4C14.4 124.4 0 156.5 0 192c0 70.8 57.4 128.2 128.2 128.2 32.5 0 62.2-12.1 84.8-32.1l43.4 31.9 42.9-31.2-.5-1.2c22.7 20.2 52.5 32.5 85.3 32.5 70.8 0 128.2-57.4 128.2-128.2-.1-35.4-14.6-67.5-37.9-90.7zM368 64.8c-60.7 7.6-108.3 57.6-111.9 119.5-3.7-62-51.4-112.1-112.3-119.5 30.6-22 69.6-32.8 112.1-32.8S337.4 42.8 368 64.8zM128.2 288.2C75 288.2 32 245.1 32 192s43.1-96.2 96.2-96.2 96.2 43.1 96.2 96.2c-.1 53.1-43.1 96.2-96.2 96.2zm256 0c-53.1 0-96.2-43.1-96.2-96.2s43.1-96.2 96.2-96.2 96.2 43.1 96.2 96.2c-.1 53.1-43.1 96.2-96.2 96.2z"/></svg>
                </Link>
                </li>
                </ul>
            </div>
            <div className="col-md-3 ">          
            <div className="row">
              <div className="col-md-6 foot_list">
              <ul>
              <li><strong>{t("quick_links")}</strong></li>
              <li><Link to={"/"}>{t("home")}</Link></li>
              <li><Link to={"/AboutUs"}>{t("about_us")}</Link></li>
              <li><Link to={"/Packages"}>{t("packages")}</Link></li>
              <li><Link to={"/Faq"}>FAQ</Link></li>
            </ul>
              </div>
              <div className="col-md-6 foot_list">
              <ul>
              <li><strong className="disabbled_quick">{t("quick_links")}</strong></li>
              <li><Link to={"/Activities/:id"}>{t("activities")}</Link></li>
              <li><Link to={"/PlanTrip"}>{t("trip")}</Link></li>
              <li><Link to={"/ContactUs"}>{t("contact")}</Link></li>            
            </ul>
              </div>
            
            </div>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-4 foot_sub">
            <label htmlFor="suscribe"><strong>{t("subscribe_exicting_offer")}</strong></label>  <br />    
            <form className="subscribe_input" onSubmit={handleSubmit}>
            <input type="text" placeholder={t("email_address")} name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <button className="submit_button" type='submit'>{t("subscribe")}</button>
            <ToastContainer />
          </form>
            </div>
          
        </div>
    </div>
   </section>
   <section className="footer_bottom text-center">
<p className="mb-0">© 2022-2023 Mountain Nepal Holidays . Website by : <a href="https://onvirotech.com/" target="_blank"> Onviro tech </a></p>
   </section>
    </>
  )
}


export default Footer
