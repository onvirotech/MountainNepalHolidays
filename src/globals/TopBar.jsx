import React from 'react'
import '../styles/style.css'
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const TopBar = () => {  
  const { t } = useTranslation();
  
    return (
        <div className='topbar_main'>
          <div className='container-fluid ' align="end">
          <div className='row'>
          <div className='col-md-12 top_lang'>
            <ul>
          <li>{ t('covid_update') }</li>
         
         <li className='select_lang'> 
       
<LanguageSwitcher />           
                           
         </li>
         </ul>
          </div>          
          </div>
          </div>
        
        </div>
        
    )
}

export default TopBar