import React, {Component} from 'react'
import YouTube from 'react-youtube'
import {connect} from 'react-redux'
import {fetchSingleLectureThunk, postNote} from '../store/lectures'
import NoteText from './NoteText'
import Button from '@material-ui/core/Button'

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

    let hh = Math.floor(totalSeconds / 3600);
    let mm = Math.floor((totalSeconds % 3600)/60);
    let ss = ((totalSeconds % 3600)%60);
    if(hh < 10) hh = `0${hh}`;
    if(mm < 10) mm = `0${mm}`;
    if(ss < 10) ss = `0${ss}`;
    const hhmmss = `${hh}:${mm}:${ss}`;

    this.setState({
      player_head_pos: hhmmss
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

      let hh = Math.floor(headPos / 3600);
      let mm = Math.floor((headPos % 3600)/60);
      let ss = ((headPos % 3600)%60);
      if(hh < 10) hh = `0${hh}`;
      if(mm < 10) mm = `0${mm}`;
      if(ss < 10) ss = `0${ss}`;
      note.hhmmss = `${hh}:${mm}:${ss}`;
    }

    return (
      <div className="single-lecture">
        <div className="notes">
          <YouTube
          videoId={this.props.lecture.youtube_key}
          opts={opts}
          onPause={this.onPause}
          />
          <form onSubmit={this.props.handleSubmit}>
            <input type="hidden" name="lectureId" value={this.props.match.params.lectureId} />
            <label htmlFor="player_head_pos">Paused Time:</label>
            <input type="text" name="player_head_pos" value={this.state.player_head_pos}/>
            <br />
            <label htmlFor="note">Note:</label>
            <textarea name="note"/>
            <br />

            <Button variant="outlined" color="primary" type="submit">Save Note</Button>
          </form>
        </div>
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
        const hour = Number(strArr[0]) * 3600;
        const minute = Number(strArr[1]) * 60;
        const seconds = Number(strArr[2]);
        player_head_pos = hour + minute + seconds
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



