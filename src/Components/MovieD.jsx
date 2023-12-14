import { AppBar, Toolbar, Typography,Button, Grid, CardMedia, Dialog, DialogTitle, Input, TextField, Card, Rating} from "@mui/material";

import React  from "react"
import logo  from '../assets/1112.png'
import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation, useNavigate } from "react-router-dom";
import { useState , useEffect} from "react";

 import {collection ,getDocs, doc , setDoc,query,where} from 'firebase/firestore';
 import { database } from './Firebase';
import axios from "axios";
 import { getAuth } from 'firebase/auth';
const auth=getAuth()



const MoviesImages =`https://image.tmdb.org/t/p/w500`;

export default function MovieDetails(){


const navigate = useNavigate();
const location = useLocation();
const playing = location.state;
const {title, poster_path, overview, id} = location.state;




const [inputValue , setInputValue] = useState('');
const [ratingInput , setRatingInput] = useState('');
const [movieReview , setMovieReview] = useState([]);
const [enterReview , setEnterReview] = useState(false);



  const [castAndcrew , setCastAndCrew] = useState([]);
   
  useEffect(()=>{
    async function castAndCrew(){
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=23d349ce8dc584da3f1863464d8d5c91&language=en-US`)
       setCastAndCrew(response.data.cast.slice(1,5))
      console.log(response.data.cast)
    }
    castAndCrew()
  },[])



  const [otherSimilarMovies , setotherSimilarMovies] = useState([]);
   
  useEffect(()=>{
    async function getSimilarMovies(){
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=23d349ce8dc584da3f1863464d8d5c91&language=en-US&page=1`)
      setotherSimilarMovies(response.data.results)
      console.log(response.data.results)
    }
    getSimilarMovies()
  },[])




 const getMyAllReviews = async()=>{
  const myAllReviewsDetails = doc(collection(database, 'AllMyMovieReviews'));
  const colRef = await setDoc(myAllReviewsDetails,{

    userEmail : auth.currentUser.email,
    movie: title,
    review: inputValue,
    rating: ratingInput,
    image: MoviesImages + poster_path
  });



  console.log(myAllReviewsDetails.id)
  console.log(colRef.id)



 }

 useEffect(() =>{
  async function getAllReviews()  {
    const q = query(
      collection(database, "AllMyMovieReviews"),
      where ("movie","==", title)
    );
const querySnapshot = await getDocs(q);

 const prevReviews = querySnapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
 }));
 setMovieReview(prevReviews);
}
  getAllReviews();
 }, []);



const handleSumbit = () => {
    setEnterReview(false);
    console.log(inputValue);
    console.log(ratingInput);
    setInputValue('');
    setRatingInput('');
    getMyAllReviews()
    alert('Review submitted successfully')

     
  }



    return(

 <div >
 

     <AppBar style={{border:'1px solid grey',backgroundColor:'#80DEEA',padding:'0.5rem',}}position="static"  >
          <Toolbar>
               <img onClick={()=> navigate('/')}   src={logo}  height={70} width={100}alt="" />
               <Typography   onClick={()=> navigate('/')}  component='div' variant='h4' sx={{flexGrow:1}} style={{color:"black"}}> <li>cinema ELK</li></Typography>
                <Button   onClick={()=> navigate('/')} style={{backgroundColor:'#612ad9',color:'white'}}>
logout
               </Button>
           </Toolbar>
    </AppBar>



<Grid  container spacing={3} style={{display:'flex' }} >

{/* this is icons part */}
    <Grid item xs={1} style={{display:'grid' ,marginTop:'6rem',gap:'1.5rem',height:'50vh'}} >
    <HomeIcon    onClick={()=> navigate('/movies')} sx={{fontSize:40}}  style={{backgroundColor:'#f15a25' ,borderRadius:'50%',padding:'0.3rem',cursor:'pointer'}}/>
    <MovieIcon  onClick={()=> navigate('/reviews')} sx={{fontSize:50}} style={{borderRadius:'50%',padding:'0.3rem',cursor:'pointer'}} color='primary'/>
    <AccountCircleIcon onClick={()=> navigate(`/myallreviews/${playing.id}`,{state:playing})}s sx={{fontSize:50}}    style={{borderRadius:'50%',padding:'0.3rem',cursor:'pointer'}} color='primary' />
   </Grid>
    


     <Grid item xs={5} >

        <div  style={{marginTop:'2rem'}} >
            <CardMedia component='img'  src={MoviesImages + poster_path} style={{cursor:'pointer',height:'22rem',width:'18rem'}}/>
            <Typography variant='h5' style={{marginTop:'1rem'}} >
              {title}
            </Typography>
             <Typography ariant='h6' style={{marginTop:'1rem'}} >
                overview
             </Typography>
              <Typography  variant='p' style={{marginTop:'1rem'}}>
                {overview}
              </Typography>
            <div>
                <Button   onClick={()=>setEnterReview(true)} variant='contained' color='primary' style={{backgroundColor:'#f15a25',marginTop:'1rem'}}>   post review</Button>
            </div>
        </div>

        <div>
            <Dialog   aria-labelledby='dailog-title' 
            open={enterReview}
            onClose={()=> setEnterReview(false)}   >
                <DialogTitle id='dialog-title'>  ENTER YOUR REVIEW </DialogTitle>
                <Input value={inputValue} onChange={(e)=>setInputValue(e.currentTarget.value)} style={{padding:'0.3rem',marginLeft:'0.5rem',marginRight:'0.5rem'}} placeholder='Enter review'  />
                <Typography style={{padding:'0.3rem',marginLeft:'0.5rem',marginRight:'0.5rem',marginTop:'1.5rem'}}>RATING

                    <TextField value={ratingInput} onChange={(e)=>setRatingInput(e.currentTarget.value)}  
                  variant="outlined" type='number' InputProps={{style: {borderRadius: '5px',width:'3.5rem',height:'1.5rem',marginTop:'0.1rem'}}} />OUT OF 5
                </Typography>
                <Button color='primary' style={{marginTop:'1.5rem'}} onClick={handleSumbit}> Submit  </Button>
            </Dialog>
        </div>



{/* the above is to know the who are the filim makers */}
    <Typography variant='h5' style={{marginTop:'1rem'}} >
  castAndCrew 
    </Typography>
    <div  style={{display:'flex',flexWrap:'wrap',gap:'0.7rem',marginTop:'1rem'}}>

   { castAndcrew. map((actors)=>{
       return(
        <div>
           <img  style={{height:'4rem', width:'4rem',borderRadius:'50% '}} src={MoviesImages + actors.profile_path}/>
            <div>
                <Typography variant='p'>
                 {actors.name}
                </Typography>
                </div>

            </div>
       )
   })}
 </div>

{/* this is the similiers movies from the same directors realesed */}
    <Typography variant='h5' style={{marginTop:'1rem'}} >
    Similar Movies
    </Typography>
    <div  style={{display:'flex',flexWrap:'wrap',gap:'0.7rem',marginTop:'1rem'}}>

   {  otherSimilarMovies.map((similarMovies)=>{
       return(
     <Card  style={{height:'10rem' , width:'9rem'}}onClick={()=>{ navigate(`/details/${similarMovies.id}`,{state:similarMovies})
     getMyAllReviews()}}  >
       <CardMedia    component='img'  src={MoviesImages + similarMovies.poster_path} style={{cursor:'pointer',height:'7rem',width:'10rem'}}/>
         
                <Typography >
                 {similarMovies.title}
                </Typography>
                </Card>
          

         
       )
   })}

</div>



</Grid>

  <Grid item xs={5}>

    
    <div style={{marginLeft:'10rem'}}>
      <Typography variant="h5" style={{marginTop:'1.5rem'}} >
reviews by cinema elk users
      </Typography    >
      <div style={{display:'flex',flexWrap:'wrap'}} >
  {
    movieReview.map((review , index )=>{
      return(
        <card  style={{width:'30rem',height:'8rem',padding:'0.5rem',margin:'0.5rem',border:'1px solid grey',justifyContent:'space-between'}}  Key={index} >
          <Typography variant="body1" style={{marginTop:'1rem'}} >
          {review.review}
          </Typography>
          <div variant="p" style={{marginTop:'0.5rem'}}  >
            <Typography>
              {review.userEmail.split('@')[0]}
            </Typography>
            <Rating value={review.rating}/>
          </div>
        </card>
      )
    })
  }









      </div>
    </div>


  </Grid>

   </Grid>




</div>
    )
}