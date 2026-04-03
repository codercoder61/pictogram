import React , {useState} from 'react'
import './Code.css'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Code() {
      const location = useLocation();
    const [code,setCode] = useState('')
    const [good,setGood] = useState(false)
    const [good1,setGood1] = useState(false)

    const navigate = useNavigate();

    const handleChange = (e) =>{
      setCode(e.target.value)
    }
    const handleSubmit = (e) =>{
      e.preventDefault()
      setGood(false)
      setGood1(false)

      if(code===''){
        setGood(true)
      }else{
        if(code===location.state.code){
          navigate('/newpass', { state: { response: location.state.response } });
        }else{
          setGood1(true)
          setGood(false)

        }
      }
    }
  return (
    <div id="evr">
        <form autoComplete="off" id="from" action='' method="POST" onSubmit={handleSubmit}>
            <label style={{display:'inline-block',margin:'10px 20px',fontSize:'1.2em',fontWeight:'400'}}>Forgot Your Password ?</label><br/>
            <span style={{display:'inline-block',margin:'5px 20px',fontWeight:'400'}}>Enter 6 Digit Code Sended to You - </span><br/>
            <span style={{display:'inline-block',margin:'0px 20px',fontSize:'1em',fontWeight:'400'}}>{location.state.response}</span>
            <input autoComplete="off" value={code} onChange={handleChange} style={{width:'90%',margin:'10px 20px'}} type="text" placeholder='######' name='code'/><br/>
            {good && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(177, 7, 72)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>enter 6 digit code !</span>}
            {good1 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(177, 7, 72)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>incorrect verifictaion code !</span>}
            <div style={{margin:'10px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}><input autoComplete="off" style={{padding:'5px 10px',backgroundColor:'#0b5ed7',color:'white',borderRadius:'5px'}} type="submit" value="Verify Code" name="sign"/></div>
            <Link to='/' style={{margin:'10px 20px'}} href=""><i style={{marginRight:'5px'}} className="fa-solid fa-circle-arrow-left"></i>Go Back To Login</Link>
        </form>
    </div>
  )
}

export default Code
