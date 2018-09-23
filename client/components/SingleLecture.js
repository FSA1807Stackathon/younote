import React, {Component} from 'react'
import YouTube from 'react-youtube'

class SingleLecture extends Component {
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
      </div>
    )
  }
}

export default SingleLecture



