import React from 'react'
import SimpleReactFooter from "simple-react-footer";
import './Footer.css';
import MailIcon from '@material-ui/icons/Mail';
import Mail from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import Phone from '@material-ui/icons/Phone';

function Footer() {
       return(
           <div className="footer">
               <div className="footer_sub">
                <div className="footer_left">
                    <h1>Fortunelands</h1>
                </div>
                <div className="footer_middle">
                    <h2>Contact Us</h2>
                    <li><a href="mailto:saikalyan1420@"> 📧 saiklayan1420@gmail.com</a></li>
                    <li><a href="mailto:saikalyan1420@"> 📞7337356899</a></li>

                    
                    
                </div>
                <div className="footer_right">
                    <h2>Reach Us</h2>
                    <p>Hyderabad</p>               
               </div>
            </div>
            <div className="copyrightText">
            <p>Copyright © 2021 FortuneLands.</p>
            <p> Made By ShaPages</p>
            </div>
               
        </div>
        ) 
      
      };


export default Footer