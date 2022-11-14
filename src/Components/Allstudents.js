import React, { Component } from 'react'
import axios from "axios"
import PropTypes from 'prop-types'
import '../App.css';
import _ from "lodash"
import { CSVLink } from 'react-csv'
import Export from './Export';

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
            page: null,
            Number: 10,
            students: null,
            paginate: null,
            currentPage: 1,
            text: '',
            suggestions: [],
        }
    }

    componentDidMount() {
        axios.get(`/Department/${this.props.url}`)
            .then((response) => {
                this.setState({ students: response.data })
                if (this.state.students != null) {
                    this.setState({ page: Math.ceil(this.state.students.length / this.state.Number) })
                }
                this.setState({ paginate: _(response.data).slice(0).take(this.state.Number).value() })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    delete = (ID) => {
        axios.delete(`/Department/delete?Id=${ID}`)
        axios.get(`/Department/${this.props.url}`)
            .then((response) => {
                this.setState({ students: response.data })
                if (this.state.students != null) {
                    this.setState({ page: Math.ceil(this.state.students.length / this.state.Number) })
                }
                this.setState({ paginate: _(response.data).slice(0).take(this.state.Number).value() })
            })
            .catch((error) => {
                console.log(error)
            })
    }


    pagination = (pageNo) => {
        this.setState({ currentPage: pageNo })
        let startIndex = (pageNo - 1) * this.state.Number
        let paginated = _(this.state.students).slice(startIndex).take(this.state.Number).value()
        this.setState({ paginate: paginated })
    }

    suggBtn = (text) => {
        let matches = []
        if (text.length > 0) {
            matches = this.state.students.filter(user => {
                const regex = new RegExp(`${text}`, "i");
                return user.firstname.match(regex)
            })
        }
        this.setState({ suggestions: matches })
        this.setState({ text: text })
    }

    acceptSugg = (text) => {
        this.setState({ text })
        this.setState({ suggestions: [] })
    }

    handleSearch = (e, criteria,team) => {
        e.preventDefault()
        axios.get(`/Department/student?${criteria}=${team}`)
            .then((response) => {
                this.setState({ students: response.data })
                if (this.state.students != null) {
                    this.setState({ page: Math.ceil(this.state.paginate.length / this.state.Number) })
                }
                this.setState({ paginate: _(response.data).slice(0).take(this.state.Number).value() })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    player = (e, playerName) => {
        e.preventDefault()
        axios.get(`/Department/student?firstname=${playerName}`)
            .then((response) => {
                this.setState({ students: response.data })
                if (this.state.students != null) {
                    this.setState({ page: Math.ceil(this.state.paginate.length / this.state.Number) })
                }
                this.setState({ paginate: _(response.data).slice(0).take(this.state.Number).value() })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        let pageCount = _.range(1, this.state.page + 1)
        if (this.state.students != null) {
            return <>
                <nav className="navbar navbar-expand-lg bg-light" style={{ marginTop: '20px', width: '1220px', marginLeft: '290px' }}>
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Export excelData={this.state.paginate} fileName={'Excel Export'} />
                                </li>
                                <li className="nav-item">
                                    <CSVLink data={this.state.paginate} className='btn btn-success' style={{ marginLeft: "10px" }} >Export data in csv</CSVLink>
                                </li>
                            </ul>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" style={{ width: '350px' }} placeholder="Search by Player Name..." aria-label="Search"
                                    onChange={(e) => this.suggBtn(e.target.value)} value={this.state.text} />
                            </form>
                        </div>
                    </div>
                </nav>

                <div className="searchList" style={{ zIndex: "revert", position: "absolute" }}>
                    {this.state.suggestions && this.state.suggestions.map((suggestion, i) =>
                        <div key={i} onClick={(e) => this.player(e, `${suggestion.firstname}`)} className="suggestions">
                            {suggestion.firstname + " " + suggestion.lastname}
                        </div>
                    )}
                </div>

                <div className="d-flex" style={{ width: "400px", marginLeft: "1100px", marginTop: "20px", padding: '20px'}}>
                    <select className="form-select" aria-label="Default select example" >
                        <option defaultValue>Filter By Clubs</option>
                        <option value="1" onClick={(e) => this.handleSearch(e, "department","PSG")}>Paris Saint German</option>
                        <option value="2" onClick={(e) => this.handleSearch(e,"department", "FC Barcelona")}>FC Barcelona</option>
                        <option value="3" onClick={(e) => this.handleSearch(e, "department","Bayern Munich")}>Bayern Munich</option>
                        <option value="4" onClick={(e) => this.handleSearch(e, "department","Man United")}>Man United</option>
                        <option value="5" onClick={(e) => this.handleSearch(e, "department","Bengaluru FC")}>Bengaluru FC</option>
                        <option value="6" onClick={(e) => this.handleSearch(e, "department","Mumbai FC")}>Mumbai FC</option>
                        <option value="7" onClick={(e) => this.handleSearch(e, "department","Juventus FC")}>Juventus FC</option>
                        <option value="8" onClick={(e) => this.handleSearch(e, "department","Real Madrid")}>Real Madrid</option>
                        <option value="9" onClick={(e) => this.handleSearch(e, "Tottenham")}>Tottenham</option>
                        <option value="10" onClick={(e) => this.handleSearch(e, "department","Man City")}>Man City</option>
                        <option value="11" onClick={(e) => this.handleSearch(e, "department","Atletico Madrid")}>Atletico Madrid</option>
                        <option value="12" onClick={(e) => this.handleSearch(e, "department","Chelsea FC")}>Chelsea FC</option>
                        <option value="13" onClick={(e) => this.handleSearch(e, "department","A.C.Milan")}>A.C.Milan</option>
                        <option value="14" onClick={(e) => this.handleSearch(e, "department","Inter Milan")}>Inter Milan</option>
                    </select>

                    <select className="form-select" aria-label="Default select example" style={{  marginLeft: '20px'}}>
                        <option defaultValue>Filter By AGE</option>
                        <option value="1" onClick={(e) => this.handleSearch(e,"age",26)}>26</option>
                        <option value="2" onClick={(e) => this.handleSearch(e, "age", 27)}>27</option>
                        <option value="3" onClick={(e) => this.handleSearch(e, "age", 28)}>28</option>
                        <option value="4" onClick={(e) => this.handleSearch(e, "age", 29)}>29</option>
                        <option value="5" onClick={(e) => this.handleSearch(e, "age", 30)}>30</option>
                        <option value="6" onClick={(e) => this.handleSearch(e, "age", 31)}>31</option>
                        <option value="7" onClick={(e) => this.handleSearch(e, "age", 32)}>32</option>
                        <option value="8" onClick={(e) => this.handleSearch(e, "age", 33)}>33</option>
                        <option value="9" onClick={(e) => this.handleSearch(e, "age", 34)}>34</option>
                        <option value="10" onClick={(e) => this.handleSearch(e, "age", 35)}>35</option>
                        <option value="11" onClick={(e) => this.handleSearch(e, "age", 36)}>36</option>
                        <option value="12" onClick={(e) => this.handleSearch(e, "age", 37)}>37</option>
                        <option value="13" onClick={(e) => this.handleSearch(e, "age", 38)}>38</option>
                        <option value="14" onClick={(e) => this.handleSearch(e, "age", 39)}>39</option>
                    </select>
                </div>

                <table className='table' style={{ marginLeft: "290px", marginTop: "60px", width: "1200px" }}>
                    <thead style={{ borderWidth: "3px", textAlign: "center" }}>
                        <tr>
                            <th>Select</th>
                            <th>ID</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Age</th>
                            <th>Department</th>
                        </tr>
                    </thead>
                    <tbody style={{ borderWidth: "3px", textAlign: "center" }}>
                        {this.state.paginate.map((student, index) => {
                            return <tr key={index}>
                                <td><input type="checkbox" value={student.id} /></td>
                                <td>{student.id}</td>
                                <td>{student.firstname}</td>
                                <td>{student.lastname}</td>
                                <td>{student.age}</td>
                                <td>{student.department}</td>
                                <td style={{ width: "20px" }}><button onClick={() => this.delete(student.id)}>Delete</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <nav className='d-flex justify-content-center'>
                    <ul className='pagination' style={{ marginTop: "30px", zIndex: "revert", position: "absolute", cursor: "pointer" }}>
                        {
                            pageCount.map((pages, key) => {
                                return <li className={pages === this.state.currentPage ? "page-item active" : "page-item"} key={key}>
                                    <p className='page-link' onClick={() => this.pagination(pages)}>{pages}</p>
                                </li>
                            })
                        }
                    </ul>
                </nav>
            </>
        }
    }
}

export default Allstudents