import React,{useState, useEffect, useRef,useCallback, useMemo} from 'react'
import './Profile.css'
import { Link} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Comments from './Comments';

let res
let rs = null
const regex = /^del_[0-9]+/;
let checkNewMessages = null
let checkNewCommennt
let checkNewComment = []
let rresponses = null

function Profile() {
  const [spinner, setSpinner] = useState(false);
   const handleImageLoad2 = (e) => {
    e.target.style.opacity = 1;
  };
     const opened = useMemo(() => ({
  width: '350px',
  opacity: '1',
  position: 'fixed',
  zIndex: '100',
  top: '0',
  bottom: '0',
}), []);
    
  let [username, setUsername] = useState("");

  let [username2, setUsername2] = useState("");
  let [resc,setResc] = useState(null)
  let [flagg,setFlagg] = useState(true)
 
    const [notig, setNotig] = useState(null);
    let [newMessagess, setNewMessagess] = useState([]);
    
const getUserDataak = async (username) => {
  let resp
  const data = { email: localStorage.getItem("email") , input: username }; 
  try {
    resp = await axios.post('https://pneuexpress.online/api/getUserData.php', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    resp.data.followers.map(async (follower)=>{
      let sa = 0
      const da = { email: localStorage.getItem("email") ,id:follower.id }; 
      try {
        sa = await axios.post('https://pneuexpress.online/api/checkFollow.php', da, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Error:', error);
      }
  follower.ok = sa.data
    })

    resp.data.following.map(async (follower)=>{
      let sad = 0
      const dad = { email: localStorage.getItem("email") ,id:follower.id }; 
      try {
        sad = await axios.post('https://pneuexpress.online/api/checkFollow.php', dad, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Error:', error);
      }
  follower.ok = sad.data
    })
    

    
    
    if(resp.data.response.image){
      setGood4(true)
    }
    
    setFormData(prevState => ({
      ...prevState,
      e_mail: resp.data.response.email,
      firstName: resp.data.response.first_name,
      gender: resp.data.response.gender,
      lastName: resp.data.response.last_name,
      username: resp.data.response.username,
      id:resp.data.response.id,
    }));
  } catch (error) {
    console.error('Error:', error);
  }
 return resp;
};
  const location = useLocation();
    const [trigger, setTrigger] = useState(false)
    const [notgpv, setNotgp] = useState(null);
  
     const [checkNewComments, setCheckNewComments] = useState([]);
     const postComment = async (id,value,id_commented)=>{
      let data = {id_post:id}; 
      let daa = null
      if(value!=="")
      {
        daa = {id_commented:id_commented,id_liker:rs.data.response.id,id_post:id,content:value}; 
        if(daa!==null){
      try {
        await axios.post('https://pneuexpress.online/api/addComment.php', daa, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    } catch (error) {
      console.error('Error:', error);
    }
  
    checkNewCommennt = setInterval(async () => {
    try {
      checkNewComment = await axios.post('https://pneuexpress.online/api/checkNewComments.php', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    setCheckNewComments(checkNewComment.data)
    clearInterval(checkNewCommennt)
  
    } catch (error) {
      console.error('Error:', error);
    }
  }, 1000);
    }}
  }

  const searchParams = new URLSearchParams(location.search);
  useEffect(() => {
  let intervalId;

  const fetchData = async () => {
    try {
      const email = localStorage.getItem("email");
      const resl = await getUserDataak(email);

      const data = { 
        id: resl.data.response.id 
      };

      const notgp = await axios.post('https://pneuexpress.online/api/getMessages.php', data, {
        headers: { 'Content-Type': 'application/json' }
      });
      setNotgp(notgp.data);

      intervalId = setInterval(async () => {
        try {
          const notgp = await axios.post('https://pneuexpress.online/api/getMessages.php', data, {
            headers: { 'Content-Type': 'application/json' }
          });
          setNotgp(notgp.data);
        } catch (error) {
          console.error("Polling error:", error);
        }
      }, 2000);
    } catch (error) {
      console.error('Initial fetch error:', error);
    }
  };

  fetchData();

  return () => clearInterval(intervalId);
}, []);

  username =  searchParams.get('username'); 
  let q =  searchParams.get('q'); 
  
if (q !== null) {
    // Parameter exists (even if empty like ?q=)
    // Do your action here
  window.location.href = `/profile?username=${username}`;

  }
  const getUserDataa = async (username) => {
  
    const data = { email: localStorage.getItem("email") , input: username }; 
    try {
      res = await axios.post('https://pneuexpress.online/api/getUserData.php', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setFormDataa(prevState => ({
        ...prevState,
        older: res.data.response.image
      }));
      res.data.followers.map(async (follower)=>{
        let sa = 0
        const da = { email: localStorage.getItem("email") ,id:follower.id }; 
        try {
          sa = await axios.post('https://pneuexpress.online/api/checkFollow.php', da, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.error('Error:', error);
        }
    follower.ok = sa.data
      })

      res.data.following.map(async (follower)=>{
        let sad = 0
        const dad = { email: localStorage.getItem("email") ,id:follower.id }; 
        try {
          sad = await axios.post('https://pneuexpress.online/api/checkFollow.php', dad, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.error('Error:', error);
        }
    follower.ok = sad.data
      })
      
          
      
      if(res.data.image){
        setGood4(true)
        setImage2(false)
      }
      
      setFormDataa(prevState => ({
        ...prevState,
        e_maila: res.data.response.email,
        firstNamea: res.data.response.first_name,
        gendera: res.data.response.gender,
        lastNamea: res.data.response.last_name,
        usernamea: res.data.response.username,
        ida:res.data.response.id,
        imagea:res.data.response.image
      }));
    } catch (error) {
      console.error('Error:', error);
    }
    return res;
   
  };
    const getUserDataav = async (username) => {
  
    const data = { email: localStorage.getItem("email") , input: username }; 
    try {
      let fafa = await axios.post('https://pneuexpress.online/api/getUserData.php', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setFormDataav(prevState => ({
        ...prevState,
        older: fafa.data.response.image
      }));
      fafa.data.followers.map(async (follower)=>{
        let sa = 0
        const da = { email: localStorage.getItem("email") ,id:follower.id }; 
        try {
          sa = await axios.post('https://pneuexpress.online/api/checkFollow.php', da, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.error('Error:', error);
        }
    follower.ok = sa.data
      })

      fafa.data.following.map(async (follower)=>{
        let sad = 0
        const dad = { email: localStorage.getItem("email") ,id:follower.id }; 
        try {
          sad = await axios.post('https://pneuexpress.online/api/checkFollow.php', dad, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.error('Error:', error);
        }
    follower.ok = sad.data
      })
      
          
      
      if(fafa.data.image){
        setGood4(true)
        setImage2(false)
      }
          setResc(fafa)

      setFormDataav(prevState => ({
        ...prevState,
        e_mailav: fafa.data.response.email,
        firstNameav: fafa.data.response.first_name,
        genderav: fafa.data.response.gender,
        lastNameav:fafa.data.response.last_name,
        usernameav: fafa.data.response.username,
        idav:fafa.data.response.id,
        imageav:fafa.data.response.image
      }));
    } catch (error) {
      console.error('Error:', error);
    }
    return resc;
  };
     const [file, setFile] = useState(null);

    
    const closeBtnSidenave1 = useRef(null);
    const popup56 = useRef(null);

   const gh = useRef(null);
    
    const form = useRef(null);
    const po = useRef(null);
    const openComments = (id_post) => {
      if(document.querySelector(`.allp.comments.boxC_${id_post}`).style.display==='none'){
        document.querySelector(`.allp.comments.boxC_${id_post}`).style.display='flex';
        document.querySelector(`.allp.comments.boxC_${id_post} > div > div.senegal`).style.height = 
        document.querySelector(`#root > div.allp.comments.boxC_${id_post} > div > div.maroc > img`).height+"px";
      }
      let data = {id_post:id_post}; 
      checkNewCommennt = setInterval(async () => {
        try {
          checkNewComment = await axios.post('https://pneuexpress.online/api/checkNewComments.php', data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        setCheckNewComments(checkNewComment.data)
        clearInterval(checkNewCommennt)

        } catch (error) {
          console.error('Error:', error);
        }
      }, 1000);

    }
    const addNewPost = async (e) => {
       setSpinner(true)
  e.preventDefault();
  if (file === null) {
    window.location.href='/feed';
        closePost()
    return;
  }

  const formData = new FormData();
  formData.append('image', file);
  formData.append('id', rs.data.response.id);
  if (content123 !== '') {
    formData.append('content', content123);
  }

  try {
    const responses = await axios.post('https://pneuexpress.online/api/addNewPost.php', formData);
    if (responses.data.success) {
       setSpinner(false)
      window.location.reload(true);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
   useEffect(() => {
        if (notig !== null) {
        }
      }, [notig]); 
    const closeBtnSidenave2 = useRef(null);
  const follow = async (e,id) => {

    let data
    if(id){
    data = { id_suiveur:rs.data.response.id,id_suivi:id }; 
    }else{
    data = { id_suiveur:rs.data.response.id,id_suivi:res.data.response.id }; 
    }
    try {
      await axios.post('https://pneuexpress.online/api/follow.php', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      e.target.innerHTML = "<i className='fa-solid fa-check'></i> Followed";
      e.target.style.opacity = '0.6'
      e.target.style.pointerEvents = 'none'
    } catch (error) {
      console.error('Error:', error);
    }
   
  };
  const addMsg = async (e) => {
    e.preventDefault()
    let data

    data = { id_exp:resc.data.response.id,id_dest:rs.data.response.id,content:content }; 

    try {
      await axios.post('https://pneuexpress.online/api/add_msg.php', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setContent("")
    } catch (error) {
      console.error('Error:', error);
    }
   
  };
  const block = async () => {
    const data = { id_blocked:res.data.response.id,id_blocker:rs.data.response.id }; 
    try {
      await axios.post('https://pneuexpress.online/api/block.php', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      window.location.reload();

    } catch (error) {
      console.error('Error:', error);
    }
   
  };
  const unblock = async () => {
    const data = { id_unblocked:res.data.response.id,id_unblocker:rs.data.response.id }; 
    try {
      await axios.post('https://pneuexpress.online/api/unblock.php', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      window.location.reload();

    } catch (error) {
      console.error('Error:', error);
    }
   
  };
  const unfollow = async (e,id) => {
    let data
    if(id){
     data = { id_suiveur:rs.data.response.id,id_suivi:id }; 
    }else{
    data = { id_suiveur:rs.data.response.id,id_suivi:res.data.response.response.id }; 
    }
    try {
      await axios.post('https://pneuexpress.online/api/unfollow.php', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      e.target.innerHTML = "<i className='fa-solid fa-check'></i> Unfollowed";
      e.target.style.opacity = '0.6'
      e.target.style.pointerEvents = 'none'
    } catch (error) {
      console.error('Error:', error);
    }
   
  };
    

        const search = useRef(null);
        const msg = useRef(null);

        const dro = useRef(null);
        const dr = useRef(null);
        const [content, setContent] = useState("");
        const [content123, setContent123] = useState("");


        const handleContentChange = (e)=>{
          setContent(e.target.value)
        }

   const handleChange123 = (e)=>{
          setContent123(e.target.value)
        }
        const [user, setUser] = useState("");
        const [followers, setFollowers] = useState(false);
        const [followers2, setFollowers2] = useState(false);


        const [following, setFollowing] = useState(false);
        const [following2, setFollowing2] = useState(false);



        const [usrs,setUsrs] = useState([])
        const [drop,setDrop] = useState(false)
        const handle = async (e)=>{
          setUser(e.target.value)
          const data = { input: e.target.value }; 
      
            try {
              const ras = await axios.post('https://pneuexpress.online/api/searchUser.php', data, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
             setUsrs(ras.data)
            } catch (error) {
              console.error('Error:', error);
            }
          }
    const [good3, setGood3] = useState(false);
    const [good4, setGood4] = useState(false);
    const [good1, setGood1] = useState(false);
    const [good2, setGood2] = useState(false);
    const [good33, setGood33] = useState(false);
    const [profile,setProfile] = useState(true)
    const [profile2,setProfile2] = useState(false)
    const [redss, setRedss] = useState(null);

    const [edit,setEditTrue] = useState(false)
    const [edt,setEdtTrue] = useState(false)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName:'',
        gender:'',
        e_mail:'',
        username:'',
        password:'',
        image:null
      });
      const [formDataa, setFormDataa] = useState({
        firstNamea: '',
        lastNamea:'',
        gendera:'',
        e_maila:'',
        usernamea:'',
        passworda:'',
        imagea:null
      });


    const [formDataav, setFormDataav] = useState({
        firstNameav: '',
        lastNameav:'',
        genderav:'',
        e_mailav:'',
        usernameav:'',
        passwordav:'',
        imageav:null
      });

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



      useEffect(() => {

        (async () => {
            let rees = await getUserDataa(username);  

            let data = {id:rees.data.response.id}; 
            try {
              rresponses = await axios.post('https://pneuexpress.online/api/posts.php', data, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              if(rresponses.data.length>0)
                {
                  
                  setRedss(rresponses.data)
                  setCheckNewComments(rresponses.data)
                }
              } catch (error) {
              console.error('Error:', error);
            }
          })();
      }, [username]);

      useEffect(() => {

        (async () => {
            let rees = await getUserDataak(localStorage.getItem("email"));  
            let data = {id:rees.data.response.id}; 
            try {
              rresponses = await axios.post('https://pneuexpress.online/api/retrievePosts.php', data, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              if(rresponses.data.length>0)
                {
                  setCheckNewComments(rresponses.data)
                }
              } catch (error) {
              console.error('Error:', error);
            }
          })();
      }, []);
    const getUserData = async (username) => {
  
      const data = { input: username }; 
      try {
        rs = await axios.post('https://pneuexpress.online/api/getUserData.php', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setFormData(prevState => ({
          ...prevState,
          older: rs.data.image
        }));
        rs.data.followers.map(async (follower)=>{
          let sa = 0
          const da = { email: localStorage.getItem("email") ,id:follower.id }; 
          try {
            sa = await axios.post('https://pneuexpress.online/api/checkFollow.php', da, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
          } catch (error) {
            console.error('Error:', error);
          }
      follower.ok = sa.data
        })

        rs.data.following.map(async (follower)=>{
          let sad = 0
          const dad = { email: localStorage.getItem("email") ,id:follower.id }; 
          try {
            sad = await axios.post('https://pneuexpress.online/api/checkFollow.php', dad, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
          } catch (error) {
            console.error('Error:', error);
          }
      follower.ok = sad.data
        })
        
        if(rs.data.response.image){
          setGood4(true)
          setImage2(false)
        }
        setFormData(prevState => ({
          ...prevState,
          e_mail: rs.data.response.email,
          firstName: rs.data.response.first_name,
          gender: rs.data.response.gender,
          lastName: rs.data.response.last_name,
          username: rs.data.response.username,
          id:rs.data.response.id,
          image:rs.data.response.image
        }));
      } catch (error) {
        console.error('Error:', error);
      }
     
    };
    
    
    const [style1,setStyle1] = useState(null)
    const [style2,setStyle2] = useState(null)
    const [visibleOverlay,setVisibleOverlay] = useState(false)
    const sidenave1 = useRef(null);
    const upsd = useRef(null);

    const sidenave2 = useRef(null);
    const popup=useRef(null)
    const ups=useRef(null)
    const upps=useRef(null)
    const op=useRef(null)

    const popup2=useRef(null)
    const popup23=useRef(null)
    const popup234=useRef(null)
    const popup2342=useRef(null)

    const popup2345=useRef(null)

    const popup2344=useRef(null)
    const popup23442=useRef(null)




    const popup4=useRef(null)
    const popup90=useRef(null)


    const log=useRef(null)
    
    if(location.state)
      localStorage.setItem("email", location.state.email);
    const [image, setImage] = useState(null);
    const [image2, setImage2] = useState(null);
    
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImage(e.target.result); 
        };
        reader.readAsDataURL(file);
      } else {
        //("Please upload an image file.");
      }
    };
   useEffect(() => {
}, [formData.image]);
    const handleFileChange2 = (event) => {
    const file2 = event.target.files[0];
    //("File selected:", file2);

    if (file2 && file2.type.startsWith('image/')) {
      setFormData(prev => ({
        ...prev,
        image: file2
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
         //(image2,'hey')
        setImage2(e.target.result);
      };
      reader.readAsDataURL(file2);
    } else {
      //("Please upload a valid image.");
    }
  };
    const [vis,setVis] = useState(false)
    const [viss,setViss] = useState(false)

   

      const closed = useMemo(() => ({
  width: '0px',
  opacity: '1',
  position: 'absolute',
  zIndex: '100',
}), []);

     
   
    const closeNav1 = ()=>{
        setStyle1(closed)
        setStyle2(closed)
        setVisibleOverlay(false)
        document.body.style.overflow = "unset"


    }
    const closeNav2 = useCallback(() => {
  setStyle2(closed);
  setStyle1(closed);
  setVisibleOverlay(false);
  document.body.style.overflow = "unset";
}, [closed]);

   const openNav1 = useCallback(async () => {
  setStyle1(opened);
  setStyle2(closed);
  setVisibleOverlay(true);
  document.body.style.overflow = "hidden";

  try {
    await axios.get(
      "https://pneuexpress.online/api/removeFlagOne.php",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
  }
}, [opened, closed]);

    const openPost = ()=>{
      setVis(!vis)
      setVisibleOverlay(true)
     }
     const openPost2 = (username)=>{
      setUsername2(username)
      getUserDataav(username)
      setViss(!viss)
      setLoader2(true); 
      setVisibleOverlay(true)
      if(newMessagess && newMessagess.length!==0){
        window.location.href = `#${newMessagess[newMessagess.length-1].id}`
      }
     }
  const [loader2, setLoader2] = useState(false); 


     const openFollowers = ()=>{
      setFollowers(!followers)
      setVisibleOverlay(true)
     }
    
     const openFollowing = ()=>{
      setFollowing(!following)
      setVisibleOverlay(true)
     }
    



     const closePost = ()=>{
      setVisibleOverlay(false)
      popup2.current.style.animation = 'fadeOut 0.2s ease'
     
      popup2.current.addEventListener('animationend', () => {
        popup2.current.style.display = 'none'; 
        setVis(!vis)
      });
     }  
      const closePost2 = ()=>{
    clearInterval(checkNewMessages)
    setLoader2(false); 
    setVisibleOverlay(false)
    popup23.current.style.animation = 'fadeOut 0.2s ease'
    popup23.current.addEventListener('animationend', () => {
      popup23.current.style.display = 'none'; 
      setViss(!viss)
    });
   }

     const closePost23 = ()=>{
      setVisibleOverlay(false)
      popup234.current.style.animation = 'fadeOut 0.2s ease'
      popup234.current.addEventListener('animationend', () => {
        popup234.current.style.display = 'none'; 
        setFollowers(!followers)
      });
     }

     const closePost232 = ()=>{
      setVisibleOverlay(false)
      popup2342.current.style.animation = 'fadeOut 0.2s ease'
      popup2342.current.addEventListener('animationend', () => {
        popup2342.current.style.display = 'none'; 
        setFollowers2(false)
      });
     }

     const closePost234 = ()=>{
      setVisibleOverlay(false)

      popup2344.current.style.animation = 'fadeOut 0.2s ease'
      popup2344.current.addEventListener('animationend', () => {
        popup2344.current.style.display = 'none'; 
        setFollowing(!following)
      });
     }
     const closePost2342 = ()=>{
      setVisibleOverlay(false)
      popup23442.current.style.animation = 'fadeOut 0.2s ease'
      popup23442.current.addEventListener('animationend', () => {
        popup23442.current.style.display = 'none'; 
        setFollowing2(false)
      });
     }
    
     
    const openNav2 = useCallback(async () => {
  setStyle2(opened);
  setStyle1(closed);
  setVisibleOverlay(true);
  document.body.style.overflow = "hidden";

  try {
    await axios.get("https://pneuexpress.online/api/removeFlagTwo.php");
  } catch (error) {
    console.error("Error:", error);
  }
}, [opened, closed]);
    const handleUpdate = async () => {
      //(formData)
      setGood1(false)
      setGood2(false)
      setGood33(false)

     if(formData.firstName===''){
        setGood1(true)
        getUserData(localStorage.getItem("email"))

      }else if(formData.lastName===''){
          setGood2(true)
          getUserData(localStorage.getItem("email"))

        }else if(formData.username===""){
            setGood33(true)
            getUserData(localStorage.getItem("email"))

          }else{
      try {
        const response = await axios.post('https://pneuexpress.online/api/updateProfile.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status === 200) {
          setGood3(true)
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
     }
     

    
    };
    useEffect(() => {
      document.body.style.overflow='unset'
    
  }, []); 
    useEffect(() => {
   
      

      const handleClickOutside = (event) => {
        let commentsBox = document.querySelectorAll('.allp') 
        commentsBox.forEach((element) => {
          if(element.style.display === 'flex' && event.target.parentElement.parentElement.parentElement!==element && event.target.parentElement.parentElement.parentElement.parentElement!==element && event.target.tagName !== 'SPAN'){
          
            element.style.display = 'none'
            setVisibleOverlay(false)
          }
        });
        if((event.target.classList.value==='overlay' || popup2.current)){
          setVisibleOverlay(false)
        }
        if((event.target.classList.value==='overlay' || popup2344.current)){
          setVisibleOverlay(false)
        }
        const elements = document.querySelectorAll('.dropdown-conten');
        
    
       
        elements.forEach((element) => {
          if(!regex.test(event.target.id) && event.target!==element.previousElementSibling){
            element.style.display = 'none';
          }
          if((!regex.test(event.target.id) && event.target.id && event.target.nextElementSibling && event.target.id.slice(2)!==event.target.nextElementSibling.id)){
            element.style.display = 'none';
          }
        }); 
        if(!closeBtnSidenave2.current.contains(event.target) && sidenave2.current.contains(event.target)){
          closeNav2()
        }

        if(closeBtnSidenave1.current.contains(event.target) && sidenave1.current){
          setVisibleOverlay(false)
        }
        if(closeBtnSidenave2.current.contains(event.target) && sidenave2.current){
          setVisibleOverlay(false)
        }

      
       
        if(dr.current && !dr.current.contains(event.target) && dro.current && !dro.current.contains(event.target)){
          setDrop(false)
        }
        
          if(popup2.current && popup2.current.contains(event.target)){
            setVisibleOverlay(true);  
          }
          if (sidenave1.current && !sidenave1.current.contains(event.target)) {
            if(popup23.current && popup23.current.contains(event.target))
              {setVisibleOverlay(true);}  
            if(popup234.current && popup234.current.contains(event.target))
              setVisibleOverlay(true);  
            if(popup2344.current && popup2344.current.contains(event.target))
              setVisibleOverlay(true);  
            if(popup2342.current && popup2342.current.contains(event.target))
              setVisibleOverlay(true);  
            if(popup23442.current && popup23442.current.contains(event.target))
              setVisibleOverlay(true);  
            if(popup2345.current && popup2345.current.contains(event.target))
              setVisibleOverlay(true);  
              setStyle1(closed)
              setStyle2(closed)
          if(popup4.current && popup4.current!==event.target && popup23.current && !popup23.current.contains(event.target))
            {setLoader2(false);upsd.current.style.display='none'}
          if(popup4.current && popup4.current!==event.target && popup234.current && !popup234.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup4.current && popup4.current!==event.target && popup2344.current && !popup2344.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup4.current && popup4.current!==event.target && popup2342.current && !popup2342.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup4.current && popup4.current!==event.target && popup23442.current && !popup23442.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup4.current && popup4.current!==event.target && popup2345.current && !popup2345.current.contains(event.target))
            upsd.current.style.display='none'


          
          
          if(popup90.current && popup90.current!==event.target && popup2344.current && !popup2344.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup90.current && popup90.current!==event.target && popup23442.current && !popup23442.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup90.current && popup90.current!==event.target && popup2345.current && !popup2345.current.contains(event.target))
            upsd.current.style.display='none'

          if(popup56.current && popup56.current!==event.target && popup23.current && !popup23.current.contains(event.target))
            {setLoader2(true);upsd.current.style.display='none';}
          if(popup56.current && popup56.current!==event.target && popup234.current && !popup234.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup56.current && popup56.current!==event.target && popup2344.current && !popup2344.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup56.current && popup56.current!==event.target && popup2342.current && !popup2342.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup56.current && popup56.current!==event.target && popup23442.current && !popup23442.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup56.current && popup56.current!==event.target && popup2345.current && !popup2345.current.contains(event.target))
            upsd.current.style.display='none'
        }
          if (sidenave1.current  && !sidenave1.current.contains(event.target)) {
            if(popup2.current && popup2.current.contains(event.target))
              setVisibleOverlay(true); 
              setStyle1(closed)
              setStyle2(closed)
          if(popup4.current && popup4.current!==event.target && popup2.current && !popup2.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup90.current && popup90.current!==event.target && popup2.current && !popup2.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup56.current && popup56.current!==event.target && popup2.current && !popup2.current.contains(event.target))
            upsd.current.style.display='none'
        }
        if (sidenave1.current  && !sidenave1.current.contains(event.target)) {
          if(popup23.current && popup23.current.contains(event.target))
            {setVisibleOverlay(true);}  
          if(popup234.current && popup234.current.contains(event.target))
            setVisibleOverlay(true);  
          if(popup2344.current && popup2344.current.contains(event.target))
            setVisibleOverlay(true);  
          if(popup2342.current && popup2342.current.contains(event.target))
            setVisibleOverlay(true); 
          if(popup23442.current && popup23442.current.contains(event.target))
            setVisibleOverlay(true);  
          if(popup2345.current && popup2345.current.contains(event.target))
            setVisibleOverlay(true);  
            setStyle1(closed)
            setStyle2(closed)
        if(popup4.current && popup4.current!==event.target && popup23.current && !popup23.current.contains(event.target))
          {setLoader2(true);upsd.current.style.display='none';}
        if(popup4.current && popup4.current!==event.target && popup234.current && !popup234.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup4.current && popup4.current!==event.target && popup2344.current && !popup2344.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup4.current && popup4.current!==event.target && popup2342.current && !popup2342.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup4.current && popup4.current!==event.target && popup23442.current && !popup23442.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup4.current && popup4.current!==event.target && popup2345.current && !popup2345.current.contains(event.target))
          upsd.current.style.display='none'

        if(popup90.current && popup90.current!==event.target && popup23.current && !popup23.current.contains(event.target))
          {setLoader2(true);upsd.current.style.display='none';}
        if(popup90.current && popup90.current!==event.target && popup234.current && !popup234.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup90.current && popup90.current!==event.target && popup2342.current && !popup2342.current.contains(event.target))
          upsd.current.style.display='none'
        
        
        
        if(popup56.current && popup56.current!==event.target && popup23.current && !popup23.current.contains(event.target))
          {setLoader2(true);upsd.current.style.display='none';}
        if(popup56.current && popup56.current!==event.target && popup234.current && !popup234.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup56.current && popup56.current!==event.target && popup2344.current && !popup2344.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup56.current && popup56.current!==event.target && popup2342.current && !popup2342.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup56.current && popup56.current!==event.target && popup23442.current && !popup23442.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup56.current && popup56.current!==event.target && popup2345.current && !popup2345.current.contains(event.target))
          upsd.current.style.display='none'
      }
          if (sidenave2.current && !sidenave2.current.contains(event.target)) {
            if(popup2.current && popup2.current.contains(event.target))
              setVisibleOverlay(true);
            else
              setVisibleOverlay(false); 
              setStyle1(closed)
              setStyle2(closed)
          
          }
          if (sidenave2.current && !sidenave2.current.contains(event.target)) {
            if(popup23.current && popup23.current.contains(event.target))
              {setVisibleOverlay(true);}
            if(popup234.current && popup234.current.contains(event.target))
              setVisibleOverlay(true);
            if(popup2344.current && popup2344.current.contains(event.target))
              setVisibleOverlay(true);
            if(popup2342.current && popup2342.current.contains(event.target))
              setVisibleOverlay(true);
            if(popup23442.current && popup23442.current.contains(event.target))
              setVisibleOverlay(true);
            if(popup2345.current && popup2345.current.contains(event.target))
              setVisibleOverlay(true);
              setStyle1(closed)
              setStyle2(closed)
        
          }
          if(popup4.current && popup4.current!==event.target && event.target===op.current){
            setProfile(!profile)
            setEditTrue(false)
            setEdtTrue(!edt)
            upsd.current.style.display='none'
          }
          if(popup90.current && popup90.current!==event.target && event.target===op.current){
            setProfile(!profile)
            setEditTrue(false)
            setEdtTrue(!edt)
            upsd.current.style.display='none'
          }
          if(popup56.current && popup56.current!==event.target && event.target===op.current){
            setProfile(!profile)
            setEditTrue(false)
            setEdtTrue(!edt)
            upsd.current.style.display='none'
          }
          if (popup2.current && !popup2.current.contains(event.target)) {
            popup2.current.style.animation = 'fadeOut 0.2s ease'
            popup2.current.addEventListener('animationend', () => {
              popup2.current.style.display = 'none';
              setVis(false)
            });
          }
          if (popup23.current && !popup23.current.contains(event.target)) {
            setLoader2(true)
            popup23.current.style.animation = 'fadeOut 0.2s ease'
            popup23.current.addEventListener('animationend', () => {
              popup23.current.style.display = 'none';
              setViss(false)
            });
          }
          if (popup234.current && !popup234.current.contains(event.target)) {
            popup234.current.style.animation = 'fadeOut 0.2s ease'
            popup234.current.addEventListener('animationend', () => {
              popup234.current.style.display = 'none';
              setFollowers(false)
            });
          }
          if (popup2344.current && !popup2344.current.contains(event.target)) {
            popup2344.current.style.animation = 'fadeOut 0.2s ease'
            popup2344.current.addEventListener('animationend', () => {
              popup2344.current.style.display = 'none';
              setFollowing(false)
            });
          }
          if (popup2342.current && !popup2342.current.contains(event.target)) {
            popup2342.current.style.animation = 'fadeOut 0.2s ease'
            popup2342.current.addEventListener('animationend', () => {
              popup2342.current.style.display = 'none';
              setFollowers2(false)
            });
          }
          if (popup23442.current && !popup23442.current.contains(event.target)) {
            popup23442.current.style.animation = 'fadeOut 0.2s ease'
            popup23442.current.addEventListener('animationend', () => {
              popup23442.current.style.display = 'none';
              setFollowing2(false)
            });
          }
          if (popup2345.current && !popup2345.current.contains(event.target)) {
            popup2345.current.style.animation = 'fadeOut 0.2s ease'
            popup2345.current.addEventListener('animationend', () => {
              popup2345.current.style.display = 'none';
            });
          }
          if((popup90.current && popup90.current!==event.target && upsd.current && !upsd.current.contains(event.target)) ){
            upsd.current.style.display='none'
          }
          if(popup90.current && event.target!==popup90.current && event.target!==popup56.current && upsd.current){
            if(event.target===ups.current){
              upsd.current.style.display='none'
              setEditTrue(true)
              setEdtTrue(!edt)
                                 setFlagg(false)
              setProfile2(false);
            }else {
              if(popup90.current && popup90.current!==event.target && event.target!==log.current && !log.current.contains(event.target)){
                if(event.target===upps.current ){
                  setProfile2(false)
                  setProfile(true)
                  setEditTrue(false)
                  setEdtTrue(false)
                                     setFlagg(true)
                  upsd.current.style.display='none'
                }
              }
            }
          }else{
            if(event.target===popup90.current){
              if(upsd.current.style.display==='none'){
upsd.current.style.display='block'

}else{

upsd.current.style.display='none'
}
            }
          }

          if((popup4.current && popup4.current!==event.target && upsd.current && !upsd.current.contains(event.target)) ){
            upsd.current.style.display='none'
          }
          if(popup4.current && event.target!==popup4.current && event.target!==popup56.current && upsd.current){
            if(event.target===ups.current){

              upsd.current.style.display='none'
              setEditTrue(true)
              setEdtTrue(!edt)
                                 setFlagg(false)
              setProfile2(false);
            }else {
              if(popup4.current && popup4.current!==event.target && event.target!==log.current && !log.current.contains(event.target)){
                if(event.target===upps.current ){
                  setProfile2(false)
                  setProfile(true)
                  setFlagg(true)
                  setEditTrue(false)
                  setEdtTrue(false)
                  upsd.current.style.display='none'
                }
              }
            }
          }else{
            if(event.target===popup4.current){
              if(upsd.current.style.display==='none'){
upsd.current.style.display='block'

}else{

upsd.current.style.display='none'
}
            }
          }
          if((popup56.current && popup56.current!==event.target && upsd.current && !upsd.current.contains(event.target)) ){
            upsd.current.style.display='none'
          }
          if(popup56.current && event.target!==popup4.current && event.target!==popup56.current && upsd.current){
            if(event.target===ups.current){
              upsd.current.style.display='none'
              setEditTrue(true)
                  setFlagg(false)
              setEdtTrue(!edt)
              setProfile2(false);
            }else {
              if(popup56.current && popup56.current!==event.target && event.target!==log.current && !log.current.contains(event.target)){
                if(event.target===upps.current ){
                  setProfile2(false)
                  setProfile(true)
                  setFlagg(true)
                  setEditTrue(false)
                  setEdtTrue(false)
                  upsd.current.style.display='none'
                }
              }
            }
          }else{
            if(event.target===popup56.current){
              if(upsd.current.style.display==='none'){
                  upsd.current.style.display='block'                 
               }else{
                  upsd.current.style.display='none'
               }
            }
          }
         
            
          if(!closeBtnSidenave1.current.contains(event.target) && sidenave1.current.contains(event.target)){
            openNav1()
          }

          if(sidenave2.current.contains(event.target) || (gh.current && gh.current.contains(event.target))){
            openNav2()
          }
        };
  
      document.addEventListener('mousedown', handleClickOutside);
      
    
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);

      };
    }, [closeNav2,closed,edt,openNav1,openNav2,profile]);
    const config = useMemo(() => ({
  childList: true,
  attributes: true,
  subtree: true,
  characterData: true
}), []); // empty array → never changes
const observerRef = useRef(null);
useEffect(() => {
  if (!msg.current) return;

  observerRef.current = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === "childList") {
        if (newMessagess?.length) {
          const lastId = newMessagess[newMessagess.length - 1].id;
          document
            .getElementById(lastId)
            ?.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  observerRef.current.observe(msg.current, config);

  return () => {
    observerRef.current?.disconnect();
  };
}, [newMessagess, msg, config]);


useEffect(() => {
  if (!msg.current) return;

  observerRef.current = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === "childList") {
        if (newMessagess?.length) {
          const lastId = newMessagess[newMessagess.length - 1].id;
          document
            .getElementById(lastId)
            ?.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  observerRef.current.observe(msg.current, config);

  return () => {
    observerRef.current?.disconnect();
  };
}, [newMessagess, msg, config]);


  
   useEffect(() => {
  if (!loader2 && viss && msg.current) {
    if (newMessagess && newMessagess.length !== 0) {
      window.location.href = `#${newMessagess[newMessagess.length - 1].id}`;
      setLoader2(false);
    }
  }
}, [loader2, viss]);
useEffect(() => {
  if (!(rs && username2 !== "")) return;

  const data = { id_exp: rs.data.response.id, username: username2 };

  const fetch = async () => {
    try {
      const response = await axios.post(
        "https://pneuexpress.online/api/checkNewMessage3.php",
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      if (Array.isArray(response.data)) {
        setNewMessagess(response.data);
        setLoader2(false);
      } else {
        console.error("Response data is not an array:", response.data);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const interval = setInterval(fetch, 2000);

  return () => clearInterval(interval);

}, [username2]);

useEffect(() => {
  if (msg.current && observerRef.current) {
    observerRef.current.observe(msg.current, config);
  }
}, [config, observerRef]);


    useEffect(() => {
     

      getUserData(localStorage.getItem("email"))
      setFollowers(false)
      setFollowing(false)
      setVisibleOverlay(false)
      getUserDataa(username)

      if(sessionStorage.getItem('flag')===0){
        sessionStorage.setItem('flag', 1);
      }else{
        sessionStorage.setItem('flag', 0);
      }
    
    }, [username]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await getUserDataak(localStorage.getItem("email"));
          const data = { 
            email: localStorage.getItem("email"), 
            id: res.data.response.id 
          };
  
          const notigp = await axios.post('https://pneuexpress.online/api/getNotifications.php', data, {
            headers: { 'Content-Type': 'application/json' }
          });
  
  
          setNotig(notigp.data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData();
    }, []); 
    
    useEffect(() => {
    setTrigger(prevTrigger => !prevTrigger);
}, []);

  const inputRf = useRef(null);


useEffect(() => {
  if (viss && inputRf.current) {
    inputRf.current.focus();
  }
}, [newMessagess,viss]); // or just [viss]
  return (
    <>
    {spinner && <div className="spinner"></div>}
    {visibleOverlay && <div className="overlay"></div>}
    <header id="section1">
        <div style={{textAlign:'center'}}><Link to="/feed"><span id="logo">pictogram</span></Link></div>
        <div id="second">
        <div className="dropdown">
                  <input autoComplete="off" value={user} onChange={handle} onClick={()=>{search.current.style.display='block'}} type="text" placeholder='looking for someone...'/>
                  <div id="myDropdown" ref={search} className="dropdown-contentt">
                  <div style={{textAlign:'right',marginRight:'10px',marginTop:'10px'}}><i onClick={()=>{search.current.style.display='none'}} id="close"  className="fa-solid fa-x"></i></div>
        
                  {user==="" && <span style={{display:'inline-block',fontSize:'1.2em',marginBottom:'15px',opacity:'0.6'}}>Enter name or username</span>} 
          {user!=="" && usrs.length===0 && <span style={{display:'inline-block',fontSize:'1.2em',marginBottom:'15px',opacity:'0.6'}}>no user found !</span>} 
           {user!=="" && usrs.length>0 && <div style={{width:'100%',marginTop:'5px'}}>
            
            {usrs.map((item, index) => {
              return (
                  <div style={{display:'flex',marginBottom:'10px',justifyContent:'space-between'}} key={index}>
                    <div style={{display:'flex'}}>
                      {item.image!==null && <img onLoad={handleImageLoad2} 
                          src={`https://pneuexpress.online/api/${item.image}`} 
                          alt="Preview" 
                          style={{
                              marginLeft: '1px',
                              marginBottom: '6px',
                              maxWidth: '100%',
                              marginRight: '15px',
                              height: '40px',
                              width: '40px',
                              verticalAlign: 'middle',
                              borderRadius: '50%',
                              cursor:'initial'
                          }} 
                      />}
                      {item.image===null && <i id="profile10" className="dropbtn fa-solid fa-user"></i>}
                      <div style={{overflow:'hidden',display:'flex',flexDirection:'column'}}>
                      <Link style={{color:"black"}} to={`/profile?username=${item.username}`}><span style={{display:'inline-block',fontWeight:'500',fontSize:'0.8em'}}>{item.first_name} {item.last_name}</span></Link>
                      <span style={{cursor:'initial',color:'rgba(0,0,0,0.5'}}>@{item.username}</span>
          
                    </div>
                    </div>
                    
                  </div>
              ); })}
  
              </div>}
            </div>
          </div>
        <nav>
            <Link to="/feed"><i className="fa-solid fa-house"></i></Link>
            <i onClick={openPost} className="fa-solid fa-circle-plus"></i>
            <div style={{display:'inline-block',position:'relative'}}>
            {notig!==null && notig.cou > 0 ? <div style={{borderRadius:'50%',backgroundColor:'red',width:'10px',height:'10px',position:'absolute',left:'30px',top:'16px'}}></div>:""}
            <i onClick={openNav1} className="fa-solid fa-bell"></i>
            </div>
            <div style={{display:'inline-block',position:'relative'}}>
              {notgpv!==null && notgpv.cou>0 ? <div style={{borderRadius:'50%',backgroundColor:'red',width:'10px',height:'10px',position:'absolute',left:'30px',top:'16px'}}></div>:""}
              <i onClick={openNav2} className="fa-solid fa-message"></i>
            </div>
            <div className="dropdown">
            {!image2 && formData.image && <img  onLoad={handleImageLoad2} loading="lazy" ref={popup4}
            src={`https://pneuexpress.online/api/${formData.image}`} 
            alt="Preview" 
            style={{ marginLeft:'7px',marginBottom:'6px',maxWidth: '100%',marginRight:'15px', height: '35px' ,width:'35px',verticalAlign:'middle',borderRadius:'50%'}} 
          />}

            {image2 && <img onLoad={handleImageLoad2} loading="lazy"
              src={image2} 
              ref={popup90}
              alt="Preview" 
              style={{marginLeft:'7px',marginBottom:'6px',maxWidth: '100%',marginRight:'15px', height: '35px' ,width:'35px',verticalAlign:'middle',borderRadius:'50%'}} 
            />}
          
                {!formData.image && <i ref={popup56} id="profile" className="dropbtn fa-solid fa-user"></i>}
                <div ref={upsd} style={{display:'none'}} className="dropdown-content">
                    <div ref={upps} onClick={() => {setGood4(true);setUsername(formData.username);setProfile2(false);setProfile(true);setEdtTrue(false);}}><i className="fa-solid fa-address-book"></i><Link style={{
    textDecoration: 'none',
    color: '#000',
  }} to={`/profile?username=${formData.username}&q=1`}>My Profile</Link></div>               
                    <div ref={ups}  onClick={() => {setGood4(false);setProfile2(!profile2);setEditTrue(!edit)}}><i className="fa-solid fa-pen-to-square"></i>Edit Profile</div>
                    <hr/>
                    <Link ref={log} style={{color:'black'}} to='/'><div><i className="fa-solid fa-right-from-bracket"></i>Logout</div></Link>
                </div>
            </div>

        </nav>
        </div>
    </header>
    <div ref={sidenave1} style={style1} className="sidenav">
    <Link ref={closeBtnSidenave1} className="closebtn" onClick={(e) => { e.preventDefault(); closeNav1(); }}
  aria-label="Close sidebar">&times;</Link>
    <h1>Notifications</h1>
    {notig !== null && Array.isArray(notig.notifications) && notig.notifications.map((item, index) => {
  return (
    <div key={`item_${item.name}_${index}`} style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex',alignItems:'center',marginLeft:'20px'}}>
        
        {item.profile_pic === null ? 
  <i id="profile11" className="dropbtn fa-solid fa-user"></i> :
  <img onLoad={handleImageLoad2} loading="lazy" style={{
    marginLeft: '1px',
    marginBottom: '6px',
    maxWidth: '100%',
    marginRight: '5px',
    height: '35px',
    width: '35px',
    verticalAlign: 'middle',
    borderRadius: '50%'
}} src={`https://pneuexpress.online/api/${item.profile_pic}`} alt="Profile" />
}

        <div>
          <Link style={{display:'inline-block',padding:'0',color:'black',fontSize:'1em'}} to={`/profile?username=${item.username}&q=1`}><p style={{fontWeight:'500'}}>{item.name}</p></Link> 
          <p style={{color:'rgba(0,0,0,0.5)',fontSize:'0.9em',fontWeight:'500'}}>@{item.username} {item.texte} !</p>
          <p style={{color:'rgba(0,0,0,0.5)',fontSize:'0.8em',fontWeight:'500'}}>{item.moment}</p>
        </div>
        {
          item.flag === 1 && <div style={{borderRadius:'50%',backgroundColor:'rgba(0,0,255,0.6)',width:'10px',height:'10px',position:'relative',left:'10px'}}></div>
        }
      </div>
      <hr/>
    </div>
  );
})}
  </div>
  <div ref={sidenave2} style={style2} className="sidenav">
    <button href="#" ref={closeBtnSidenave2} className="closebtn" onClick={closeNav2}>&times;</button>
    <h1>Messages</h1>
    {notgpv !== null && Array.isArray(notgpv.notifications) && notgpv.notifications.map((item, index) => {
  return (
    <>
      <div key={`item_${index}_${item.name}`} style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{position:'relative',display: 'flex',alignItems:'center',marginLeft:'20px'}}>
          {item.profile_pic === null ? 
            <i id="profile11" className="dropbtn fa-solid fa-user"></i> :
            <img onLoad={handleImageLoad2} loading="lazy" style={{
              marginLeft: '1px',
              marginBottom: '6px',
              maxWidth: '100%',
              marginRight: '5px',
              height: '35px',
              width: '35px',
              verticalAlign: 'middle',
              borderRadius: '50%'
            }} src={`https://pneuexpress.online/api/${item.profile_pic}`} alt="Profile" />
          }
          <div>
            <p ref={gh} onClick={() => {openPost2(item.username);getUserDataav(item.username);closeNav2();}} style={{display:'inline-block',padding:'0',color:'black',fontSize:'1em',fontWeight:'500'}}>{item.name}</p> 
            <p style={{color:'rgba(0,0,0,0.5)',fontSize:'0.9em',fontWeight:'500'}}>{item.content}</p>
            <p style={{color:'rgba(0,0,0,0.5)',fontSize:'0.8em',fontWeight:'500'}}>{item.moment}</p>
          </div>
          {item.flag === 1 && <div style={{borderRadius:'50%',backgroundColor:'rgba(0,0,255,0.6)',width:'10px',height:'10px',position:'relative',left:'40px'}}></div>}
        </div>
        <hr/>
      </div>
    </>
  );
})}
  </div>
  {edit && <div id="edit">

      <p style={{padding:'10px 20px',fontSize:'1.3em',fontWeight:'400'}}>Edit Profile</p>
      {good3 && <span style={{margin:'10px 20px',color:'green'}}>Profile is updated !</span>}<br/>
      {!good4 && !image2 && <i ref={popup} style={{display:'inline-block',margin:'10px 20px'}} id="profile2" className="dropbtn fa-solid fa-user"></i>}
      {image2 && (
        <div style={{border:'1px solid rgb(200,200,200)',padding:'2px',margin:'30px 20px',width:'150px',height:'auto'}}>
          <img onLoad={handleImageLoad2} loading="lazy"
            src={image2} 
            alt="Previewa" 
            style={{ transition: 'opacity 0.5s ease',maxWidth: '100%', height: 'auto' }} 
          />
        </div>
      )}
      {!image2 && good4 && (
        <div style={{border:'1px solid rgb(200,200,200)',padding:'2px',margin:'30px 20px',width:'150px',height:'auto'}}>
          <img onLoad={handleImageLoad2} loading="lazy"
            src={`https://pneuexpress.online/api/${formData.image}`} 
            alt="Previeww" 
            style={{ maxWidth: '100%', height: 'auto' }} 
          />
        </div>
      )}
      <p style={{padding:'10px 20px',fontSize:'1.1em',fontWeight:'400'}}>Change Profile Picture</p>

      <input autoComplete="off" accept="image/*"
        onChange={handleFileChange2} className="put" type="file"/><br/>

      <input autoComplete="off" value={formData.firstName} onChange={handleChange1} placeholder='first name' id="firstName" type="text" name="firstName"/>
      
      <input autoComplete="off" value={formData.lastName} onChange={handleChange2} type="text" id="lastName" placeholder='last name' name="lastName"/>
      {good1 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(243, 10, 100)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>first name is not given</span>}
      {good2 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(243, 10, 100)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>last name is not given</span>}<br/>
<div id="dio" style={{margin:'0px 10px 0px 20px',display:'flex',alignItems:'center'}}>
      <input autoComplete="off" checked={formData.gender === 'male'} onChange={handleChange6} disabled style={{marginRight:'10px'}} type="radio" id="male" value='male' name="gender"/><label style={{marginRight:'10px'}} htmlFor='male'>Male</label>
            <input autoComplete="off" checked={formData.gender === 'female'} onChange={handleChange6} disabled style={{marginRight:'10px'}} type="radio" id="female" value='female' name="gender"/><label htmlFor='female' style={{marginRight:'10px'}}>Female</label>
            </div>
            <input autoComplete="off" value={formData.e_mail} disabled onChange={handleChange3} placeholder='email' style={{margin:'0px 10px 0px 20px',height:'50px',width:'90%'}} type="email" name="e_mail"/>
            <input autoComplete="off" value={formData.username} onChange={handleChange4} placeholder='username' style={{margin:'15px 10px 0px 20px',height:'50px',width:'90%'}} type="text" name="username"/>
            {good33 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(243, 10, 100)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>username is not given</span>}
            <input autoComplete="off" value={formData.password} onChange={handleChange5} placeholder='new password' style={{margin:'15px 10px 0px 20px',height:'50px',width:'90%'}} type="password" name="password"/>
            <a href='#section1'><button onClick={handleUpdate} style={{padding:'7px',fontSize:'1.1em',outine:'none',border:'none',borderRadius:'5px',margin:'20px 10px 0px 20px',color:'white',backgroundColor:'#0b5ed7'}}>Update Profile</button></a>
</div>}
  {vis && <div className='all'>
  <div ref={popup2} className="postp">
    <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <h3>Add New Post</h3>
      <i id="close" onClick={closePost} className="fa-solid fa-x"></i>
    </div>
    <hr style={{marginBottom:'20px',width:'100%',opacity:'0.4'}}/>
    <form action='' onSubmit={addNewPost} method="post">
    {image && (
        <div>
          <img onLoad={handleImageLoad2} loading="lazy"
            src={image} 
            alt="Preview" 
            style={{ maxWidth: '100%', height: 'auto',width:'100%'}} 
          />
        </div>
      )}
      <input autoComplete="off" accept="image/*" 
        onChange={handleFileChange} className="put" type="file"/><br/>
      <label htmlFor="say">Say Something</label><br/>
      <input autoComplete="off" value={content123} onChange={handleChange123} style={{height:'35px',padding:'5px',width:'100%',marginTop:'10px',marginBottom:'10px'}} type="text" name="say" id="say"/><br/>
      <input type="submit" autoComplete="off" value="Post" style={{padding:'10px',color:'white',backgroundColor:'#0b5ed7'}}/>
    </form>
  </div>
  </div>}
  
    {!edit && !profile2 && profile && <div id="kol">
      <div id="pol">

      {formDataa.imagea && (<img onLoad={handleImageLoad2} loading="lazy"
            src={`https://pneuexpress.online/api/${formDataa.imagea}`} 
            alt="Preview" 
            id="image30" 
          />)}
      {formDataa.usernamea!==username && image2 && (<img onLoad={handleImageLoad2} loading="lazy"
            src={image2} 
            alt="Preview" 
            id="image30" 
          />)}
          {!formDataa.imagea && <i id="profile30" style={{marginRight:'15px'}} className="dropbtn fa-solid fa-user"></i>}
        <div id="alg">
          <div style={{display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center'}}><span style={{fontSize:'2em'}}>{formDataa.firstNamea} {formDataa.lastNamea}</span>


          <div style={{position:'relative',display:'flex',flexDirection:'column'}}>{res && res.data.response.blocked2===0 && rs && res.data.response.id!==rs.data.response.id && res.data.response.blocked!==1 && <i onClick={()=>setDrop(!drop)} ref={dr} style={{fontSize:'2em'}} className="fa-solid fa-ellipsis"></i>}
          {drop && <div ref={dro} className="dropdown-contenp">
                    <div onClick={()=>{openPost2(res.data.response.username);setDrop(false);}}><i className="fa-solid fa-message"></i><span>Message</span></div>               
                    <div onClick={()=>block()}><i style={{marginLeft:'4px',display:'inline-block'}} className="fa-solid fa-x"></i><span>Block</span></div>
                </div>}</div>
          </div>
          <span style={{marginTop:'10px',fontSize:'1.1em',opacity:'0.6'}}>@{formDataa.usernamea}</span>
          {res && res.data.response.blocked2===0 && res.data.response.blocked!==1 && <div id="manque">
    <button className='follo'><i style={{marginRight:'5px'}} className="fa-solid fa-signs-post"></i>{res && res.data.response.n_posts} Posts</button>
          <button onClick={()=>{openFollowers();}} className='follo'><i style={{marginRight:'5px'}} className="fa-solid fa-people-arrows"></i>{res && res.data.response.num_of_followers} Followers</button>
          <button onClick={()=>{openFollowing();}} className='follo'><i style={{marginRight:'5px'}} className="fa-solid fa-address-book"></i>{res && res.data.response.num_of_following} Following</button>
          </div>}
          {
            res && rs && res.data.response.blocked2===0 && res.data.response.id!==rs.data.response.id && res.data.response.blocked!==1 && 
            <>
            {res && res.data.response.blocked2===0 &&res.data.response.number===0 && <button onClick={(e,id)=>follow(e,res.data.response.id)} className='follo'>Follow</button>}
            {res && res.data.response.blocked2===0 &&res.data.response.number>0 && <button onClick={(e)=>unfollow(e,res.data.response.id)} className='unfollo'>Unfollow</button>}
            </>
          }

          {
            res && res.data.response.blocked2===0 && res.data.response.blocked!==0 &&  
            <button onClick={()=>unblock()} className='unblock'>Unblock</button>
          }
          {
            res && res.data.response.blocked2!==0 &&  
            <span style={{marginTop:'10px',border:'1px solid rgba(150, 1, 1,0.3)',padding:'15px 10px',fontSize:'1.1em',borderRadius:'5px',color:'rgb(150, 1, 1)',backgroundColor:'rgba(235,80,80,0.5)'}}>@{formDataa.usernamea} blocked you !</span>
          }
          
        </div>
        </div>
      </div> }
      


      {viss && <div ref={po} className='all'>
  <div ref={popup23} style={{overflowY:'hidden',overflowX:'hidden',height:'90vh',display:'flex',flexDirection:'column',justifyContent:'space-around'}} className="post">
  <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
    <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>{formDataav.imageav && (<img onLoad={handleImageLoad2} loading="lazy"
            src={`https://pneuexpress.online/api/${formDataav.imageav}`} 
            alt="Preview" 
            style={{marginRight:'10px',objectFit: 'cover',width:'45px',height:'45px',borderRadius:'50%'}}
          />)}{!formDataav.imageav && <i id="profile31" className="dropbtn fa-solid fa-user"></i>}<span style={{fontSize:'1.3em'}}>{formDataav.firstNameav} {formDataav.lastNameav}(@{formDataav.usernameav})</span>
         </div>
                <i id="close" style={{fontSize:'1.2em',left:'20px'}} onDoubleClick={closePost2} onClick={closePost2} className="fa-solid fa-x"></i>

                </div>
                <hr style={{width:'100%',opacity:'0.4'}}/>

    
    <form ref={form} style={{height:'90%',overflowX:'hidden',verticalAlign:'top',display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}} onSubmit={addMsg} method="post">
      <div ref={msg} style={{overflowX:'hidden',wordWrap:'break-word',position:'relative',zIndex:'1',overflowY:'scroll',height:'100%',width:'100%',display:'flex',flexDirection:'column',alignSelf:'flex-start'}}>
       {loader2 && <div className="loader"></div>}
      {!loader2 && newMessagess!==null && newMessagess.map((item,index) => {
          return (
            rs.data.response.id === item.id_dest ? 
              <div key={index} id={item.id} style={{fontSize:'0.9em',wordWrap:'break-word',alignSelf:'flex-end',width:'60%',color:'white',borderRadius:'5px',margin:'10px 10px',padding:'10px',backgroundColor:'#0c6dfd'}}>
                <span>{item.content}</span><br/>
                <span style={{fontSize:'0.8em'}}>{item.moment}</span>
              </div> :
              <div key={index} id={item.id} style={{fontSize:'0.9em',alignSelf:'flex-start',width:'60%',color:'black',borderRadius:'5px',margin:'10px 10px',padding:'10px',border:'1px solid rgba(0,0,0,0.5)',backgroundColor:'#FFF'}}><span>{item.content}</span><br/>
              <span style={{fontSize:'0.8em',color:'rgba(0,0,0,0.6)'}}>{item.moment}</span>
              </div> 
          );
        })}
      </div>
      <div style={{width:'100%',padding:'5px',display:'flex',justifyContent:'space-around',alignItems:'center'}}>
        <input ref={inputRf} autoComplete="off" value={content} onChange={handleContentChange} placeholder='say something...' type="text" name="say" id="say"/>
        <button className="send" type="submit">Send</button>
        </div>
    </form>
  </div>
  </div>}

  {followers && <div className='all'>
  <div ref={popup234} className="postp">
    <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <h3>Followers</h3>
      <i id="close" onClick={closePost23} className="fa-solid fa-x"></i>
    </div>
    <hr style={{marginBottom:'20px',width:'100%',opacity:'0.4'}}/>
    {res && res.data && <div style={{width:'100%',marginTop:'20px'}}>
                  
      {res.data.followers && res.data.followers.map((item) => {
  return (
    <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'space-between' }} key={item.id}>
      <div style={{ display: 'flex' }}>
        {item.image ? (
          <img
                            onLoad={handleImageLoad2}

            src={`https://pneuexpress.online/api/${item.image}`}
            alt="Profile Preview"
            style={{
              marginLeft: '1px',
              marginBottom: '6px',
              maxWidth: '100%',
              marginRight: '15px',
              height: '45px',
              width: '45px',
              verticalAlign: 'middle',
              borderRadius: '50%',
            }}
          />
        ) : (
          <i id="profile10" className="dropbtn fa-solid fa-user"></i>
        )}
        <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Link style={{ color: 'black' }} to={`/profile?username=${item.username}`}>
            <span style={{ display: 'inline-block', fontWeight: '500' }}>
              {item.first_name} {item.last_name}
            </span>
          </Link>
          <span style={{ color: 'rgba(0,0,0,0.5)' }}>@{item.username}</span>
        </div>
      </div>
      {item.ok===0 && <button onClick={(e) => follow(e, item.id)} className='follo'>Follow</button>}

      {item.ok!==0  && <button onClick={(e)=>unfollow(e,item.id)} className='unfollo'>Unfollow</button>}
    </div>
  );
})}

      
                </div>}
  </div>
  </div>}

  {following && <div className='all'>
  <div ref={popup2344} className="postp">
    <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <h3>Following</h3>
      <i id="close" onClick={closePost234} className="fa-solid fa-x"></i>
    </div>
    <hr style={{marginBottom:'20px',width:'100%',opacity:'0.4'}}/>
    <div>
      {res && res.data && <div style={{width:'100%',marginTop:'20px'}}>
                  
      {res.data.following && res.data.following.map((item) => {
  return (
    <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'space-between' }} key={item.id}>
      <div style={{ display: 'flex' }}>
        {item.image ? (
          <img
                                      onLoad={handleImageLoad2}

            src={`https://pneuexpress.online/api/${item.image}`}
            alt="Profile Preview"
            style={{
              marginLeft: '1px',
              marginBottom: '6px',
              maxWidth: '100%',
              marginRight: '15px',
              height: '45px',
              width: '45px',
              verticalAlign: 'middle',
              borderRadius: '50%',
            }}
          />
        ) : (
          <i id="profile10" className="dropbtn fa-solid fa-user"></i>
        )}
        <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Link style={{ color: 'black' }} to={`/profile?username=${item.username}`}>
            <span style={{ display: 'inline-block', fontWeight: '500' }}>
              {item.first_name} {item.last_name}
            </span>
          </Link>
          <span style={{ color: 'rgba(0,0,0,0.5)' }}>@{item.username}</span>
        </div>
      </div>
      {item.ok===0 && <button onClick={(e) => follow(e, item.id)} className='follo'>Follow</button>}

      {item.ok!==0  && <button onClick={(e)=>unfollow(e,item.id)} className='unfollo'>Unfollow</button>}
    </div>
  );
})}

      
                </div>}
    </div>
  </div>
  </div>}




  {followers2 && <div className='all'>
  <div ref={popup2342} className="postp">
    <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <h3>Followers</h3>
      <i id="close" onClick={closePost232} className="fa-solid fa-x"></i>
    </div>
    <hr style={{marginBottom:'20px',width:'100%',opacity:'0.4'}}/>
    
    {rs && rs.data && <div style={{width:'100%',marginTop:'20px'}}>
                  
      {rs.data.followers && rs.data.followers.map((item) => {
  return (
    <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'space-between' }} key={item.id}>
      <div style={{ display: 'flex' }}>
        {item.image ? (
          <img
                                      onLoad={handleImageLoad2}

            src={`https://pneuexpress.online/api/${item.image}`}
            alt="Profile Preview"
            style={{
              marginLeft: '1px',
              marginBottom: '6px',
              maxWidth: '100%',
              marginRight: '15px',
              height: '45px',
              width: '45px',
              verticalAlign: 'middle',
              borderRadius: '50%',
            }}
          />
        ) : (
          <i id="profile10" className="dropbtn fa-solid fa-user"></i>
        )}
        <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              
              <Link style={{ color: 'black' }} onClick={()=>{setProfile2(false);setProfile(!profile);setFollowers2(false);setVisibleOverlay(false);}} to={`/profile?username=${item.username}`}>
            <span style={{ display: 'inline-block', fontWeight: '500' }}>
              {item.first_name} {item.last_name}
            </span>
          </Link>
          <span style={{ color: 'rgba(0,0,0,0.5)' }}>@{item.username}</span>
        </div>
      </div>
      {item.ok===0 && <button onClick={(e) => follow(e, item.id)} className='follo'>Follow</button>}

      {item.ok!==0  && <button onClick={(e)=>unfollow(e,item.id)} className='unfollo'>Unfollow</button>}
    </div>
  );
})}

      
                </div>}
  </div>
  </div>}

  {following2 && <div className='all'>
  <div ref={popup23442} className="postp">
    <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <h3>Following</h3>
      <i id="close" onClick={closePost2342} className="fa-solid fa-x"></i>
    </div>
    <hr style={{marginBottom:'20px',width:'100%',opacity:'0.4'}}/>
    <div>
      {rs && rs.data && <div style={{width:'100%',marginTop:'20px'}}>
                  
      {rs.data.following && rs.data.following.map((item) => {
  return (
    <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'space-between' }} key={item.id}>
      <div style={{ display: 'flex' }}>
        {item.image ? (
          <img
                                      onLoad={handleImageLoad2}

            src={`https://pneuexpress.online/api/${item.image}`}
            alt="Profile Preview"
            style={{
              marginLeft: '1px',
              marginBottom: '6px',
              maxWidth: '100%',
              marginRight: '15px',
              height: '45px',
              width: '45px',
              verticalAlign: 'middle',
              borderRadius: '50%',
            }}
          />
        ) : (
          <i id="profile10" className="dropbtn fa-solid fa-user"></i>
        )}
        <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Link style={{ color: 'black' }} onClick={()=>{setProfile2(false);setProfile(!profile);setFollowers2(false);setFollowing2(false);setVisibleOverlay(false);}} to={`/profile?username=${item.username}`}>
            <span style={{ display: 'inline-block', fontWeight: '500' }}>
              {item.first_name} {item.last_name}
            </span>
          </Link>
          <span style={{ color: 'rgba(0,0,0,0.5)' }}>@{item.username}</span>
        </div>
      </div>
      {item.ok===0 && <button onClick={(e) => follow(e, item.id)} className='follo'>Follow</button>}

      {item.ok!==0  && <button onClick={(e)=>unfollow(e,item.id)} className='unfollo'>Unfollow</button>}
    </div>
  );
})}

      
                </div>}
    </div>
  </div>
  </div>}

  {flagg && <div style={{textAlign:'center',marginBottom:'20px'}}>
        <h1 style={{marginBottom:'10px',marginLeft:'0'}}>Posts</h1>
        {(res && (res.data.response.blocked2!==0 || res.data.response.blocked!==0)) ? <p style={{width:'70%',margin:'auto',padding:'15px',backgroundColor:'rgba(0,0,0,0.2)'}}><i style={{marginRight:'10px',color:'#FFF',borderRadius:'50%',padding:'10px',backgroundColor:'rgba(0,0,0,0.7)'}} className="fa-solid fa-x"></i>You are not allowed to see posts !</p> :
        <div style={{textAlign:'center',display:'flex',justifyContent:'center',flexWrap:'wrap',width:'90%',margin:'auto'}}>
        {redss!==null && redss.length!==0 ? redss.map((item, index) => {
      return (
          <div id={`sen_${item.id_post}`} className="edcctp" key={index}>
            
            <img onLoad={handleImageLoad2} loading="lazy"
                onClick={()=>openComments(item.id_post)}
                src={`https://pneuexpress.online/api/${item.photo}`} 
                alt="Preview" 
                style={{
                    objectFit:'cover',
                    marginBottom: '6px',
                    maxWidth: '100%',
                    marginRight: '15px',
                    display:'inline-block',
                    height: '200px',
                    width: '300px',
                    verticalAlign: 'middle',
                }} 
            />
            
          </div>
      );
  }):<p style={{width:'70%',margin:'auto',padding:'15px',backgroundColor:'rgba(0,0,0,0.2)'}}><i style={{marginRight:'10px',color:'#FFF',borderRadius:'50%',padding:'10px',backgroundColor:'rgba(0,0,0,0.7)'}} className="fa-solid fa-x"></i>You don't have any post</p>}  </div>}</div>}
  {redss!==null && redss.length!==0 && redss.map((item,index)=>{
          return(
            <div style={{display:'none'}} className={`allp comments boxC_${item.id_post}`} key={item.id_post}>
                <div className='postg'>
                  <div className='maroc'><img alt="hhhah" onLoad={handleImageLoad2} loading="lazy" src={`https://pneuexpress.online/api/${item.photo}`}/></div>
                  <div className="senegal">
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <div style={{display:'flex',alignItems:'center'}}>
                      {item.profile_pic===null && <i id="profile111" className="dropbtn fa-solid fa-user"></i>}
            {item.profile_pic!==null && <img onLoad={handleImageLoad2} loading="lazy"
                src={`https://pneuexpress.online/api/${item.profile_pic}`} 
                alt="Preview" 
                style={{
                    marginLeft: '1px',
                    marginBottom: '6px',
                    maxWidth: '100%',
                    marginRight: '5px',
                    height: '55px',
                    width: '55px',
                    verticalAlign: 'middle',
                    borderRadius: '50%'
                }} 
            />}
                        <div style={{marginLeft:'10px',display:'flex',flexDirection:'column'}}>
                          <span style={{fontWeight:'500',fontSize:'1em'}}>{item.first_name} {item.last_name}</span>
                          <span style={{color:'rgba(0,0,0,0.5)',fontWeight:'500',fontSize:'1em'}}>@{item.username}</span>
                        </div>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
                        <span>{item.num_of_likes} likes</span>
                        <span style={{color:'rgba(0,0,0,0.5)',fontSize:'0.9em'}}>{item.formatted_time}</span>
                      </div>
                    </div>

                    <div>

                    </div>
                    <hr style={{opacity:'0.5',width:'100%'}}/>
                    <div className="france">

       <Comments trigger={trigger} checkNewComments={checkNewComments} />

                    </div>
                    <hr style={{margin:'0px auto',opacity:'0.5',width:'100%'}}/>
                    <div style={{width:'100%',display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                        <input autoComplete="off" placeholder='say something...' type="text" className="sayy"/>
                      <button onClick={(e)=>{postComment(item.id_post,e.target.previousElementSibling.value,item.id);e.target.previousElementSibling.value="";}} className={`send_${item.id_post}`} type="submit">Post</button>
                    </div>
                  </div>
                </div>
            </div> 
          );
         }) }
  </>
  )
}

export default Profile
