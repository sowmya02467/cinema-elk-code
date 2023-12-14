import React from 'react';
import {Route, Routes} from 'react-router-dom'
import LoginPage from './Components/Loginpage';
import SignUpPage from './Components/SignUpPage';
import Movies from './Components/Movies';
import Reviews from './Components/Reviews';
import MovieD from './Components/MovieD';
import MyAllReviewsPage from './Components/MyAllReviewsPage';
import SingleReviewPage from './Components/SingleReviewPage';

function App() {
 
  

  return (
    <div className="App">
      <Routes>
        <Route path='/'  element={< LoginPage/> }/>
        <Route path='/signUp'  element={< SignUpPage/> }/>
        <Route path='/Movies' element={< Movies/>} />
        <Route path='/reviews' element={< Reviews/>}/>
        <Route path='/details/:id' element={  <MovieD /> } />
        <Route path='/singlereviews' element={<SingleReviewPage/>} />
        <Route  path='/myallreviews/:id'  element={<MyAllReviewsPage/>}/>
      </Routes>
   
  
    
      
    </div>
  )
}

export default App
