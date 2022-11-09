import React, { Component } from 'react'
import '../App.css';
import axios from "axios"
import { SidebarData } from './SidebarData'
import { Link } from 'react-router-dom'

class Sidebar extends Component {

    constructor() {
        super()
        this.state = {
            users: [],
            text: '',
            suggestions: []
        }
    }

    update() {
        axios.get(`/Department/${this.props.url}`)
            .then((response) => {
                this.setState({ users: response.data })
                console.log(this.state.users)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.update()
    }

    suggBtn = (text) => {
        let matches = []
        if (text.length > 0) {
            matches = this.state.users.filter(user => {
                const regex = new RegExp(`${text}`, "i");
                return user.firstname.match(regex)
            })
        }
        console.log('matches', matches)
        this.setState({ suggestions: matches })
        this.setState({ text: text })
    }

    acceptSugg = (text) => {
        this.setState({ text })
        this.setState({ suggestions: [] })
    }

    render() {
        return (
            <div className='Sidebar'>
                <div className='searchbar'>
                    <input type="text"
                        onChange={(e) => this.suggBtn(e.target.value)}
                        value={this.state.text}
                        id='search' placeholder="Search.." />
                    {this.state.suggestions && this.state.suggestions.map((suggestion, i) =>
                        <div key={i} onClick={() => this.acceptSugg(suggestion.firstname)} className="suggestions">
                            {suggestion.firstname}
                            </div>
                    )}
                    <button id='search'>Search</button>
                </div>
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