import React from 'react'
import './Forgot.css'
import {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
function Home() {
    const [captchaToken, setCaptchaToken] = useState(null);
    const [good1,setGood1] = useState(false)
    const [good3,setGood3] = useState(false)
    const [good4,setGood4] = useState(false)
    const [email,setEmail] = useState('')
   const handleCaptchaChange = (token) => {
        setCaptchaToken(token)
    }
    const handleSubmit = async (e) => {
        setGood3(false)
      e.preventDefault();
        if (!captchaToken) {
      alert("Please verify that you are not a robot");
      return;
    }
        if(email===''){
          setGood1(true)
            setGood3(false)
        }else{
            setGood4(true)
            setGood1(false)
          try {
            await axios.post('http://localhost/api/auth2.php',{
              email: email,  
                captchaToken:captchaToken,
            });
              setGood4(false)
            setGood3(true)
          } catch (error) {
            console.error('Error sending form data:', error);
          }
        }
      }
      const handleChange = (e)=>{
        setEmail(e.target.value)
      }
  return (
    <div id="evr">
        <form autocomplete="off" id="from" action='' method="POST" onSubmit={handleSubmit}>
            <label style={{margin:'10px 20px',fontSize:'1.2em',fontWeight:'400'}}>Forgot Your Password ?</label><br/>
            <input autocomplete="off" value={email} onChange={handleChange} style={{width:'90%',margin:'10px 20px'}} type="email" placeholder='enter your email' name='email'/><br/>
            {good3 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(177, 7, 72)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>if an account exists, we sent an email</span>}
{good4 && <div className="loader2"></div>}

            {good1 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(177, 7, 72)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>enter your email id !</span>}
            <div style={{ display: "flex", justifyContent: "center" }}>
                  <ReCAPTCHA
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                    onChange={handleCaptchaChange}
                  />
                </div>
            <div style={{margin:'10px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}><input autocomplete="off" style={{padding:'5px 10px',backgroundColor:'#0b5ed7',color:'white',borderRadius:'5px'}} type="submit" value="Send Request" name="sign"/></div>
            <Link to='/' style={{margin:'10px 20px'}} href=""><i style={{marginRight:'5px'}} className="fa-solid fa-circle-arrow-left"></i>Go Back To Login</Link>
        </form>
    </div>
  )
}

export default Home
