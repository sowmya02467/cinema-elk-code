
import React, { useEffect, useState } from "react";
import { Rating, AppBar, Toolbar ,Button, Card, Typography, Grid, CardMedia, Stack} from "@mui/material";
import logo  from '../assets/1112.png'
import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import {collection , getDocs} from 'firebase/firestore'
import { database } from "./Firebase";

import profile from '../assets/boy-1.png';





export default function ReviewsPage(){
 const navigate = useNavigate()

  const [movieReview , setMovieReview] = useState([]);

  const getAllReviews = async () => {
    const details = collection(database,"AllMyMovieReviews");
    const reviews = await getDocs(details);
    setMovieReview(reviews.docs.map((user) =>(
      {...user.data(), id: user.id}
    )))
  }

   useEffect(() =>{
    getAllReviews()
   }, [])




return(
  <div>
     
    <AppBar  style={{borderBottom:'1px solid grey',backgroundColor:'#80DEEA',padding:'0.5rem',}}position="static" >
      <Toolbar>
      <img src ={logo} height={70} width={100}/>
        <Typography component='div' variant='h4' sx={{flexGrow:1}} style={{color:"black"}} >cinema elk</Typography>
        <Button  onClick={()=>navigate('/')} style={{backgroundColor:'#612ad9',color:'white'}}> logout</Button>
      </Toolbar>
    </AppBar>

    <Grid container spacing={2} style={{display:'flex' ,flexWrap:'wrap'}} >
            
            <Grid item xs={1} style={{display:'grid' ,marginTop:'6rem',gap:'1.5rem',height:'50vh'}}>
            <HomeIcon  onClick={()=> navigate('/movies')}  sx={{fontSize:40}}  style={{borderRadius:'50%',padding:'0.3rem',cursor:'pointer'}} color='primary' />
            <MovieIcon onClick={()=> navigate('/reviews')} sx={{fontSize:40}} style={{backgroundColor:'#f15a25',borderRadius:'50%',padding:'0.3rem',cursor:'pointer'}}/>
            <AccountCircleIcon  onClick={()=> navigate('/myallreviews/:id')} sx={{fontSize:50}} style={{borderRadius:'50%',padding:'0.3rem',cursor:'pointer'}} color='primary' />
            </Grid>

     <Grid item xs={11}  style={{marginTop:'0.8rem'}}>
     <div>
      {
        movieReview.map((review , index) =>{
return(
  <div>
    <Card style={{width:'40rem',height:'16rem',padding:'0.5rem',margin:'0.5rem',border:'1px solid grey',display:'flex'}}  Key={index}>
     <div>
      <Typography  variant="h6"onClick={()=>navigate('/singlereviews')} style={{display:'flex',borderBottom:'2px solid grey',alignItems:"center", gap:'0.5rem',padding:'0.5rem',cursor:'pointer'}}>
      <img  style={{height:'2rem',width:'2rem'}} src={profile}  />
      {review.userEmail.split('@')[0]}
      </Typography>

      <div style={{marginTop:'0.5rem'}}>
        <Rating value={review.rating}/>
      </div>


      <Typography variant="body1">
       {review.review}
      </Typography>



      <Button onClick={()=>navigate('/singlereviews')} style={{marginTop:'0.5rem'}} variant="contained" color="primary" >readmore</Button>
     </div>
     <Stack>
      <CardMedia component='img'    src={review.image}   style={{cursor:'pointer',height:'15rem',width:'11rem',marginTop:'1rem', marginLeft:"16rem"}} />
     </Stack>
    </Card>
    </div>
)




        })
      }
     </div>
</Grid>

</Grid>
   
</div>
)



}














