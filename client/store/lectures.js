import axios from 'axios'

// ACTION TYPES
const GET_SINGLE_LECTURE = 'GET_SINGLE_LECTURE'

// INITIAL STATE
const initialLectureState = {
  selected: {}
}

// ACTION CREATORS
const getSingleLecture = lecture => ({
  type: GET_SINGLE_LECTURE,
  lecture
})

// THUNK
export const fetchSingleLectureThunk = (lectureId) => async dispatch => {
  try {
    const {data: user} = await axios.get('/auth/me')
    if (user){
      const res = await axios.get(`/api/lectures/${lectureId}`)
      const lecture = res.data
      dispatch(getSingleLecture(lecture))
    }
  } catch (error) {
    console.log(error)
  }
}

export const postNote = (note) => async dispatch => {
  try {
    const {data: user} = await axios.get("/auth/me")
    if(!user) throw Error('Logged-out user is not allowed to create a course')
    await axios.post(`/api/notes`, note);
  }catch(err){
    console.log(err);
    // throw Error('Failed to create a new course');
  }finally{
    // fetch all the courses of the current user.
    const lectureId = note.lectureId
    const {data} = await axios.get(`/api/lectures/${lectureId}`)
    dispatch(getSingleLecture(data))
  }
}

// REDUCER
const lectures = (state = initialLectureState, action) => {
  switch (action.type) {
    case GET_SINGLE_LECTURE:
      return {...state, selected: action.lecture}
    default:
      return state
  }
}

export default lectures
