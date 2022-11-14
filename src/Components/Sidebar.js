import React, { Component } from 'react'
import '../App.css';
import { SidebarData } from './SidebarData'
import { Link } from 'react-router-dom'

class Sidebar extends Component {

    render() {
        return (
            <div className='Sidebar'>
                <ul id='SidebarList'>
                    {SidebarData.map((val, key) => {
                        return (
                            <Link
                                key={key}
                                className='row' id={window.location.pathname === val.link ? "active" : ""}
                                to={val.link}
                            >
                                <div id='icon'>{val.icon}</div> <div id='title'>{val.title}</div>
                            </Link>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default Sidebar