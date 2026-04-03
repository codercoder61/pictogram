import React,{useState} from 'react'
import './Home.css'
import ReCAPTCHA from "react-google-recaptcha";

import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Home() {
    const [captchaToken, setCaptchaToken] = useState(null);
const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("verified") === "1") {
      alert("Account email verification sent");
    }
  }, [location]);
  localStorage.removeItem("email");
  if(localStorage.getItem('isAdmin')==='admin'){
    localStorage.removeItem('isAdmin');
  }
  

  const [formData, setFormData] = useState({
      username:'',
      password:''
  });
    const navigate = useNavigate();
   const [good,setGood] = useState(false)
   const [good2,setGood2] = useState(false)
   const [gaga,setGaga] = useState(false)

  const handleChange1 = (e)=>{
    const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
     
  }
  const handleChange2 = (e)=>{
    const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
     
  }

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token)
      setFormData(prev => ({ ...prev, captchaToken: token }));
    }

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      alert("Please verify that you are not a robot");
      return;
    }
    setGood(false)
    setGood2(false)
    setGaga(false)

    if(formData.username===''){
      setGood(true)
    }else{
      if(formData.password===''){
        setGood2(true)
      }else{
        try {
          const response = await axios.post('https://pneuexpress.online/api/auth.php', formData);
          if(response.data.response1 && response.data.response1.success===2){
              localStorage.setItem('isAdmin', "admin");
              navigate('/admin');
            }
          if(response.data.response2 && response.data.response2.success===2){
              navigate('/blocked', { state: { email:response.data.response1.email } });
            }
          if(response.data.response2 && response.data.response2.success===0)
            alert('A verification email was sent!')
          else{
            if(response.data.response2 && response.data.response2.success===1){
              navigate('/feed', { state: { email:response.data.response1.email } });
            }
          }
          if(response.data.response1 &&  response.data.response1.error===0){
            setGaga(true)
          }
        } catch (error) {
          console.error('Error sending form data:', error);
        }
      }
    }
    
  
  };
  return (
    <>
      <div id="evr">
          <form id="from" action='' autocomplete="off" method="POST" onSubmit={handleSubmit}>
              <div style={{margin:'15px 15px 0 15px',textAlign:'center'}}>
                  <span id='log'>pictogram</span>
              </div>
              <label style={{margin:'10px 20px',fontSize:'1.2em',fontWeight:'400'}}>Please sign in</label><br/>
              <input autocomplete="off" onChange={handleChange1} value={formData.username} style={{width:'90%',margin:'10px 20px'}} type="text" placeholder='username/email' name='username'/><br/>
              {good && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(177, 7, 72)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>username/email is not given</span>}
              <input autocomplete="off" onChange={handleChange2} value={formData.password} style={{width:'90%',margin:'10px 20px'}} type="password" placeholder='password' name='password'/>
              {good2 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(177, 7, 72)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>password is not given</span>}
              {gaga && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(177, 7, 72)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>something is incorrect, we can't find you</span>}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <ReCAPTCHA
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                    onChange={handleCaptchaChange}
                  />
                </div>
              <div style={{margin:'10px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}><input autocomplete="off" style={{padding:'5px 10px',backgroundColor:'#0b5ed7',color:'white',borderRadius:'5px'}} type="submit" value="Sign in" name="sign"/><Link style={{textDecoration:'none'}} to='/signup'>Create New Account</Link></div>
              <Link to='/forgot' style={{margin:'10px 20px'}}>Forgot password?</Link>
          </form>
      </div>
    </>
  )
}

export default Home
