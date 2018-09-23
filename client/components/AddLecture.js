import React, {Component} from 'react'
import { connect } from 'react-redux'
// import YouTube from 'react-youtube'
// import {Editor} from '@tinymce/tinymce-react'

class AddLecture extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = { content: '' };
  //   this.handleEditorChange = this.handleEditorChange.bind(this);
  // }

  // handleEditorChange(content) {
  //   this.setState({ content });
  // }

  render(){
    // const opts = {
    //   height: '390',
    //   width: '640',
    // };
    return (
      <div>
        <h2>hhihihhiihihihih</h2>
        {/* <form onSubmit={this.props.createLecture}>
          <label htmlFor="title">Note title:</label>
          <input type="text" name="title" />
          <br />
          <label htmlFor="youtube_url">YouTube URL:</label>
          <input type="text" name="youtube_url" />
          <br />

          <button type="submit">Save</button>
        </form> */}
      </div>
    )
  }
}

// const mapDispatch = (dispatch, ownProps) => {
//   return {
//     createLecture: async (evt) => {
//       evt.preventDefault()
//       const lecture = {
//         title: evt.target.title.value,
//         youtube_key: evt.target.youtube_url.value,
//         note: evt.target.note.value
//       }
//       await dispatch(postLecture(lecture)) // post thunk needed
//       ownProps.history.push('/courses/1')
//     }
//   }
// }


export default AddLecture
