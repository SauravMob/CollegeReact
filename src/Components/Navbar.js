import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/" style={{ color: 'white' }}>College</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item"><Link className="nav-link" aria-current="page" to="/" style={{ color: 'white' }}>Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/all" style={{ color: 'white' }}>All Student</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/specific" style={{ color: 'white' }}>Specific Student</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/admission" style={{ color: 'white' }}>Admission</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    )
  }
}

export default Navbar