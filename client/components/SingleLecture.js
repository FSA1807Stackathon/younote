import React, {Component} from 'react'
import YouTube from 'react-youtube'
import {connect} from 'react-redux'
import {fetchSingleLectureThunk, postNote, deleteNoteThunk} from '../store/lectures'
import NoteText from './NoteText'

class SingleLecture extends Component {

  constructor(){
    super()

    this.state = {
      player_head_pos: 0,
      posToPlay: 0,
      noteText: ''
    }

    this.onPause = this.onPause.bind(this)
    this.changePlayerHeadPos = this.changePlayerHeadPos.bind(this);
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
      player_head_pos: minutes + ":" + ((seconds < 10) ? "0"+seconds : seconds)
    })
  }

  changePlayerHeadPos(posToPlay){
    this.setState({
      ...this.state,
      posToPlay,
    })
  }

  render(){
    if(!this.props.lecture.notes) return null;
    const opts = {
      height: '390',
      width: '640',
      playerVars:{
        start: this.state.posToPlay,
        autoplay: 1
      }
    };

    for(let note of this.props.lecture.notes){
      let headPos = note.player_head_pos;

      let hh = (headPos / 3600).toFixed(0);
      let mm = ((headPos % 3600)/60).toFixed(0);
      let ss = ((headPos % 3600)%60);
      if(hh < 10) hh = `0${hh}`;
      if(mm < 10) mm = `0${mm}`;
      if(ss < 10) ss = `0${ss}`;
      note.hhmmss = `${hh}:${mm}:${ss}`;
    }

    return (
      <div className="single-lecture">
        <YouTube
          videoId={this.props.lecture.youtube_key}
          opts={opts}
          onPause={this.onPause}
        />
        <div className="lecture-notes">
          {
            this.props.lecture.notes.map(note => (
              <div className="note-time" key={note.id}>
                  <div className="note-padding" >
                    <a href="#" onClick={() => this.changePlayerHeadPos(note.player_head_pos)}>{note.hhmmss}</a>
                    &nbsp;
                    <NoteText note={note} />
                  </div>
              </div>
            ))
          }
          <div className="notes">
            <form onSubmit={this.props.handleSubmit}>
              <input type="hidden" name="lectureId" value={this.props.match.params.lectureId} />
              <label htmlFor="player_head_pos">Paused Time:</label>
              <input type="text" name="player_head_pos" value={this.state.player_head_pos}/>
              <br />
              <label htmlFor="note">Note:</label>
              <textarea name="note"/>
              <br />

              <button type="submit">Save</button>
            </form>
          </div>

        </div>
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
    },
  }
}

export default connect(mapState, mapDispatch)(SingleLecture)



