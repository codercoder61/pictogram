import React,{useState, useEffect, useRef , useMemo,useCallback } from 'react'
import './Header.css'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Comments from './Comments';
import axios from 'axios';
let res 
let resl = null

let rs
let rresponses = null
let checkNewMessages = null
let checkNewMessages2 = null
let checkNewCommennt
// let checkNewComments = []

let checkNewComment = []
const regex = /^del_[0-9]+/;

function Header() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  const handleImageLoad2 = (e) => {
    e.target.style.opacity = 1;
  };
  const [username, setUsername] = useState("");

  let [newMessagess, setNewMessagess] = useState(null);
  const [loader2, setLoader2] = useState(false); 

      const [viss,setViss] = useState(false)
    const form = useRef(null);
  const [checkNewComments, setCheckNewComments] = useState([]);
        const msg = useRef(null);
        
     
    const po = useRef(null);

  const addMsg = async (e) => {
    e.preventDefault()
    let data
    if(username!=='')
      {
        data = {username:username,id_exp:res.data.response.id,content:content }; 


      } 

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


  

 
  const location = useLocation();

 
  const [user, setUser] = useState("");
  
  const [likes, setLikes] = useState([]);

  const closeLikes = (id) =>{
      document.querySelector(`.all.box_${id}`).style.display = 'none'; 
  }

 
  const [ress, setRess] = useState(null);
  const [notig, setNotig] = useState(null);
  
  const [notgpv, setNotgp] = useState(null);

  const [redss, setRedss] = useState(null);

  const [drop,setDrop] = useState(false)
  const addLike = async (id,id_liked)=>{
    let daa
    daa = {id_liker:res.data.response.id,id_post:id,id_liked:id_liked}; 
    try {
      await axios.post('https://pneuexpress.online/api/addLike.php', daa, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

       
  } catch (error) {
    console.error('Error:', error);
  }
  }

  const removeLike = async (id)=>{
    let daa
    daa = {id_liker:res.data.response.id,id_post:id}; 
    try {
      await axios.post('https://pneuexpress.online/api/removeLike.php', daa, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

       
  } catch (error) {
    console.error('Error:', error);
  }
  }
  const toggleDelete = (event)=>{
    if(event.target.nextElementSibling.style.display==='none') {
      event.target.nextElementSibling.style.display='block'
    }
    else{
      event.target.nextElementSibling.style.display = 'none'
    }
  }
  const [content, setContent] = useState("");

  const handleContentChange = (e)=>{
    setContent(e.target.value)
  }
  const postComment = async (id,value,id_commented)=>{
    let data = {id_post:id}; 
    
    let daa = null
    if(value!=="")
    {
      daa = {id_commented:id_commented,id_liker:res.data.response.id,id_post:id,content:value}; 
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
}, 2000);
  }}
}
  
  const postCommennt = async (id,value,id_commented)=>{
    let daa = null
    if(value!==""){
      daa = {id_commented:id_commented,id_liker:res.data.response.id,id_post:id,content:value}; 
    if(daa!==null){
    try {
      const like = await axios.post('https://pneuexpress.online/api/addComment.php', daa, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(like.data===1){
        window.location.href = `?target=send_${id}`
      }
      } catch (error) {
        console.error('Error:', error);
      }
      }}
    }

  const [noImage,setNoImage] = useState(false)

 const addNewPost = async (e) => {
  setSpinner(true)
  e.preventDefault();
  if (file === null) {
    setNoImage(true);
    setSpinner(false)
    closePost();
    return;
  }

  const formData23 = new FormData();
  formData23.append('image', file);
  formData23.append('id', res.data.response.id);
  if (content !== '') {
    formData23.append('content', content);
  }

  try {
    const responses = await axios.post('https://pneuexpress.online/api/addNewPost.php', formData23);
    if (responses.data.success) {
      setSpinner(false)
      window.location.reload(true);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}


  const deletePost = async (id_post)=>{
    let dat  
    dat = {id:id_post};
      try {
        await axios.post('https://pneuexpress.online/api/deletePost.php', dat, {
          headers: {
          'Content-Type': 'application/json',
          },
        });
          window.location.reload(true)
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const [usrs,setUsrs] = useState([])
  const popup90=useRef(null)


  const openFollowers = ()=>{
    setFollowers(!followers)
    setVisibleOverlay(true)
   }
   const openFollowing = ()=>{
    setFollowing(!following)
    setVisibleOverlay(true)
   }

  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(false);
   

  const closePost23 = ()=>{
    setVisibleOverlay(false)
    popup234.current.style.animation = 'fadeOut 0.2s ease'
    popup234.current.addEventListener('animationend', () => {
      popup234.current.style.display = 'none'; 
      setFollowers(!followers)
    });
   }
   const unfollow = async (e,id) => {
    let data
    if(id){
     data = { id_suiveur:res.data.response.id,id_suivi:id }; 
    

    }else{

    data = { id_suiveur:res.response.data.id,id_suivi:res.data.response.id }; 
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
 

   const closePost2348 = ()=>{
    setVisibleOverlay(false)
    popup2344.current.style.animation = 'fadeOut 0.2s ease'
    popup2344.current.addEventListener('animationend', () => {
      popup2344.current.style.display = 'none'; 
      setFollowing(!following)
    });
   }

    const up = useRef(null);
    const popup23=useRef(null)
    const popup234=useRef(null)
    const popup2345=useRef(null)
    const [profile2,setProfile2] = useState(false)


    const popup2344=useRef(null)

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

    const [file, setFile] = useState(null);
    const [good4, setGood4] = useState(false);
    const [users,setUsers] = useState([])
    const [good1, setGood1] = useState(false);
    const [good2, setGood2] = useState(false);
    const [good33, setGood33] = useState(false);
    const [profile,setProfile] = useState(false)
    const [edit,setEditTrue] = useState(false)
    const [edt,setEdtTrue] = useState(true)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName:'',
        gender:'',
        e_mail:'',
        username:'',
        password:'',
        image:null
      });
      <br />

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

      const getUserDataa = async (username) => {
  
        const data = { email: localStorage.getItem("email") , input: username }; 
        try {
          res = await axios.post('https://pneuexpress.online/api/getUserData.php', data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
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
          if(res.data.response.image){
            setGood4(true)
          }
          
          setFormData(prevState => ({
            ...prevState,
            e_mail: res.data.response.email,
            firstName: res.data.response.first_name,
            gender: res.data.response.gender,
            lastName: res.data.response.last_name,
            username: res.data.response.username,
            id:res.data.response.id,
            image:res.data.response.image
          }));
        } catch (error) {
          console.error('Error:', error);
        }
       return res;
      };

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
          
        } catch (error) {
          console.error('Error:', error);
        }
       return resp;
      };
    
          
    const [style1,setStyle1] = useState(null)
    const [style2,setStyle2] = useState(null)
    const [visibleOverlay,setVisibleOverlay] = useState(false)
    const sidenave1 = useRef(null);
    const search = useRef(null);


    const sidenave2 = useRef(null);
    const closeBtnSidenave1 = useRef(null);
    const closeBtnSidenave2 = useRef(null);

    const popup=useRef(null)
    const ups=useRef(null)
    const upps=useRef(null)
    const op=useRef(null)

    const popup2=useRef(null)

    const popup4=useRef(null)
    const popup44=useRef(null)

    const openPost2 = (username)=>{
      setUsername(username)
      setLoader2(true)
      setViss(!viss)
      setVisibleOverlay(true)
      if(newMessagess && newMessagess.length!==0){
        window.location.href = `#${newMessagess[newMessagess.length-1].id}`
      }
     }
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
  setNoImage(false);
  setImage2(null);

  if (res && username !== "") {
    const data = { id_exp: res.data.response.id, username: username };
     if (!loader2 && viss && msg.current) {
      if (newMessagess && newMessagess.length !== 0) {
        window.location.href = `#${newMessagess[newMessagess.length - 1].id}`;
        setLoader2(false);
      }
    }

    
 const fetch = async () => {
      try {
        const newMessagess2 = await axios.post(
          'https://pneuexpress.online/api/checkNewMessage3.php',
          data,
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (newMessagess2.data) {
          console.log(newMessagess2.data)
          if (Array.isArray(newMessagess2.data)) {
            setNewMessagess(newMessagess2.data);
            setLoader2(false);
          } else {
            console.error("Response data is empty or not an array:", newMessagess2.data);
          }
        } else {
          console.error("API response did not contain expected data:", newMessagess2);
        }

        if (Array.isArray(newMessagess2.data) && newMessagess2.data.length !== 0) {
          setLoader2(false);
        }
      } catch (error) {
        console.error('Error occurred during API call:', error);
      }
    };
  
   

    // Polling API call
   
    checkNewMessages2 = setInterval(fetch, 2000);

    // Cleanup
    return () => {
      clearInterval(checkNewMessages2);
    };
  }
}, [username, viss, loader2, config,observerRef]);
    
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
      }
    };
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
    const [updated,setUpdated] = useState(false)
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
      }, 2000);

    }
    const opened = useMemo(() => ({
        width: '350px',
        opacity: '1',
        position:'fixed',
        zIndex:'100',
        top:'0',
      bottom:'0',
      }), []);
      const closed = useMemo(() => ({
  width: '0px',
  opacity: '1',
  position: 'absolute',
  zIndex: '100',
}), []); // empty array because these values never change
   
   
    const closeNav1 = useCallback(() => {
    setStyle1(closed);
    setStyle2(closed);
    setVisibleOverlay(false);
    document.body.style.overflow = "unset";
}, [closed]); // include closed if it’s a dynamic object

    const closeNav2 = ()=>{
        setStyle2(closed)
        setStyle1(closed)
        setVisibleOverlay(false)
        document.body.style.overflow = "unset"

    }
    const openNav1 = useCallback(async ()=>{
        setStyle1(opened)
        setStyle2(closed)
        setVisibleOverlay(true)
        document.body.style.overflow = "hidden"
        try {
            await axios.get('https://pneuexpress.online/api/removeFlagOne.php', {
              headers: {
                'Content-Type': 'application/json',
              },
            });
        } catch (error) {
          console.error('Error:', error);
        }
    }, [closed,opened]);
    const openPost = ()=>{
      setVis(!vis)
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

   


    const openNav2 = useCallback(async ()=>{
        setStyle2(opened)
        setStyle1(closed)
        setVisibleOverlay(true)
        document.body.style.overflow = "hidden"
        try {
          await axios.get('https://pneuexpress.online/api/removeFlagTwo.php', {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.error('Error:', error);
        }
    }, [closed,opened]);
    const handleUpdate = async () => {
      setGood1(false)
      setGood2(false)
      setGood33(false)

     if(formData.firstName===''){
        setGood1(true)
        getUserDataa(localStorage.getItem("email"))

      }else if(formData.lastName===''){
          setGood2(true)
          getUserDataa(localStorage.getItem("email"))

        }else if(formData.username===""){
            setGood33(true)
            getUserDataa(localStorage.getItem("email"))

          }else{
      try {
        const response = await axios.post('https://pneuexpress.online/api/updateProfile.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status === 200) {
          setUpdated(true)
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
     }
     

    
    };


      useEffect(() => {
      
      
        
        (async () => {
          res = await getUserDataa(localStorage.getItem("email"));  
          (async () => {
            const data = { email: localStorage.getItem("email"),id:res.data.response.id };
            try {
               const rsa = await axios.post('https://pneuexpress.online/api/getUsers2.php', data, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            //(rsa.data)

             setUsers(rsa.data)
            } catch (error) {
              console.error('Error:', error);
            }
          })();
        
        })();
      }, []);
    


      useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await getUserDataa(localStorage.getItem("email"));
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
        const fetchDataa = async () => {
          try {
            const email = localStorage.getItem("email");
            resl = await getUserDataak(email);
      
            const data = { 
              id: resl.data.response.id 
            };
      
            const notgp = await axios.post('https://pneuexpress.online/api/getMessages.php', data, {
              headers: { 'Content-Type': 'application/json' }
            });
            setNotgp(notgp.data);
          } catch (error) {
            console.error('Error:', error);
          }
        };
      
        fetchDataa();
      
        const checkNew = setInterval(async () => {
          try {
      
            const data = { 
              id: resl.data.response.id 
            };
      
            const notgp = await axios.post('https://pneuexpress.online/api/getMessages.php', data, {
              headers: { 'Content-Type': 'application/json' }
            });
            setNotgp(notgp.data);
          } catch (error) {
            console.error('Error:', error);
          }
        }, 2000);
      
        return () => clearInterval(checkNew);
      
      }, []); 
      useEffect(() => {
        if (notig !== null) {
        }
      }, [notig]); 
      useEffect(() => {
          const target = new URLSearchParams(location.hash.substring(1)).get("target");

          if (target) {
              const targetElement = document.getElementById(target);

              if (targetElement) {
                  targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
          }
        }
        
        ,[location.hash])


    useEffect(() => {
          
      const handleClickOutside = (event) => {

        let commentsBox = document.querySelectorAll('.allp') 
        
        commentsBox.forEach((element) => {
          if(element.style.display === 'flex' && event.target.parentElement.parentElement.parentElement!==element && event.target.parentElement.parentElement.parentElement.parentElement!==element && event.target.tagName !== 'SPAN'){
            element.style.display = 'none'
            setVisibleOverlay(false)
          }
        });
       
      if((event.target.classList.value==='overlay' || popup2.current) ){
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
      
      if(!closeBtnSidenave1.current.contains(event.target) && sidenave1.current.contains(event.target)){
        closeNav1()
      }

      if(closeBtnSidenave1.current.contains(event.target) && sidenave1.current){
        closeNav1()
        setVisibleOverlay(false)
      }
      if(closeBtnSidenave2.current.contains(event.target) && sidenave2.current){
        setVisibleOverlay(false)
      }
      // popup2344
      if (popup234.current && popup234.current.contains(event.target)) {
       setVisibleOverlay(true)
        
      }
      if (popup2344.current && popup2344.current.contains(event.target)) {
       setVisibleOverlay(true)
      }

      if (popup234.current && !popup234.current.contains(event.target)) {
            setVisibleOverlay(false)
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
      if (sidenave1.current  && !sidenave1.current.contains(event.target)) {
        closeNav1()

      if(popup4.current && popup4.current!==event.target && popup2.current && !popup2.current.contains(event.target))
        up.current.style.display='none'
      if(popup90.current && popup90.current!==event.target && popup2.current && !popup2.current.contains(event.target))
        up.current.style.display='none'
      if(popup.current && popup.current!==event.target && popup2.current && !popup2.current.contains(event.target))
        up.current.style.display='none'
    } 
    if (sidenave1.current  && !sidenave1.current.contains(event.target)) {
      closeNav1()

          if(popup23.current && popup23.current.contains(event.target))
            setVisibleOverlay(true);  
          if(popup234.current && popup234.current.contains(event.target))
            setVisibleOverlay(true);  
          if(popup2344.current && popup2344.current.contains(event.target))
            setVisibleOverlay(true);  
          if(popup2345.current && popup2345.current.contains(event.target))
            setVisibleOverlay(true);  
          else {
            if(/likes/.test(event.target.classList.value) || event.target.id==='cloe')
              setVisibleOverlay(false);  
          }
            setStyle1(closed)
            setStyle2(closed)
        if(popup4.current && popup4.current!==event.target && popup23.current && !popup23.current.contains(event.target))
          up.current.style.display='none'
        if(popup4.current && popup4.current!==event.target && popup234.current && !popup234.current.contains(event.target))
          up.current.style.display='none'
        if(popup4.current && popup4.current!==event.target && popup2344.current && !popup2344.current.contains(event.target))
          up.current.style.display='none'
        if(popup4.current && popup4.current!==event.target && popup2345.current && !popup2345.current.contains(event.target))
          up.current.style.display='none'

        
        if(popup90.current && popup90.current!==event.target && popup234.current && !popup234.current.contains(event.target))
          up.current.style.display='none'
        
        
        
        if(popup.current && popup.current!==event.target && popup23.current && !popup23.current.contains(event.target))
          up.current.style.display='none'
        if(popup.current && popup.current!==event.target && popup234.current && !popup234.current.contains(event.target))
          up.current.style.display='none'
        if(popup.current && popup.current!==event.target && popup2344.current && !popup2344.current.contains(event.target))
          up.current.style.display='none'
        if(popup.current && popup.current!==event.target && popup2345.current && !popup2345.current.contains(event.target))
          up.current.style.display='none'
      }
      if (sidenave1.current  && !sidenave1.current.contains(event.target)) {
        closeNav1()

        if(popup23.current && popup23.current.contains(event.target))
          setVisibleOverlay(true);  
        if(popup234.current && popup234.current.contains(event.target))
          setVisibleOverlay(true);  
        if(popup2344.current && popup2344.current.contains(event.target))
          setVisibleOverlay(true);  
        if(popup2345.current && popup2345.current.contains(event.target))
          setVisibleOverlay(true);  
        else {
          if(/likes/.test(event.target.classList.value) | event.target.id==='cloe')
            setVisibleOverlay(false);  
        }
        
          setStyle1(closed)
          setStyle2(closed)
    
      if(popup90.current && popup90.current!==event.target && popup2344.current && !popup2344.current.contains(event.target))
        up.current.style.display='none'
      
      
      if(popup.current && popup.current!==event.target && popup23.current && !popup23.current.contains(event.target))
        up.current.style.display='none'
      if(popup.current && popup.current!==event.target && popup234.current && !popup234.current.contains(event.target))
        up.current.style.display='none'
      if(popup.current && popup.current!==event.target && popup2344.current && !popup2344.current.contains(event.target))
        up.current.style.display='none'
      if(popup.current && popup.current!==event.target && popup2345.current && !popup2345.current.contains(event.target))
        up.current.style.display='none'
    }
    if(popup90.current && popup90.current!==event.target && event.target===op.current){
      setProfile(true)
      setEditTrue(false)
      setEdtTrue(false)
      up.current.style.display='none'
    }
    if((popup90.current && popup90.current!==event.target && up.current && !up.current.contains(event.target)) ){
      up.current.style.display='none'
    }
    if(popup90.current && event.target!==popup90.current && event.target!==popup.current && up.current){
      if(event.target===ups.current){
        up.current.style.display='none'
        setEditTrue(true)
        setEdtTrue(false)
        setProfile2(false);
      }else {
        if(popup90.current && popup90.current!==event.target && event.target!==log.current && !log.current.contains(event.target)){
          if(event.target===upps.current ){
            setProfile2(false)

            setEditTrue(false)
            setEdtTrue(false)
            up.current.style.display='none'
          }
        }
      }
    }else{
      if(event.target===popup90.current){
        if(up.current.style.display==='none'){
up.current.style.display='block'

}else{

up.current.style.display='none'
}
      }
    }
        if (sidenave1.current  && !sidenave1.current.contains(event.target)) {
        closeNav1()

          if(popup90.current && popup90.current!==event.target && popup23.current && !popup23.current.contains(event.target))
            up.current.style.display='none'
          
         
          if(popup90.current && popup90.current!==event.target && popup2345.current && !popup2345.current.contains(event.target))
            up.current.style.display='none'
          if(popup2.current && popup2.current.contains(event.target))
            setVisibleOverlay(true);  
          else{
            if(popup234.current && popup234.current.contains(event.target)){
              setVisibleOverlay(true);  
            }
            if(popup2344.current && popup2344.current.contains(event.target)){
              setVisibleOverlay(true);  
            }
          }
            setStyle1(closed)
            setStyle2(closed)
        if(popup4.current && popup4.current!==event.target && popup2.current && !popup2.current.contains(event.target))
          up.current.style.display='none'
        if(popup44.current && popup44.current!==event.target && popup2.current && !popup2.current.contains(event.target))
          up.current.style.display='none'
      }
        if (sidenave2.current && !sidenave2.current.contains(event.target)) {
          if(popup2.current && popup2.current.contains(event.target))
            setVisibleOverlay(true);
            setStyle1(closed)
            setStyle2(closed)
        }

        if (sidenave1.current && !sidenave1.current.contains(event.target)) {
        closeNav1()

          if(popup2.current && popup2.current.contains(event.target))
            setVisibleOverlay(true);
            setStyle1(closed)
            setStyle2(closed)
        }
        if(popup4.current && popup4.current!==event.target && event.target===op.current){
          setProfile(true)
          setEditTrue(false)
          setEdtTrue(false)
          up.current.style.display='none'
        }
        if(popup44.current && popup44.current!==event.target && event.target===op.current){
          setProfile(true)
          setEditTrue(false)
          setEdtTrue(false)
          up.current.style.display='none'
        }
        if (popup2.current && !popup2.current.contains(event.target)) {
          popup2.current.style.animation = 'fadeOut 0.2s ease'
          popup2.current.addEventListener('animationend', () => {
            popup2.current.style.display = 'none';
            setVis(false)
          });
        }
        if((popup4.current && popup4.current!==event.target && up.current && !up.current.contains(event.target)) ){
          up.current.style.display='none'
        }
        if((popup44.current && popup44.current!==event.target && up.current && !up.current.contains(event.target)) ){
          up.current.style.display='none'
        }
        if(popup4.current && event.target!==popup4.current && event.target!==popup.current && up.current){
          if(event.target===ups.current){
            up.current.style.display='none'
            setEditTrue(true)
            setEdtTrue(false)
          }else {
            if(popup4.current && popup4.current!==event.target && event.target!==log.current && !log.current.contains(event.target)){
              if(event.target===upps.current ){
                setProfile(true)
                setEditTrue(false)
                setEdtTrue(false)
                up.current.style.display='none'
              }
            }
          }
        }else{
          if(event.target===popup4.current){
              if(up.current.style.display==='none'){
                  up.current.style.display='block'
              }else{
                  up.current.style.display='none'
              }
          }
        }
        if(popup44.current && event.target!==popup44.current && event.target!==popup.current && up.current){
          if(event.target===ups.current){
            up.current.style.display='none'
            setEditTrue(true)
            setEdtTrue(false)
          }else {
            if(popup44.current && popup44.current!==event.target && event.target!==log.current && !log.current.contains(event.target)){
              if(event.target===upps.current ){
                setProfile(true)
                setEditTrue(false)
                setEdtTrue(false)
                up.current.style.display='none'
              }
            }
          }
        } 
          if(event.target===popup44.current){
              if(up.current.style.display==='none'){
                  up.current.style.display='block'
              }else{
                up.current.style.display='none'
              }
          }
          if(!closeBtnSidenave1.current.contains(event.target) && sidenave1.current.contains(event.target)){
            openNav1()
          }

          if(!closeBtnSidenave2.current.contains(event.target) && sidenave2.current.contains(event.target)){
            openNav2()
          }

          if (popup23.current && !popup23.current.contains(event.target)) {
            setLoader2(true)
            popup23.current.style.animation = 'fadeOut 0.2s ease'
            popup23.current.addEventListener('animationend', () => {
              popup23.current.style.display = 'none';
              setViss(false)
            });
          }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
     
    
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [formData.id,closeNav1,closed,openNav1,openNav2]);
    const follow = async (e,id) => {
        const data = { id_suiveur: res.data.response.id,id_suivi:id }; 
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


  useEffect(() => {

        (async () => {
            let rees = await getUserDataa(localStorage.getItem("email"));  
            let data = {id:rees.data.response.id}; 
            try {
              rresponses = await axios.post('https://pneuexpress.online/api/posts.php', data, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              //(rresponses.data)
              if(rresponses.data.length>0)
                {
                  
                  setRedss(rresponses.data)
                  //(likes)
                  setCheckNewComments(rresponses.data)
                  
                }
              } catch (error) {
              console.error('Error:', error);
            }
          })();
      }, [likes]);
      useEffect(() => {

        (async () => {
            let rees = await getUserDataa(localStorage.getItem("email"));  
            let data = {id:rees.data.response.id}; 
            try {
              rresponses = await axios.post('https://pneuexpress.online/api/retrievePosts.php', data, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              if(rresponses.data.length>0)
                {
                  rresponses.data.forEach((item,index)=>{
                    let table = [item.num_of_likes,index]
                    setLikes((prevState) => [...prevState, table]);
                  })
                  //(rresponses.data)
                  setRess(rresponses.data)
                  setCheckNewComments(rresponses.data)
                }
              } catch (error) {
              console.error('Error:', error);
            }
          })();
      }, []);
       useEffect(() => {
            setFollowers(false)
            setFollowing(false)
            setVisibleOverlay(false)
          }, []);


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
  useEffect(() => {
    if (!res) return; 

    const data = { id_exp: res.data.response.id }; 
    const checkNewMessagess = setInterval(async () => {
      try {
        await axios.post('https://pneuexpress.online/api/checkNewMessages2.php', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        
      } catch (error) {
        console.error('Error:', error);
      }
    }, 2000);

    return () => clearInterval(checkNewMessagess);

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
    {viss && <div ref={po} className='all'>
  <div ref={popup23} className="post">
  <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
    <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
      {!loader2 && newMessagess!==null && (<img onLoad={handleImageLoad2}
loading="lazy"
            src={`https://pneuexpress.online/api/${newMessagess[0].pic}`} 
            alt="Preview" 
            style={{transition: 'opacity 0.5s ease',
marginRight:'10px',objectFit: 'cover',width:'45px',height:'45px',borderRadius:'50%'}}
          />)}
          {!loader2 && newMessagess!==null && !newMessagess[0].pic && <i id="profile31" className="dropbtn fa-solid fa-user"></i>}
          
          {!loader2 && newMessagess!==null && <span style={{fontSize:'1.3em'}}>{newMessagess[0].name}(@{newMessagess[0].username})</span>}
         </div>
                <i id="close" style={{fontSize:'1.2em',left:'20px'}} onDoubleClick={closePost2} onClick={closePost2} className="fa-solid fa-x"></i>

                </div>
                <hr style={{width:'100%',opacity:'0.4'}}/>

    
    <form autoComplete="off" ref={form} style={{height:'95%',verticalAlign:'top',display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}} onSubmit={addMsg} method="post">
      <div ref={msg} style={{overflowX:'hidden',wordWrap:'break-word',position:'relative',zIndex:'1',overflowY:'scroll',height:'100%',width:'100%',display:'flex',flexDirection:'column',alignSelf:'flex-start'}}>
      {loader2 && <div className="loader"></div>}
      {!loader2 && newMessagess!==null && newMessagess.map((item, index) => {
  return (
    res.data.response.id === item.id_dest ? 
      <div key={index} id={item.id} style={{fontSize:'0.9em',alignSelf:'flex-end',width:'60%',color:'white',borderRadius:'5px',margin:'10px 10px',padding:'10px',backgroundColor:'#0c6dfd'}}>
        <span>{item.content}</span><br/>
        <span style={{fontSize:'0.8em'}}>{item.moment}</span>
      </div> :
      <div key={index} id={item.id} style={{fontSize:'0.9em',alignSelf:'flex-start',width:'60%',color:'black',borderRadius:'5px',margin:'10px 10px',padding:'10px',border:'1px solid rgba(0,0,0,0.5)',backgroundColor:'#FFF'}}>
        <span>{item.content}</span><br/>
        <span style={{fontSize:'0.8em',color:'rgba(0,0,0,0.6)'}}>{item.moment}</span>
      </div> 
  );
})}

      </div>
      <div style={{width:'100%',padding:'5px',display:'flex',justifyContent:'space-around',alignItems:'center'}}>
        <input ref={inputRf} autoComplete="off" value={content} onChange={handleContentChange} placeholder='say something...' type="text" id="say"/>
        <button className="send" type="submit">Send</button>
        </div>
    </form>
  </div>
  </div>}
    <header id="section1">
        <div onClick={()=>{window.location.reload()}} style={{textAlign:'center'}}><Link to="/feed"><span id="logo">pictogram</span></Link></div>
        <div id="second">
        <div className="dropdown">
          <input autoComplete="off" value={user} onChange={handle} onClick={()=>{search.current.style.display='block'}} type="text" name="user" placeholder='looking for someone...'/>
          <div id="myDropdown" ref={search} className="dropdown-contentt">
          <div style={{textAlign:'right',marginRight:'10px',marginTop:'10px'}}><i onClick={()=>{search.current.style.display='none'}} id="close" className="fa-solid fa-x"></i></div>
          {user==="" && <span style={{display:'inline-block',fontSize:'1.2em',marginBottom:'15px',opacity:'0.6'}}>Enter name or username</span>} 
          {user!=="" && usrs.length===0 && <span style={{display:'inline-block',fontSize:'1.2em',marginBottom:'15px',opacity:'0.6'}}>no user found !</span>} 
           {user!=="" && usrs.length>0 && <div style={{width:'100%',marginTop:'5px'}}>
            
            {usrs.map((item, index) => {
      return (
          <div style={{display:'flex',marginBottom:'10px',justifyContent:'space-between'}} key={index}>
            <div style={{display:'flex'}}>
              {item.image!=null && <img onLoad={handleImageLoad2} loading="lazy"
                  src={`https://pneuexpress.online/api/${item.image}`} 
                  alt="Preview" 
                  style={{
                      marginLeft: '1px',
                      marginBottom: '6px',
                      maxWidth: '100%',
                      marginRight: '15px',
                      height: '40px',
                      width: '40px',
                      transition: 'opacity 0.5s ease',
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
      );  
  })} 
  
            </div>}
          </div>
        </div>
        <nav id="navi">
            <i onClick={()=>{setEditTrue(false);setEdtTrue(true);window.location.reload(true);}} className="fa-solid fa-house"></i>
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
            {!image2 && formData.image && <img onLoad={handleImageLoad2} loading="lazy" ref={popup44}
            src={`https://pneuexpress.online/api/${formData.image}`} 
            alt="Preview" 
            style={{ marginLeft:'7px',transition: 'opacity 0.5s ease',
marginBottom:'6px',maxWidth: '100%',marginRight:'15px', height: '35px' ,width:'35px',verticalAlign:'middle',borderRadius:'50%'}} 
          />}

            {image2 && <img onLoad={handleImageLoad} loading="lazy"
              src={image2} 
              ref={popup90}
              alt="Preview" 
              style={{ transition: 'opacity 0.5s ease',opacity: isLoaded ? 1 : 0,marginLeft:'7px',marginBottom:'6px',maxWidth: '100%',marginRight:'15px', height: '35px' ,width:'35px',verticalAlign:'middle',borderRadius:'50%'}} 
            />}
                {!formData.image && <i ref={popup4}  id="profile" className="dropbtn fa-solid fa-user"></i>}
                <div ref={up} style={{display:'none'}} className="dropdown-content">
                    <div ref={upps} onClick={() => {setEditTrue(false);setProfile2(false);setProfile(true);setEdtTrue(false)}}><i className="fa-solid fa-address-book"></i>My Profile</div>               
                    <div ref={ups}  onClick={() => {setEditTrue(!edit)}}><i className="fa-solid fa-pen-to-square"></i>Edit Profile</div>
                    <hr/>
                    <Link ref={log} style={{color:'black'}} to='/'><div><i className="fa-solid fa-right-from-bracket"></i>Logout</div></Link>
                </div>
            </div>

        </nav>
        </div>
    </header>
    <div ref={sidenave1} style={style1} className="sidenav">
    <Link ref={closeBtnSidenave1} className="closebtn" onClick={closeNav1}>&times;</Link>
    <h1 style={{marginBottom:'20px'}}>Notifications</h1>
    {notig !== null && Array.isArray(notig.notifications) && notig.notifications.map((item, index) => {
  return (
    <div key={index} style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{position:'relative',display: 'flex',alignItems:'center',marginLeft:'20px'}}>
                {item.profile_pic === null ? 
          <i id="profile11" className="dropbtn fa-solid fa-user"></i> :
          <img onLoad={handleImageLoad} loading="lazy" style={{
            transition: 'opacity 0.5s ease',
            marginLeft: '1px',
            marginBottom: '6px',
            opacity: isLoaded ? 1 : 0,
            maxWidth: '100%',
            marginRight: '5px',
            height: '35px',
            width: '35px',
            verticalAlign: 'middle',
            borderRadius: '50%'
        }} src={`https://pneuexpress.online/api/${item.profile_pic}`} alt="Profile" />
        }
        <div>
          <Link style={{display:'inline-block',padding:'0',color:'black',fontSize:'1em'}} to={`/profile?username=${item.username}`}><p style={{fontWeight:'500'}}>{item.name}</p></Link> 
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
    <Link ref={closeBtnSidenave2} className="closebtn" onClick={closeNav2}>&times;</Link>
    <h1 style={{marginBottom:'20px'}}>Messages</h1>
    {notgpv !== null && Array.isArray(notgpv.notifications) && notgpv.notifications.map((item, index) => {
  return (
    <div key={index} style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{position:'relative',display: 'flex',alignItems:'center',marginLeft:'20px'}}>
          {item.profile_pic === null ? 
          <i id="profile11" className="dropbtn fa-solid fa-user"></i> :
          <img onLoad={handleImageLoad} loading="lazy" style={{
            marginLeft: '1px',
            marginBottom: '6px',
            maxWidth: '100%',
            opacity: isLoaded ? 1 : 0,
            marginRight: '5px',
            transition: 'opacity 0.5s ease',
            height: '35px',
            width: '35px',
            verticalAlign: 'middle',
            borderRadius: '50%'
        }} src={`https://pneuexpress.online/api/${item.profile_pic}`} alt="Profile" />
        }
        <div>
          <p onClick={()=>{openPost2(item.username);closeNav2();}} style={{display:'inline-block',padding:'0',color:'black',fontSize:'1em',fontWeight:'500'}}>{item.name}</p> 
          <p style={{color:'rgba(0,0,0,0.5)',fontSize:'0.9em',fontWeight:'500'}}>{item.content}</p>
          <p style={{color:'rgba(0,0,0,0.5)',fontSize:'0.8em',fontWeight:'500'}}>{item.moment}</p>
        </div>
        {
          item.flag === 1 && <div style={{borderRadius:'50%',backgroundColor:'rgba(0,0,255,0.6)',width:'10px',height:'10px',position:'relative',left:'40px'}}></div>
        }
      </div>
      <hr/>
    </div>
  );
})}
  </div>
  {edit && <div id="edit">

      <p style={{padding:'10px 20px',fontSize:'1.3em',fontWeight:'400'}}>Edit Profile</p>
      {updated && <span style={{margin:'10px 20px',color:'green'}}>Profile is updated !</span>}<br/>
      {!good4 && !image2 && <i ref={popup} style={{display:'inline-block',margin:'10px 20px'}} id="profile2" className="dropbtn fa-solid fa-user"></i>}
      {image2 && (
        <div style={{border:'1px solid rgb(200,200,200)',padding:'2px',margin:'30px 20px',width:'150px',height:'auto'}}>
          <img onLoad={handleImageLoad2} loading="lazy"
            src={image2} 
            alt="Preview1" 
            style={{ transition: 'opacity 0.5s ease',maxWidth: '100%', height: 'auto' }} 
          />
        </div>
      )}
      {!image2 && good4 && (
        <div style={{border:'1px solid rgb(200,200,200)',padding:'2px',margin:'30px 20px',width:'150px',height:'auto'}}>
          <img onLoad={handleImageLoad2} loading="lazy"
            src={`https://pneuexpress.online/api/${formData.image}`} 
            alt="Preview2" 
            style={{ opacity: 0,transition: 'opacity 0.5s ease',maxWidth: '100%', height: 'auto' }} 
          />
        </div>
      )}
      <p style={{padding:'10px 20px',fontSize:'1.1em',fontWeight:'400'}}>Change Profile Picture</p>

      <input 
  accept="image/*"
  onChange={handleFileChange2} 
  id="put" 
  type="file"
/><br/>

      <input autoComplete="off" value={formData.firstName} onChange={handleChange1} placeholder='first name' id="firstName" type="text" name="firstName"/>
      
      <input autoComplete="off" value={formData.lastName} onChange={handleChange2} type="text" placeholder='last name' id="lastName" name="lastName"/>
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
  <div ref={popup2} id="post">
    <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <h3>Add New Post</h3>
      <i id="close" onClick={closePost} className="fa-solid fa-x"></i>
    </div>
    <hr style={{marginBottom:'20px',width:'100%',opacity:'0.4'}}/>
    <form autoComplete="off" action='' onSubmit={addNewPost} method="post">
    {image && (
        <div>
          <img onLoad={handleImageLoad} loading="lazy"
            src={image} 
            alt="Preview" 
            style={{ opacity: isLoaded ? 1 : 0,transition: 'opacity 0.5s ease',maxWidth: '100%', height: 'auto',width:'100%'}} 
          />
        </div>
      )}
      <input autoComplete="off" accept="image/*" 
        onChange={handleFileChange} id="put" style={{height:'auto',width:'90%',border:'1px solid #ced4da',fontSize:'1.2em',padding:'5px',marginBottom:'10px'}} type="file"/><br/>
      <label htmlFor="say">Say Something</label><br/>
      <input autoComplete="off" style={{height:'35px',padding:'5px',width:'100%',marginTop:'10px',marginBottom:'10px'}} type="text" value={content} onChange={handleContentChange} name="say" id="say"/><br/>
      <input autoComplete="off" type="submit" value="Post" style={{padding:'10px',color:'white',backgroundColor:'#0b5ed7'}}/>
    </form>
  </div>
  </div>}

  {edt && <div style={{display:'flex',justifyContent:'space-between',width:'85%',margin:'auto'}}>
  <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
  { 
    <div style={{flexGrow: 25}}>
      {(noImage) && <><span id="edtd">no image is selected</span><br/></>}
      {(ress===null) && <div className="edct" style={{display:'inline-block',verticalAlign:'top'}}>Follow Someone or Add a new post</div>}
    </div>
  }
{ress!==null && ress.length!==0 && <div style={{width:'100%',margin:'auto'}}>
            
            {ress.length!==0 && ress.map((item, index) => {
      return (
          <div id={`send_${item.id_post}`} className="edcct" key={index}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginLeft:'10px',marginBottom:'10px'}}>
                <div>
            {item.profile_pic===null && <i id="profile11" className="dropbtn fa-solid fa-user"></i>}
            {item.profile_pic!==null && <img onLoad={handleImageLoad2} loading="lazy"
                src={`https://pneuexpress.online/api/${item.profile_pic}`} 
                alt="Preview" 
                style={{
                    opacity:'0',
                    transition: 'opacity 0.5s ease',
                    marginLeft: '1px',
                    marginBottom: '6px',
                    maxWidth: '100%',
                    marginRight: '5px',
                    height: '35px',
                    width: '35px',
                    verticalAlign: 'middle',
                    borderRadius: '50%'
                }} 
            />}
            {<Link style={{color:'black'}} to={`/profile?username=${item.username}`}><span style={{fontSize:'0.9em'}}>{item.username}</span></Link>}
            </div>
            <div style={{position:'relative',display:'flex',flexDirection:'column'}}>
            {res.data.response.id===item.id && <i id={`i_${item.id_post}`} onClick={toggleDelete} style={{marginRight:'10px',fontSize:'1em'}} className="fa-solid fa-ellipsis"></i>}
            <div onClick={()=>deletePost(item.id_post)} id={`${item.id_post}`} className="dropdown-conten">
                    <div><i className="fa-solid fa-trash"></i><span id={`del_${item.id_post}`}>Delete Post</span></div>  
                </div>
            </div>
            </div>
            <img loading="lazy" onLoad={handleImageLoad2}
                src={`https://pneuexpress.online/api/${item.photo}`} 
                alt="Preview" 
                style={{
                  opacity:'0',
                  transition: 'opacity 0.5s ease',
                    marginBottom: '6px',
                    maxWidth: '100%',
                    height: '100%',
                    width: '100%',
                    verticalAlign: 'middle',
                }} 
            />
            <div>
              <div style={{display:'flex',alignItems:'center'}}>
                <i onClick={(event)=>
                  {
                  const newLikes = [...likes];
                  newLikes[index][0] -= 1;
                  setLikes(newLikes);
                  removeLike(item.id_post);event.target.style.display='none';event.target.nextElementSibling.style.display='block';
                  }} 
                  style={{display:item.liked?'block':'none',color:'#dc3545',fontSize:'1.5em',margin:'5px'}} className="fa-solid fa-heart"></i>
                
                <i onClick={(event)=>{
                  const newLikes = [...likes];
                  newLikes[index][0] += 1;
                  setLikes(newLikes);
                  addLike(item.id_post,item.id);event.target.style.display='none';event.target.previousElementSibling.style.display='block';}} style={{display:item.liked?'none':'block',fontSize:'1.5em',margin:'5px'}} className="fa-regular fa-heart"></i>
                
                <i style={{fontSize:'1.5em',margin:'5px 10px 5px 5px'}} className="fa-regular fa-comment"></i> <span onClick={()=>openComments(item.id_post)} style={{fontSize:'0.8em',fontStyle:'italic',fontWeight:'600'}}>{item.num_of_comments} comments</span></div>
              <hr style={{opacity:'0.3',width:'100%'}}/>
              <div style={{margin:'15px'}}>
                <span id={item.id_post} className='slikes' onClick={(event)=>{
                  if(document.querySelector(`.all.box_${event.target.id}`).style.display==='none'){
                    document.querySelector(`.all.box_${event.target.id}`).style.display='flex';
                  }
                  }}>{likes[index][0]} likes</span>
                <span style={{marginLeft:'10px',fontSize:'0.9em',opacity:'0.5'}}>{item.formatted_time}</span></div>
              <div style={{margin:'15px',wordBreak:'break-word'}}>{item.content}</div>
              <hr style={{opacity:'0.3',width:'100%'}}/>
              <div style={{marginBottom:'10px',width:'100%',display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                <input autoComplete="off" placeholder='say something...' type="text" id={`${index}`} className="sayy"/>
                <button className={`send_${item.id_post}`} onClick={(e)=>{
                  postCommennt(item.id_post,e.target.previousElementSibling.value,item.id);
                  }} type="submit">Post</button>
              </div>
            </div>
          </div>
      );
  })}
  
            </div>}</div>
    <div id="follow">
    
        <div style={{display:'flex',flexDirection:'column',padding:'2px',margin:'25px 30px',verticalAlign:'top'}}>
        <div style={{display:'flex'}}>
        {formData.image && (<img onLoad={handleImageLoad2} loading="lazy"
            src={`https://pneuexpress.online/api/${formData.image}`} 
            alt="Preview" 
            style={{ transition: 'opacity 0.5s ease',maxWidth: '100%',marginRight:'15px', width:'60px',verticalAlign:'top',height:'60px',borderRadius:'50%'}} 
          />)}
          {!formData.image && <i id="profile3" style={{marginRight:'15px'}} className="dropbtn fa-solid fa-user"></i>}
          <div style={{overflow:'hidden',display:'flex',flexDirection:'column'}}>
            <span ref={op} style={{cursor:'pointer',display:'inline-block',fontWeight:'500'}}>{formData.firstName} {formData.lastName}</span>
            <span style={{color:'rgba(0,0,0,0.5'}}>@{formData.username}</span>

          </div>
          </div>
          <div style={{textAlign:'start',marginTop:'15px'}}>
          <span style={{fontWeight:'bold',color:'rgba(0,0,0,0.4'}}>You Can Follow Them</span>

          </div>
          {users.length!==0 && users && <div style={{width:'100%',marginTop:'20px'}}>
            
          {users.length!==0 && users.map((item, index) => {
    return (
        <div style={{display:'flex',marginBottom:'10px',justifyContent:'space-between'}} key={index}>
          <div style={{display:'flex'}}>
            {item.profile_pic!==null && <img onLoad={handleImageLoad2} loading="lazy"
                src={`https://pneuexpress.online/api/${item.profile_pic}`} 
                alt="Preview" 
                style={{
                    transition: 'opacity 0.5s ease',
                    marginLeft: '1px',
                    marginBottom: '6px',
                    maxWidth: '100%',
                    marginRight: '15px',
                    height: '45px',
                    width: '45px',
                    verticalAlign: 'middle',
                    borderRadius: '50%'
                }} 
            />}
            {item.profile_pic===null && <i id="profile10" className="dropbtn fa-solid fa-user"></i>}
            <div style={{overflow:'hidden',display:'flex',flexDirection:'column'}}>
            <Link style={{color:"black"}} to={`/profile?username=${item.username}`}><span style={{display:'inline-block',fontWeight:'500'}}>{item.first_name} {item.last_name}</span></Link>
            <span style={{color:'rgba(0,0,0,0.5'}}>@{item.username}</span>

          </div>
          </div>
          <button onClick={(e)=>follow(e,item.id)} className='follow'>Follow</button>
          
        </div>
    );
})}

          </div>}
        </div>
      
    </div>

    </div>}
    {ress!==null && ress.length!==0 && ress.map((item,index) => {
      return (
        <div key={index} id={item.id_post} className={`all likes box_${item.id_post}`} style={{display:'none'}}>
        <div className={`postp`}>
          <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h3>Likes</h3>
            <i id="cloe" onClick={()=>closeLikes(item.id_post)} className="fa-solid fa-x"></i>
          </div>
          <hr style={{marginBottom:'20px',width:'100%',opacity:'0.4'}}/>
          <div>
            
          {item.likers.length===0 && <span>Currently No Likes</span>}


            {item.likers && <div style={{width:'100%',marginTop:'20px'}}>
            {item.likers  && item.likers.map((itm) => {
        return (
          <div style={{ display: 'flex', marginBottom: '10px', flexDirection: 'column' }} key={itm.id}>
            <div style={{ display: 'flex'}}>
              <div style={{display: 'flex',justifyContent:'space-between',width:'100%'}} key={itm.id}>
                <div style={{display: 'flex'}}>
              {itm.image ? (
                <img
                  onLoad={handleImageLoad}
                  src={`https://pneuexpress.online/api/${itm.image}`}
                  alt="Profile Preview"
                  style={{
                    opacity: isLoaded ? 1 : 0,
                    marginLeft: '1px',
                    marginBottom: '6px',
                    maxWidth: '100%',
                    marginRight: '15px',
                    height: '45px',
                    width: '45px',
                    verticalAlign: 'middle',
                    transition: 'opacity 0.5s ease',
                    borderRadius: '50%',
                  }}
                />
              ) : (
                <i id="profile10" className="dropbtn fa-solid fa-user"></i>
              )}
              <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <Link style={{ color: 'black' }} to={`/profile?username=${itm.username}`}>
                  <span style={{ display: 'inline-block', fontWeight: '500' }}>
                    {itm.first_name} {itm.last_name}
                  </span>
                </Link>
                <span style={{ color: 'rgba(0,0,0,0.5)' }}>@{itm.username}</span>
              </div>
              </div>
            {itm.me===0 && (itm.ok===0 ? (<button onClick={(e) => follow(e, itm.id)} className='follo'>Follow</button>) : (<button onClick={(e)=>unfollow(e,itm.id)} className='unfollo'>Unfollow</button>))}
              </div>
            </div>
            
          </div>
        );
      })}
      
            
                      </div>}
          </div>
        </div>
        </div>)})}
{!edit && !profile2 && profile && <div id="kol">
      <div id="pol">
      {!image2 && formData.image && (
        <img
          onLoad={handleImageLoad2}
          loading="lazy"
          src={`https://pneuexpress.online/api/${formData.image}`}
          alt="Preview"
          id="image30"
          style={{
            backgroundColor: 'rgb(255, 255, 255)',
            border: '1px solid rgba(0,0,0,0.2)',
            borderRadius: '50%',
            padding: '2px',
            fontSize: '5.8em',
            color: 'white',
            marginLeft: '10px',
            width: '170px',
            height: '170px',
            transition: 'opacity 0.5s ease', 
          }}
        />
      )}
          {image2 && (<img onLoad={handleImageLoad2} loading="lazy"
            src={image2} 
            alt="Preview" 
            id="image30" 
            style={{
              backgroundColor: 'rgb(255, 255, 255)',
              border:'1px solid rgba(0,0,0,0.2)',
              borderRadius: '50%',
              padding: '2px',
              fontSize: '5.8em',
              color: 'white',
              marginLeft: '10px',
              width:'170px',
              height: '170px',
              transition: 'opacity 0.5s ease'
            }}
          />)}
          {!formData.image && <i id="profile30" style={{marginRight:'15px'}} className="dropbtn fa-solid fa-user"></i>}
        <div id="alg">
          <div style={{display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center'}}><span style={{fontSize:'2em'}}>{formData.firstName} {formData.lastName}</span>


          <div style={{position:'relative',display:'flex',flexDirection:'column'}}>{res && res.data.response.blocked2===0 && rs && res.data.response.id!==rs.data.response.id && res.data.response.blocked!==1 && <i onClick={()=>setDrop(!drop)} style={{fontSize:'2em'}} className="fa-solid fa-ellipsis"></i>}
          </div>
          </div>
          <span style={{marginTop:'10px',fontSize:'1.1em',opacity:'0.6'}}>@{formData.username}</span>
          {res && res.data.response.blocked2===0 && res.data.response.blocked!==1 && <div id="manque">
    <button className='follo'><i style={{marginRight:'5px'}} className="fa-solid fa-signs-post"></i>{res && res.data.response.n_posts} Posts</button>
          <button onClick={()=>{openFollowers();}} className='follo'><i style={{marginRight:'5px'}} className="fa-solid fa-people-arrows"></i>{res && res.data.response.num_of_followers} Followers</button>
          <button onClick={()=>{openFollowing();}} className='follo'><i style={{marginRight:'5px'}} className="fa-solid fa-address-book"></i>{res && res.data.response.num_of_following} Following</button>
          </div>}
          
          
        </div>
        </div>
      </div> }

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
                  loading="lazy"
                  src={`https://pneuexpress.online/api/${item.image}`}
                  alt="Profile Preview"
                  style={{
                    marginLeft: '1px',
                    marginBottom: '6px',
                    maxWidth: '100%',
                    marginRight: '15px',
                    height: '45px',
                    width: '45px',
                    transition: 'opacity 0.5s ease',
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
             <i id="close" onClick={closePost2348} className="fa-solid fa-x"></i>
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
                   loading="lazy"
                   style={{
                     marginLeft: '1px',
                     marginBottom: '6px',
                     transition: 'opacity 0.5s ease',
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
       


       {following && <div className='all'>
         <div ref={popup2344} className="postp">
           <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
             <h3>Following</h3>
             <i id="close" onClick={closePost2348} className="fa-solid fa-x"></i>
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
                   src={`https://pneuexpress.online/api/${item.image}`}
                   alt="Profile Preview"
                    onLoad={handleImageLoad2}
                    loading="lazy"
                   style={{
                     marginLeft: '1px',
                     marginBottom: '6px',
                     maxWidth: '100%',
                     marginRight: '15px',
                     height: '45px',
                     width: '45px',
                     transition: 'opacity 0.5s ease',
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
       
         {ress!==null && ress.length!==0 && ress.map((item,index)=>{
          return(
            <div style={{display:'none'}} className={`allp comments boxC_${item.id_post}`} key={item.id_post}>
                <div className='postg'>
                  <div className='maroc'><img
  style={{
    width: '100%',
    position: 'absolute', 
    transition: 'opacity 0.5s ease',
  }} alt="pzaeklpaz"
  onLoad={handleImageLoad2}
  loading="lazy"
  src={`https://pneuexpress.online/api/${item.photo}`}
/>
</div>
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
                    transition: 'opacity 0.5s ease',
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

       <Comments checkNewComments={checkNewComments} />

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
         {!edit && profile && <div style={{textAlign:'center',marginBottom:'20px'}}>
        <h1 style={{marginBottom:'10px',marginLeft:'0'}}>Posts</h1>
        <div style={{textAlign:'center',justifyContent:"center",display:'flex',flexWrap:'wrap',width:'90%',margin:'auto'}}>
        {redss!==null && redss.length!==0 ? redss.map((item, index) => {
      return (
          <div id={`sen_${item.id_post}`} className="edcctp" key={index}>
            
            <img onLoad={handleImageLoad2} loading="lazy"
                onClick={()=>openComments(item.id_post)}
                src={`https://pneuexpress.online/api/${item.photo}`} 
                alt="Preview" 
                style={{
                    opacity: 0,
                    objectFit:'cover',
                    marginBottom: '6px',
                    maxWidth: '100%',
                    marginRight: '15px',
                    transition: 'opacity 0.5s ease',
                    display:'inline-block',
                    height: '200px',
                    width: '300px',
                    verticalAlign: 'middle',
                }} 
            />
            
          </div>
      );
  }):<p style={{width:'70%',margin:'auto',padding:'10px',backgroundColor:'rgba(0,0,0,0.2)'}}><i style={{marginRight:'10px',color:'#FFF',borderRadius:'50%',padding:'10px',backgroundColor:'rgba(0,0,0,0.7)'}} className="fa-solid fa-x"></i>You don't have any post</p>}  </div></div>}
  </>
  )
}

export default Header
