import React from 'react'
import './Sign.css'
import { Link } from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
function Home() {
  const [captchaToken, setCaptchaToken] = useState(null);
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate('/?verified=1'); 
  };
  const [formData, setFormData] = useState({
    firstName: '',
    lastName:'',
    gender:'male',
    e_mail:'',
    username:'',
    password:''
  });
  const [good1,setGood1] = useState(false)
  const [good2,setGood2] = useState(false)
  const [good3,setGood3] = useState(false)
  const [good4,setGood4] = useState(false)
  const [good5,setGood5] = useState(false)
  const [good30,setGood30] = useState(false)
  const [good31,setGood31] = useState(false)
const handleCaptchaChange = (token) => {
        setCaptchaToken(token)
      setFormData(prev => ({ ...prev, captchaToken: token }));
    }
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
  const handleChange3 = (e)=>{
    const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
      
  }
  const handleChange4 = (e)=>{
    const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    
  }
  const handleChange5 = (e)=>{
    const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
      
  }
  const handleChange6 = (e)=>{
    const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      alert("Please verify that you are not a robot");
      return;
    }
    setGood4(false)
    setGood1(false)
    setGood2(false)
    setGood3(false)
    setGood5(false)
    setGood30(false)
    setGood31(false)

    if(formData.firstName===''){
      setGood1(true)
    }else if(formData.lastName===''){
      setGood2(true)
    }
    else if(formData.username===''){
      setGood31(true)
    }
    else if(formData.password===''){
      setGood5(true)
    }
    else{
      try {
        const response = await axios.post('https://pneuexpress.online/api/sign_up.php', formData);

        if(response.data === ""){
          handleRedirect()
        }
        if(response.data.response1 && response.data.response1.error===0){
          setGood4(true)
        }
        if(response.data.response2 && response.data.response2.error===1){
          setGood30(true)
        }

        
      } catch (error) {
        console.error('Error sending form data:', error);
      }
    }
   
    
  };
  return (
    <div id="evr">
        <form autocomplete="off" id="from" action='' method="POST" onSubmit={handleSubmit}>
            <div style={{margin:'15px 155 0 15px',textAlign:'center'}}>
            <span id="log">pictogram</span>
            </div>
            <label style={{margin:'10px 20px',fontSize:'1.2em',fontWeight:'400'}}>Create new account
            </label><br/>
            <input autocomplete="off" onChange={handleChange1} value={formData.firstName} style={{width:'40%',margin:'20px 20px'}} type="text" placeholder='first name' name='firstName'/>
            
            <input autocomplete="off" onChange={handleChange2} value={formData.lastName} style={{width:'40%',margin:'10px 0px'}}type="text" placeholder='last name' name='lastName'/>
            {good1 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(243, 10, 100)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>first name is not given</span>}
            {good2 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(243, 10, 100)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>last name is not given</span>}
            <div style={{display:'flex',alignItems:'center'}}>
            <input autocomplete="off" checked={formData.gender === 'male'} onChange={handleChange3} type="radio" id="male" value='male' name="gender"/><label htmlFor='male'>Male</label>
            <input autocomplete="off" checked={formData.gender === 'female'} onChange={handleChange3} type="radio" id="female" value='female' name="gender"/><label htmlFor='female'>Female</label>
             
            </div>
            <input autocomplete="off" value={formData.e_mail} onChange={handleChange4} style={{width:'90%',margin:'15px 20px 10px 20px'}} required type="email" placeholder='email' name='e_mail'/>
            {good3 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(243, 10, 100)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>email is not given</span>}
            {good30 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(243, 10, 100)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>email id is already registered</span>}
            <input autocomplete="off" value={formData.username} onChange={handleChange5} style={{width:'90%',margin:'5px 20px'}} type="text" placeholder='username' name='username'/>
            {good4 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(243, 10, 100)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>username is already registered</span>}
            {good31 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(243, 10, 100)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>username is not given</span>}
            <input autocomplete="off" value={formData.password} onChange={handleChange6} style={{width:'90%',margin:'5px 20px'}} type="password" placeholder='password' name='password'/>
            {good5 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(243, 10, 100)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>password is not given</span>}
              <div style={{ display: "flex", justifyContent: "center" }}>
                  <ReCAPTCHA
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                    onChange={handleCaptchaChange}
                  />
                </div>
            <div style={{margin:'10px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}><input autocomplete="off" style={{padding:'5px 10px',backgroundColor:'#0b5ed7',color:'white',borderRadius:'5px'}} type="submit" value="Sign Up" name="sign"/><Link to='/' style={{textDecoration:'none'}} >Already have an account ?</Link></div>
        </form>
    </div>
  )
}

export default Home


