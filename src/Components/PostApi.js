import axios from 'axios';
import React from 'react'
import { Component } from 'react';
import '../App.css';

class PostApi extends Component {

  constructor() {
    super()
    this.state = {
      id:"",
      firstname: "",
      lastname: "",
      age: "",
      department: "",
    }
  }

  postData = (e) => {
    e.preventDefault();
    axios.post(`/Department/admission?id=${this.state.id}&firstname=${this.state.firstname}&lastname=${this.state.lastname}&age=${this.state.age}&department=${this.state.department}`, {
      id: this.state.id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      age: this.state.age,
      department: this.state.department
    }).then(res => console.log('Posting Data', res))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className='Adstu'>
        <h3>Enter Details below to get admission in the college</h3>
        <form>
          <div className="adform">
            <label htmlFor="exampleInputEmail1" className="form-label">ID</label>
            <input type="text" className="form-control" value={this.state.id} onChange={(e) => { this.setState({ id: e.target.value }) }} />
          </div>
          <div className="adform">
            <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
            <input type="text" className="form-control" value={this.state.firstname} onChange={(e) => { this.setState({ firstname: e.target.value }) }} />
          </div>
          <div className="adform">
            <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
            <input type="text" className="form-control" value={this.state.lastname} onChange={(e) => { this.setState({ lastname: e.target.value }) }} />
          </div>
          <div className="adform">
            <label htmlFor="exampleInputEmail1" className="form-label">Age</label>
            <input type="text" className="form-control" value={this.state.age} onChange={(e) => { this.setState({ age: e.target.value }) }} />
          </div>
          <div className="adform">
            <label htmlFor="exampleInputEmail1" className="form-label">Department</label>
            <input type="text" className="form-control" value={this.state.department} onChange={(e) => { this.setState({ department: e.target.value }) }} />
          </div>
          <button onClick={(e)=>{this.postData(e)}}>Submit</button>
        </form>
      </div>
    )
  }
}

export default PostApi