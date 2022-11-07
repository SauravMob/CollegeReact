import React from 'react'
import axios from "axios"
import { Component } from 'react';
import PropTypes from 'prop-types'

class SpecificStudent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: null,
            firstname: "",
            lastname: "",
            age: "",
            department: "",
        }
    }

    componentDidMount() {
        axios.get(`/Department/${this.props.url}`)
            .then((response) => {

                this.setState({
                    id: response.data.id,
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    age: response.data.age,
                    department: response.data.department
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <>
                <div className="Allstu" >
                    <h3>Specific Student Enrolled in the College</h3>
                </div>
                <div className="Allstu" key={this.state.id}>
                    <li>{this.state.firstname}</li>
                    <li>{this.state.lastname}</li>
                    <li>{this.state.age}</li>
                    <li>{this.state.department}</li>
                </div>
            </>
        )
    }
}

SpecificStudent.defaultProps = {
    url: "list"
}

SpecificStudent.propTypes = {
    url: PropTypes.string.isRequired
}

export default SpecificStudent