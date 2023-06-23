import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import TopBar from './globals/TopBar';
import NavBar from './globals/NavBar';
import Footer from './globals/Footer';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import Gallery from './pages/Gallery';
import AllGallery from './pages/AllGallery';
import PlanTrip from './pages/PlanTrip';
import AboutUs from './pages/AboutUs';
import Faq from './pages/Faq';
import Packages from './pages/Packages';
import Activities from './pages/Activities';
import Blogs from './pages/Blogs';
import TripDetail from './pages/TripDetail';
import BookNow from './pages/BookNow';
import Outbond from './pages/Outbond';
import OutbondAll from './pages/OutbondAll';
import SeeAll from './pages/SeeAll'
import NoDataFound from './pages/NoDataFound';
import axiosBaseURL from './baseUrl';
import { Helmet } from "react-helmet";
const ogUrl = "https://admin.mountainnepalholidays.com/";

function App() {
  const [indexData, setIndexData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosBaseURL.get("/api/index", {                     
    }).then((res) => {
      setIndexData(res.data);
      setLoading(false);
    })
  }, []);
const meta= indexData?.siteSetting;
  return (
    <div className="App">
      { loading ?<div className='spinner_main'><img  src={process.env.PUBLIC_URL + '/images/loader.gif'} alt="Loader" width={'400px'} height={'400px'}/> </div> :
      <>    
                <Helmet>
                  <meta charSet="utf-8" />
                  <title>{meta?.meta_title}</title>
                  <meta name="description" content={meta?.meta_description} />
                  <meta name="keywords" content={meta?.meta_keywords} />
                  <meta property='og:image' key='og:image' content={ogUrl+meta?.og_image} />
                  <meta property="og:title" content={meta?.meta_title} />
                  <meta property="og:description" content={meta?.meta_description} />
                </Helmet>             
      <TopBar topData = {indexData}/>
      <NavBar navData={indexData}/>
            <Routes>
              <Route path="/" element={<Home homeData={indexData} />} />
              <Route path="/ContactUs" element={<ContactUs contact={indexData}/>} />
              <Route path="/Gallery" element={<Gallery />} />
              <Route path="/AllGallery/:id" element={<AllGallery />} />
              <Route path="/PlanTrip" element={<PlanTrip />} />
              <Route path="/AboutUs" element={<AboutUs />} />
              <Route path="/Packages" element={<Packages />} />
              <Route path="/region/:slug" element={<Packages />} />
              <Route path="/grade/:grade" element={<Packages />} />
              <Route path="/Faq" element={<Faq />} />
              <Route path="/Activities/:id" element={<Activities child={'child'} />} />
              <Route path="/Activities/category/:id" element={<Activities child={'parent'}/>} />
              <Route path="/Blogs" element={<Blogs />} />
              <Route path="/TripDetail/:slug" element={<TripDetail />} />
              <Route path="/BookNow" element={<BookNow bookNow={indexData}/>} />
              <Route path="/Outbond/:slug" element={<Outbond />} />
              <Route path="/OutbondAll/:slug" element={<OutbondAll />} />
              <Route path="/SeeAll" element={<SeeAll SeeAllData={indexData}/>} />
              <Route path="*" element={<NoDataFound />} />
            </Routes>
        <Footer footerData = {indexData}/>
        </>
  }
    </div>
  );
}

export default App;