import React, {Component} from 'react'
import {connect} from 'react-redux'
import { fetchSingleCourseThunk, createLecture } from '../store/courses'
import LectureListCard from './LectureListCard';
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import LectureCreateModal from './LectureCreateModal'

class SingleCourse extends Component {

  constructor(props){
    super(props);

    this.state={
      showModal: false
    }
  }

  showModal = () => {
    this.setState({showModal: true});
  }

  hideModal = () => {
    this.setState({showModal: false});
  }

  componentDidMount(){
    const courseId = Number(this.props.match.params.courseId)
    this.props.getSingleCourse(courseId)
  }

  render(){
    const course = this.props.course
    return (
      <div>
        {course.map(lecture => (
          <LectureListCard
            key={lecture.id}
            lecture={lecture}
          />
        ))}

        <div className="create-lecture">
          <Button
          variant="fab"
          color="primary"
          aria-label="Add"
          onClick={this.showModal}
          >
            <AddIcon />
          </Button>
        </div>

        <LectureCreateModal show={this.state.showModal} handleClose={this.hideModal}>
          <form onSubmit={this.props.createLecture}>
            <div>
              <p id="modal-error" />
            </div>
            <div>
              <h1>Create a Lecture</h1>
            </div>
            <div>
              <input type="hidden" name="courseId" value={this.props.match.params.courseId} />
              <label htmlFor="lecturename">Name</label>
              <input name="lecturename" type="text" />
              <br />
              <label htmlFor="youtube_key">YouTube URL</label>
              <input name="youtube_key" type="text" />
            </div>
            <Button variant="outlined" color="primary" size="small" type="submit" onClick={this.hideModal}> Create </Button>
            <Button color="primary" variant="outlined" size="small" aria-label="Add" onClick={this.handleClose} type="button"> Cancel </Button>
          </form>
        </LectureCreateModal>
      </div>
    )
  }
}

const mapState = state => {
  return {
    course: state.courses.allLectures
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleCourse(id){
      dispatch(fetchSingleCourseThunk(id))
    },
    createLecture(evt){
      try{
        evt.preventDefault();
        const lecture = {
          courseId: evt.target.courseId.value,
          title: evt.target.lecturename.value,
          youtube_key: evt.target.youtube_key.value
        };
        dispatch(createLecture(lecture))
      }catch(err){
        console.log(err);
        // Add an error message to the modal
      }
    }
  }
}

export default connect(mapState, mapDispatch)(SingleCourse)
