import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import PostApi from './Components/PostApi'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SpecificStudent from './Components/SpecificStudent'
import Allstudents from './Components/Allstudents';

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/all' element={<Allstudents url={'list'} />} />
            <Route exact path='/specific' element={<SpecificStudent url={'student/1'} />} />
            <Route exact path='/admission' element={<PostApi />} />
          </Routes>
        </Router>
      </>
    )
  }
}

export default App