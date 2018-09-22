import React, {Component} from 'react'
import {connect} from 'react-redux'
import { fetchAllCoursesThunk, createCourse } from '../store/courses'
import CourseCard from './CourseCard'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import ClassCreateModal from './ClassCreateModal'

// AllCourses Component: ONLY APPLIES TO USERS WHO ARE LOGGED IN
class AllCourses extends Component {

  constructor(props){
    super(props);

    this.state={
      showModal: false
    }

    this.createCourse = this.createCourse.bind(this);
  }

  showModal = () => {
    this.setState({showModal: true});
  }

  hideModal = () => {
    this.setState({showModal: false});
  }

  componentDidMount(){
    this.props.getAllCourses()
  }

  createCourse(evt){
    try{
      evt.preventDefault();
      this.props.createCourse(evt.target.coursename.value);
      this.hideModal();
    }catch(err){
      console.log(err);
    }
  }

  render(){
    const {allCourses} =  this.props.courses
    return (
      <div>
        {
          allCourses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
          />))
        }

        <Button variant="fab" color="secondary" aria-label="Add" onClick={this.showModal}>
          <AddIcon />
        </Button>

        <ClassCreateModal show={this.state.showModal} handleClose={this.hideModal}>
          <form onSubmit={this.createCourse}>
            <div>
              <h1>Create a Course</h1>
            </div>
            <div>
              <label htmlFor="coursename">Name</label>
              <input name="coursename" type="text" />
            </div>
            <Button variant="outlined" color="primary" size="small" type="submit"> Create
            </Button>
            <Button color="primary" variant="outlined" size="small" aria-label="Add" onClick={this.handleClose} type="button"> Cancel </Button>
          </form>
        </ClassCreateModal>

      </div>
    )
  }
}

const mapState = state => {
  return {
    courses: state.courses
  }
}

const mapDispatch = dispatch => {
  return {
    getAllCourses: () => dispatch(fetchAllCoursesThunk()),
    createCourse: (name) => dispatch(createCourse(name)),
  }
}

export default connect(mapState, mapDispatch)(AllCourses)
