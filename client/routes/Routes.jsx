import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Homepage from '../src/pages/Homepage';
import About from '../src/pages/About';
import Signin from '../src/pages/Signin';
import Signup from '../src/pages/Signup';
import Profile from '../src/pages/Profile';
import PrivateRoute from '../src/components/PrivateRoute';
import ScreenMode from '../src/pages/Screen.mode';
import Estatelisting from '../src/pages/Estate.listing';
import Contact from '../src/pages/Contact';
import UpdateListing from '../src/pages/updateListing';
// import Header from '../src/components/Header';

export default function Routers() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route element={<PrivateRoute/>}>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/estate-listing' element={<Estatelisting/>}/>
              <Route path='/update-listing/:userListingId' element={<UpdateListing/>}/>
            </Route>
            <Route path='/screenmode' element={<ScreenMode/>}/>
        </Routes>
      </Router>
    </div>
  )
}
