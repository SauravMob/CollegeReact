import React, { Component } from 'react'
import PostApi from './Components/PostApi'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SpecificStudent from './Components/SpecificStudent'
import Allstudents from './Components/Allstudents';
import Sidebar from './Components/Sidebar';
import Home from './Components/Home';
import './App.css';

class App extends Component {
  render() {
    return (
      <>
        <div className="App">
          <Router>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/all' element={<Allstudents url={'list'} />} />
              <Route exact path='/specific' element={<SpecificStudent url={'student/1'} />} />
              <Route exact path='/admission' element={<PostApi />} />
            </Routes>
            <Sidebar url={'list'}/>
          </Router>
        </div>
      </>
    )
  }
}

export default App