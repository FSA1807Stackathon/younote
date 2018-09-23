import React, {Component} from 'react'
import YouTube from 'react-youtube'
import {connect} from 'react-redux'
import {fetchSingleLectureThunk} from '../store/lectures'

class SingleLecture extends Component {

  componentDidMount(){
    const lectureId = Number(this.props.match.params.lectureId)
    this.props.getSingleLecture(lectureId)
  }

  render(){
    const opts = {
      height: '390',
      width: '640',
    };
    return (
      <div>
        <YouTube
          videoId={this.props.lecture.youtube_key}
          opts={opts}
        />
      </div>
    )
  }
}

const mapState = state => {
  return {
    lecture: state.lectures.selected
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleLecture: (id) => dispatch(fetchSingleLectureThunk(id))
  }
}

export default connect(mapState, mapDispatch)(SingleLecture)



