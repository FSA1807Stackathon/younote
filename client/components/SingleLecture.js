import React, {Component} from 'react'
import YouTube from 'react-youtube'
import {connect} from 'react-redux'
import {fetchSingleLectureThunk, postNote} from '../store/lectures'

class SingleLecture extends Component {

  componentDidMount(){
    const lectureId = Number(this.props.match.params.lectureId)
    this.props.getSingleLecture(lectureId)
  }

  onPause(evt){
    console.log(evt.target.getCurrentTime())
  }

  render(){
    if(!this.props.lecture.notes) return null;
    console.log("PROPS", this.props.lecture)
    const opts = {
      height: '390',
      width: '640',
    };
    return (
      <div>
        <YouTube
          videoId={this.props.lecture.youtube_key}
          opts={opts}
          onPause={this.onPause}
        />
        {
          this.props.lecture.notes.map(note => (
            <div key={note.id}>
              <h2>{note.player_head_pos}</h2>
              <p>{note.note}</p>
            </div>
          ))
        }
        <form onSubmit={this.props.handleSubmit}>
          <input type="hidden" name="lectureId" value={this.props.match.params.lectureId} />
          <label htmlFor="player_head_pos">Paused Time:</label>
          <input type="text" name="player_head_pos" />
          <br />
          <label htmlFor="note">Note:</label>
          <input type="text" name="note" />
          <br />

          <button type="submit">Save</button>
        </form>
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
    getSingleLecture: (id) => dispatch(fetchSingleLectureThunk(id)),
    handleSubmit: async (evt) => {
      evt.preventDefault()
      const note = {
        lectureId: evt.target.lectureId.value,
        player_head_pos: evt.target.player_head_pos.value,
        note: evt.target.note.value
      }
      dispatch(postNote(note))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleLecture)



