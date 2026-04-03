import React,{useState,useEffect} from 'react'
import './Home.css'
import axios from 'axios'
import { useLocation } from 'react-router-dom';

let res = null
function Home() {
    const location = useLocation();
  const email = location.state?.email;

    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        email:''
    });
     const getUserData = async (email) => {
        const data = { input: email }; 
        try {
          res = await axios.post('http://localhost/api/getUserData.php', data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          setFormData(prevState => ({
            ...prevState,
            email: res.data.response.email,
            firstName: res.data.response.first_name,
            lastName: res.data.response.last_name,
          }));
        } catch (error) {
          console.error('Error:', error);
        }
      };
  useEffect(() => {
      getUserData(email)
  }, [email]);
  return (
    <div id="evr">
        <form id="from" method="POST">
            <div style={{fontWeight:'bold',fontsize:'1.2em',margin:'15px 15px 0 15px'}}>
                <div style={{textAlign:'center'}}><span id='log'>pictogram</span></div>
            <p>
            {formData.firstName && formData.lastName 
              ? `${formData.firstName} ${formData.lastName}`
              : 'User'} 
          </p>
          <p>
            {formData.email && `(${formData.email})` } Your account is Blocked By Admin
          </p>
            </div>
        </form>
    </div>
  )
}

export default Home
