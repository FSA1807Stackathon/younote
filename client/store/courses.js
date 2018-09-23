import axios from 'axios'

// ACTION TYPES
const GET_ALL_COURSES = 'GET_ALL_COURSES'
const GET_SINGLE_COURSE = 'GET_SINGLE_COURSE'

// INITIAL STATE
const initialCourseState = {
  allCourses: [], // contain a list of courses
  allLectures: [] // contain a list of lectures => so later needs to be changed to []
}

// ACTION CREATORS
const getAllCourses = courses => ({
  type: GET_ALL_COURSES,
  courses
})

const getSingleCourse = lectures => ({
  type: GET_SINGLE_COURSE,
  lectures
})

// THUNKS: All thunks named with 'fetch'
export const fetchAllCoursesThunk = () => async dispatch => {
  try {
    const {data: user} = await axios.get('/auth/me')
    if (user) {
      const res = await axios.get(`/api/users/${user.id}/courses`)
      const {courses} = res.data;
      dispatch(getAllCourses(courses))
    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchSingleCourseThunk = (courseId) => async dispatch => {
  try {
    const {data: user} = await axios.get('/auth/me')
    if (user){
      const res = await axios.get(`/api/users/${user.id}/courses/${courseId}`)
      const {lectures} = res.data
      dispatch(getSingleCourse(lectures))
    }
  } catch (error) {
    console.log(error)
  }
}

export const createCourse = (name) => async dispatch => {
  let user
  try {
    const res = await axios.get('/auth/me');
    user = res.data;

    if(!user){
      throw Error('Logged-out user is not allowed to create a course');
    }else{
      const course ={
        userId: user.id,
        name,
      }

      // create a new course with the data given.
      await axios.post(`/api/courses`, course);
    }
  }catch(err){
    console.log(err);
    throw Error('Failed to create a new course');
  }finally{
    // fetch all the courses of the current user.
    const res = await axios.get(`/api/users/${user.id}/courses`)
    const {courses} = res.data;
    dispatch(getAllCourses(courses))
  }
}

export const createLecture = (lecture) => async dispatch => {
  let user
  try {
    const res = await axios.get('/auth/me');
    user = res.data;

    if(!user) throw Error('Logged-out user is not allowed to create a course')
    // create a new course with the data given.
    lecture.userId = user.id
    await axios.post(`/api/lectures`, lecture);
  }catch(err){
    console.log(err);
    // throw Error('Failed to create a new course');
  }finally{
    // fetch all the courses of the current user.
    const courseId = lecture.courseId
    const res = await axios.get(`/api/users/${user.id}/courses/${courseId}`)
    const {lectures} = res.data;
    dispatch(getSingleCourse(lectures))
  }
}


// REDUCER
const courses = (state = initialCourseState, action) => {
  switch (action.type) {
    case GET_ALL_COURSES:
      return {...state, allCourses: action.courses}
    case GET_SINGLE_COURSE:
      return {...state, allLectures: action.lectures}
    default:
      return state
  }
}

export default courses
