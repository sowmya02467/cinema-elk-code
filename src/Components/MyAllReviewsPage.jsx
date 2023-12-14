
import React from 'react';
import {Rating , CardMedia, Typography, AppBar,Toolbar,Button,Grid,Card, Dialog,Input } from '@mui/material';
import logo from '../assets/1112.png';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState ,useEffect } from 'react';
import {collection ,doc, getDocs, deleteDoc,  query, where} from 'firebase/firestore';
import { database } from './Firebase';

import { useLocation, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {  onAuthStateChanged } from "firebase/auth"
import { getAuth } from 'firebase/auth';
const auth = getAuth()
const MoviesImages =`https://image.tmdb.org/t/p/w500`;

export default function MyAllReviewsPage(){
    const [user , setUser] = useState()
    const[newReviews , setNewReviews] = useState()
    const[newRating , setNewRating] = useState()
    const [enterReview , setEnterReview] = useState(false);

    const navigate = useNavigate();
    const [allMyMovieReview , setAllMyMovieReview] = useState([]);
   
  
    

  //   const getAllReviews = async()=>{
  //   const details=collection(database,'AllMyMovieReviews');
  //   const reviews= await getDocs(details);
  //     reviews.forEach((details)=>{
  //         setAllMyMovieReview((reviewsdetails)=>{
  //           return(
  //             [...reviewsdetails, details.data()]
  //           )
  //         })
  //         console.log(details.data()) 
        
  //     })
    
        
  // }

  //   useEffect(()=>{
  //      getAllReviews()

  //   },[])
  
    useEffect(() => {
      const getAllReviews = async () => {
        const details=collection(database,'AllMyMovieReviews' );
        const reviews = await getDocs(details);
        setAllMyMovieReview(reviews.docs.map((user) => (
          { ...user.data(), id: user.id }
          )
        )
        );
        };
  
           getAllReviews();
        }, []);
   
    useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
          console.log(user)
          setUser(user)
      })
  },[user,navigate])

  const reviewUpdate = async (id) => {
    const userDoc = doc(database,'AllMyMovieReviews' , id);
    const data = {
        review:newReviews,
        rating:newRating,
        

      };
      setDoc(userDoc, data)
.then(userDoc => {
    console.log(userDoc);
})
      
    
  };

  const handleDeleteReview =  (id) => {
    
      const userDoc = doc(database, "AllMyMovieReviews", id);
      deleteDoc(userDoc);
  
    
   };
  
   const handleSumbit = () => {
    setEnterReview(false);
    
   

    alert('Review updated successfully')

     
  }
  async function Users() {
    const collectionRef = collection(database, "AllMyMovieReviews");
    if(user && user.email){
        const revi = query(
            collectionRef,
            where("userEmail", "==",auth.currentUser.email)
          );
    
        const querySnapshot = await getDocs(revi);
        const reviews = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMyReview(reviews);
      }
    
      

    }
    Users();


   
    return(
        <div >
          <AppBar style={{borderBottom:'1px solid grey',backgroundColor:'#80DEEA',padding:'0.5rem',}}position="static">
            <Toolbar>
            <img src ={logo} height={70} width={100}/>
            <Typography component='div' variant='h4' sx={{flexGrow:1}} style={{color:"black"}}><i>CinemaElk</i></Typography>
            <Button onClick={()=>navigate('/')} style={{backgroundColor:'#612ad9',color:'white'}}>logout</Button>
            </Toolbar>
            </AppBar>


            <Grid container spacing={2} style={{display:'flex' ,flexWrap:'wrap'}} >

            <Grid item xs={1} style={{display:'grid' ,marginTop:'6rem',gap:'1.5rem',height:'50vh'}}>
            <HomeIcon  onClick={()=> navigate('/movies')}  sx={{fontSize:40}}  style={{borderRadius:'50%',padding:'0.3rem',cursor:'pointer'}} color='primary' />
            <MovieIcon onClick={()=> navigate('/reviews')} sx={{fontSize:40}} style={{borderRadius:'50%',padding:'0.3rem',cursor:'pointer'}} color='primary'/>
             <AccountCircleIcon sx={{fontSize:35}} style={{backgroundColor:'#f15a25',borderRadius:'50%',padding:'0.3rem',cursor:'pointer'}}  />
             </Grid>


             <Grid item xs={11}  style={{marginTop:'0.8rem'}}>
           
            <Typography variant="h6" >                        
            My Reviews
            </Typography>
    



    
          <div style={{display:'flex',flexWrap:'wrap'}}>
           {
             allMyMovieReview.map((review , index)=>{
              return(
                  <div>
 
                <Card style={{width:'40rem',height:'16rem',padding:'0.5rem',margin:'0.5rem',border:'1px solid grey',display:'flex' ,justifyContent:'space-between'}}  Key={index} >
       
                <div>
               <Typography variant="h6"onClick={()=>navigate('/singlereviews')} style={{display:'flex',borderBottom:'2px solid grey',alignItems:"center", gap:'0.5rem',padding:'0.5rem',cursor:'pointer'}} >                        
               {user.email.split('@')[0]}
             </Typography>     
        
        
              <div style={{marginTop:'0.5rem'}}>
             <Rating value={review.rating} />
        </div>

        <Typography variant="h6" >                        
          {review.review}
          </Typography>    
          <div style={{marginTop:'0.5rem',display:'flex',alignItems:'center',gap:'1rem',cursor:'pointer'}}>
         <Button  variant="contained" color="primary">Read More</Button>
        
            <EditIcon onClick={()=>setEnterReview(true)} />
            <div>
            
            <Dialog  aria-labelledby='dailog-title' 
            open={enterReview}
            onClose={()=> setEnterReview(false)} 
            >
          
           <Input onChange={(e)=> setNewReviews(e.currentTarget.value)} defaultValue={review.review} value={newReviews}/>
           <Rating onChange={(e)=>setNewRating(e.currentTarget.value)} defaultValue={review.rating} value={newReviews}/>
           
        
           
            
            <Button color='primary' style={{marginTop:'1.5rem'}} onClick={()=>{handleSumbit()
              reviewUpdate(review.id)}}>Submit</Button>
           
           
            </Dialog>
          </div>
            <DeleteIcon onClick={()=>{handleDeleteReview(review.id)}} />
            </div> 

        </div>


        <div>
        <CardMedia component='img'  src={review.image} style={{cursor:'pointer',height:'15rem',width:'11rem'}}/>
        </div>
       
     </Card>
    </div>
     )
   })}
</div>


</Grid>


            </Grid>


        </div>
    )
}