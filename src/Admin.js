import React, { useEffect, useState }  from 'react';
import './Admin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const navigate = useNavigate();

  if(localStorage.getItem('isAdmin')!=="admin"){
    navigate('/'); 
  }
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  const [data, setData] = useState(null);
  const handleUnBlock = async (e,email) => {
    try {
       await axios.post('https://pneuexpress.online/api/unBlockUser.php',  {
                email:email
              });
      window.location.reload(true);

        } catch (error) {
          console.error('Error sending form data:', error);
        }
};
  const handleBlock = async (e,email) => {
    try {
       await axios.post('https://pneuexpress.online/api/blockUser.php',  {
                email:email
              });
      window.location.reload(true);
      
        } catch (error) {
          console.error('Error sending form data:', error);
        }
};

const handleVerify = async (e,email) => {
  e.target.innerHTML = '<span className="verify">Verified</span>';
  e.target.style.opacity = '0.5';
  try {
       await axios.post('https://pneuexpress.online/api/activate.php',  {
                email:email
              });
        } catch (error) {
          console.error('Error sending form data:', error);
        }

};

  
  
  

  const login = async (username, password, email) => {
  const formData = {
    username: username,
    password: password,
    with_captcha : 0,
  };
  //(formData);

  try {
    const response = await axios.post('https://pneuexpress.online/api/auth.php', formData, {
  headers: { 'Content-Type': 'application/json' }
});
    //('Form data sent successfully:', response.data);

    if (response.data.response2 && response.data.response2.success === 1) {
      navigate('/feed', { state: { email: email } });
    }

    if(response.data.response2 && response.data.response2.success===2){
              navigate('/blocked', { state: { email:response.data.response1.email } });
            }
  } catch (error) {
    console.error('Error sending form data:', error);
  }
};

  useEffect(() => {
    const url = 'https://pneuexpress.online/api/stats.php';

    axios.get(url)
      .then(response => {
        setData(response.data); 
        //(response.data);
      })
      .catch(err => {
      });
  }, []); 

  return (
    <>
    <header className="app-header">
        <div className="navbar">
          <button className="sidebar-toggle">
            <i className="icon-list"></i>
          </button>
          <div className="navbar-right">
            <button className="fullscreen-toggle">
              <i className="icon-maximize"></i>
              <i className="icon-minimize"></i>
            </button>
            <div className="user-menu">
              <a href="/"><span className="logout-button">Logout</span></a>
            </div>
          </div>
        </div>
      </header>
    <div className="app-wrapper">
     

      <main className="app-main">
        <div className="app-content">
          <div className="info-boxes">
            <div className="info-box primary">
                <i className="fa-solid fa-user"></i>
                <div className="info-content">
                <span className="info-text">Total Users</span>
                <span className="info-number">{data && data[4]}</span>
              </div>
            </div>

            <div className="info-box danger">
                <i className="fa-solid fa-signs-post"></i>
                <div className="info-content">
                <span className="info-text">Total Posts</span>
                <span className="info-number">{data && data[2]}</span>
              </div>
            </div>

            <div className="info-box success">
                <i className="fa-solid fa-comment"></i>
                <div className="info-content">
                <span className="info-text">Total Comments</span>
                <span className="info-number">{data && data[3]}</span>
              </div>
            </div>

            <div className="info-box warning">
                <i className="fa-solid fa-heart"></i>
                <div className="info-content">
                <span className="info-text">Total Likes</span>
                <span className="info-number">{data && data[1]}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Users List</h5>
            </div>
            <div className="card-body">
  <table>
  <tr><td>#No</td><td>User</td><td>Actions</td></tr>
  {data && data[0].map((item, index) => (
      <tr key={index}>
        <td>#{item.id}</td>  
        <td><div style={{display:'flex'}}>
          {item.image===null ? <i id="profile10" className="dropbtn fa-solid fa-user"></i> : <img onLoad={handleImageLoad} loading="lazy" style={{
                      marginLeft: '1px',
                      marginBottom: '6px',
                      maxWidth: '100%',
                      marginRight: '15px',
                      height: '40px',
                      opacity: isLoaded ? 1 : 0,
                      width: '40px',
                      verticalAlign: 'middle',
                      transition: 'opacity 0.5s ease',
                      borderRadius: '50%',
                      cursor:'initial'
                  }} src={`https://pneuexpress.online/api/${item.image}`} alt='profile'/>}
            <div>
              <span style={{fontWeight:'bold'}}>{item.first_name} {item.last_name}</span> - <span style={{color:'gray'}}>@{item.username}</span><br/>
              <span style={{color:'gray'}}>{item.email}</span>
            </div>
            </div>
        </td>  
        <td>
          <span onClick={()=>login(item.username,item.password,item.email)} style={{color:'white',backgroundColor:'green',borderRadius:'5px',padding:'5px 10px',display:'inline-block',marginBottom:'10px',marginRight:'5px'}}>Login User</span>   
           {(item.active==='1' && item.blocked==="0") && <span className="block" onClick={(e) => handleBlock(e, item.email)}>Block</span> }   
           {(item.active==='1' && item.blocked==="1") && <span className="unblock" onClick={(e) => handleUnBlock(e, item.email)}>Unblock</span> }   
           {item.active==='0' && <span onClick={(e) => handleVerify(e, item.email)} className="verify">Verify</span>}   
        </td>  
      </tr>
    ))}</table>
            </div>
          </div>
        </div>
      </main>
    </div></>
  );
}

export default Admin;
