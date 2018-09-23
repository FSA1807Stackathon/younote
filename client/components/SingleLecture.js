import React, {Component} from 'react'
import YouTube from 'react-youtube'
import {connect} from 'react-redux'
import {fetchSingleLectureThunk, postNote} from '../store/lectures'

class SingleLecture extends Component {

  constructor(){
    super()
    this.state = {
      player_head_pos: ""
    }
    this.onPause = this.onPause.bind(this)
  }

  componentDidMount(){
    const lectureId = Number(this.props.match.params.lectureId)
    this.props.getSingleLecture(lectureId)
  }

  onPause(evt){
    const totalSeconds = evt.target.getCurrentTime().toFixed(0)
    const minutes = (totalSeconds / 60).toFixed(0)+""
    const seconds = (totalSeconds % 60)
    this.setState({
      player_head_pos:
      minutes + ":" + ((seconds < 10) ? "0"+seconds : seconds)
    })
  }

  render(){
    if(!this.props.lecture.notes) return null;
    const opts = {
      height: '390',
      width: '640',
    };

    const strArr = this.state.player_head_pos.split(":")
    const minute = Number(strArr[0]) * 60;
    const seconds = Number(strArr[1])
    console.log(minute + seconds);

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
          <input type="text" name="player_head_pos" value={this.state.player_head_pos}/>
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
      let player_head_pos = 0;
      if(evt.target.player_head_pos.value){
        const strArr = evt.target.player_head_pos.value.split(":")
        const minute = Number(strArr[0]) * 60;
        const seconds = Number(strArr[1])
        player_head_pos = minute + seconds
      }
      const note = {
        lectureId: evt.target.lectureId.value,
        player_head_pos: player_head_pos,
        note: evt.target.note.value
      }
      dispatch(postNote(note))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleLecture)



