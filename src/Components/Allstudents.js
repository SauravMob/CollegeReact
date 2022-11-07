import React, { Component } from 'react'
import axios from "axios"
import PropTypes from 'prop-types'

class Allstudents extends Component {

    constructor(props) {
        super(props)
        this.state = {
            students: null
        }
    }

    componentDidMount() {
        axios.get(`/Department/${this.props.url}`)
            .then((response) => {
                this.setState({ students: response.data })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        let stu = null
        if (this.state.students != null) {
            stu = this.state.students.map((element) => {
                return <>
                    <div className="container my-3" key={element.id}>
                        <li type='square'>Student Number {element.id}</li>
                        <li>{element.firstname}</li>
                        <li>{element.lastname}</li>
                        <li>{element.age}</li>
                        <li>{element.department}</li>
                    </div>
                </>
            })
        }
        return (
            <div>{stu}</div>
        )
    }
}

Allstudents.defaultProps = {
    url: "list"
}

Allstudents.propTypes = {
    url: PropTypes.string.isRequired
}

export default Allstudents