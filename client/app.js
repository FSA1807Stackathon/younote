import React from 'react'

import {Navbar, Login, Signup} from './components'
import AllCourses from './components/AllCourses'
import SingleCourse from './components/SingleCourse'
import SingleLecture from './components/SingleLecture'

import {Route, Switch} from 'react-router-dom'

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      {/* <Routes /> */}
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/lectures/:lectureId" component={SingleLecture} />
        <Route path="/courses/:courseId" component={SingleCourse} />
        <Route exact path="/courses" component={AllCourses} />
        <Route exact path="/" component={Signup} />
      </Switch>
    </React.Fragment>
  )
}

export default App
