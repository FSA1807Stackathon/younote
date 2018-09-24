import React, {Component} from 'react'
import ContentEditable from 'react-contenteditable'
import { connect } from 'react-redux'
import { updateNoteThunk, deleteNoteThunk} from '../store/lectures'
import Button from '@material-ui/core/Button'

class NoteText extends Component {

  constructor(props){
    super(props)
    this.state = {
      html: props.note.note
    }
    this.handleChange = this.handleChange.bind(this)
    this.updateNote = this.updateNote.bind(this)
  }

  handleChange(evt){
    this.setState({
      html: evt.target.value
    })
  }

  updateNote(id, lectureId){
    this.props.updateNote(id, lectureId, this.state.html);
  }


  render(){
    const note = this.props.note;
    return (
      <div>
        <ContentEditable
          html={this.state.html}
          disabled={false}
          onChange={this.handleChange}
          />
        {
        //<Button color="primary" size="small" onClick={() => this.props.updateNote(note.id)}>Save Changes</Button>
        }
        <Button color="primary" variant="outlined" size="small" onClick={() => this.updateNote(note.id, note.lectureId)}>Save Changes</Button>
        <Button color="primary" variant="outlined" size="small" onClick={() => this.props.deleteNote(note.id, note.lectureId)}>Delete</Button>
      </div>
    )
  }

}

const mapDispatch = dispatch => {
  return {
    updateNote: (id, lectureId, noteText) => dispatch(updateNoteThunk(id, lectureId, noteText)),
    deleteNote: (id, lectureId) => dispatch(deleteNoteThunk(id, lectureId))
  }
}

export default connect(null, mapDispatch)(NoteText);
