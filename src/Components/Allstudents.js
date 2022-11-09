import React, { Component } from 'react'
import axios from "axios"
import PropTypes from 'prop-types'
import '../App.css';

class Allstudents extends Component {

    static defaultProps = {
        url: "list"
    }
    
    static propTypes = {
        url: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            Number: 2,
            students: null
        }
    }

    update() {
        axios.get(`/Department/${this.props.url}?page=${this.state.page}&Number=${this.state.Number}`)
            .then((response) => {
                this.setState({ students: response.data })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    componentDidMount(){
        this.update()
    }

    NextClick = () => {
        console.log("Next")
        this.setState({page: this.state.page + 1})
        this.update()
    }
    
    PreviousClick = () => {
        console.log("Previous")
        this.setState({page: this.state.page - 1})
        this.update()
    }

    render() {
        let stu = null
        if (this.state.students != null) {
            stu = this.state.students.map((element) => {
                return <>
                    <div className="Allstu" key={element.id}>
                        <li type='square'><b>Student Number {element.id}</b></li>
                        <li>{element.firstname}</li>
                        <li>{element.lastname}</li>
                        <li>{element.age}</li>
                        <li>{element.department}</li>
                    </div>
                </>
            })
        }
        return (<>
        <div>{stu}</div>
        <button className='prepagination' onClick={this.PreviousClick}>Previous</button>
        <button className='nextpagination' onClick={this.NextClick}>Next</button>
        </>
        )
    }
}

export default Allstudents