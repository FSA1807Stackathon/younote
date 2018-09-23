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
      console.log("RES", res)
      const lecture = res.data
      dispatch(getSingleLecture(lecture))
    }
  } catch (error) {
    console.log(error)
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
