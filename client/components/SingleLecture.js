import React, {Component} from 'react'
import YouTube from 'react-youtube'
import {Editor} from '@tinymce/tinymce-react'

class SingleLecture extends Component {
  constructor(props) {
    super(props);

    this.state = { content: '' };
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  handleEditorChange(content) {
    this.setState({ content });
  }

  render(){
    const opts = {
      height: '390',
      width: '640',
    };
    return (
      <div>
        <YouTube
          videoId="mvA6YuJ6c_Y"
          opts={opts}
        />

         <Editor value={this.state.content} onEditorChange={this.handleEditorChange} />
      </div>
    )
  }
}

export default SingleLecture



