import React,{useState} from 'react'
import './NewPass.css'
import { Link } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";

function Home() {
  
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [good1,setGood1] = useState(false)
  const [good3,setGood3] = useState(false)
  const [pass,setPass] = useState('')  
  const [message, setMessage] = useState("");
  const handleChange = (e)=>{
    setPass(e.target.value)
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    setGood3(true)
    if(pass===''){
      setGood1(true)
    setGood3(false)
    }else{
      setGood1(false)
      try {
       const res = await fetch("https://pneuexpress.online/api/update_password.php", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ token, password: pass })
        });
        const data = await res.json();
              setGood3(false)

        setMessage(data);
        
        }
        catch (error) {
          console.error('Error sending form data:', error);
        }
      } 
    }
  
  return (
    <div id="evr">
        <form autocomplete="off" id="from" action='' method="POST" onSubmit={handleSubmit}>
            <label style={{display:'inline-block',margin:'10px 20px',fontSize:'1.2em',fontWeight:'400'}}>Forgot Your Password ?</label><br/>
            <span style={{margin:'10px 20px',display:'inline-block',fontWeight:'400'}}>Enter your new password</span>
            <input autocomplete="off" value={pass} onChange={handleChange} style={{width:'90%',margin:'10px 20px'}} type="password" placeholder='new password' name='code'/><br/>
            {good1 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(177, 7, 72)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>enter your new password</span>}
            <div style={{margin:'10px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}><input autocomplete="off" style={{padding:'5px 10px',backgroundColor:'#0b5ed7',color:'white',borderRadius:'5px'}} type="submit" value="Change Password" name="sign"/></div>
{good3 && <div className="loader2"></div>}
  {!good3 && message && <p style={{    background:message.status==="error"? '#ff9090':'#5ded5d',
    margin: '10px 20px',
    color: 'white',
    borderRadius: '5px',
    padding: '10px',
    width: 'fit-content',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center'}}>{message.status!=="error"?"Password Updated":"Invalid or expired token"}</p>}
            <Link to='/' style={{margin:'10px 20px'}} href=""><i style={{marginRight:'5px'}} className="fa-solid fa-circle-arrow-left"></i>Go Back To Login</Link>
        </form>
    </div>
  )
}

export default Home
