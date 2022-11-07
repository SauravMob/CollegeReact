import axios from 'axios';
import React from 'react'
import { Component } from 'react';

class PostApi extends Component {

  constructor() {
    super()
    this.state = {
      firstname: "",
      lastname: "",
      age: "",
      department: "",
    }
  }

  postData = (e) => {
    e.preventDefault();
    axios.post(`/Department/admission?firstname=${this.state.firstname}&lastname=${this.state.lastname}&age=${this.state.age}&department=${this.state.department}`, {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      age: this.state.age,
      department: this.state.department
    }).then(res => console.log('Posting Data', res))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className='container my-3'>
        <h3>Enter Details below to get admission in the college</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
            <input type="text" className="form-control" value={this.state.firstname} onChange={(e) => { this.setState({ firstanme: e.target.value }) }} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
            <input type="text" className="form-control" value={this.state.lastname} onChange={(e) => { this.setState({ lastname: e.target.value }) }} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Age</label>
            <input type="text" className="form-control" value={this.state.age} onChange={(e) => { this.setState({ age: e.target.value }) }} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Department</label>
            <input type="text" className="form-control" value={this.state.department} onChange={(e) => { this.setState({ department: e.target.value }) }} />
          </div>
          <button onClick={this.postData()}>Submit</button>
        </form>
      </div>
    )
  }
}

export default PostApi