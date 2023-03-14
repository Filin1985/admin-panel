import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getUserDataApi } from "../../api"

export interface IUsersInfo {
  id: string
  username: string
  email: string
  registration_date: string
  rating: number
}

export interface IUserDataSlice {
  getUserDataRequest: boolean
  getUserDataSuccess: boolean
  getUserDataError: boolean
  isFilteredByDate: boolean
  isFilteredByRating: boolean
  users: IUsersInfo[]
  dateFilteredUser: IUsersInfo[]
  ratingFilteredUser: IUsersInfo[]
}

const initialState: IUserDataSlice = {
  getUserDataRequest: false,
  getUserDataSuccess: false,
  getUserDataError: false,
  isFilteredByDate: false,
  isFilteredByRating: false,
  dateFilteredUser: [],
  ratingFilteredUser: [],
  users: [],
}

export const getUserInfo = createAsyncThunk(
  "userInfo/getUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserDataApi()
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getUserInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    sortByDate: (state) => {
      state.isFilteredByDate = true
      state.isFilteredByRating = false
    },
    sortByRating: (state) => {
      state.isFilteredByDate = false
      state.isFilteredByRating = true
    },
    clearSortAndFilter: (state) => {
      state.isFilteredByRating = false
      state.isFilteredByDate = false
    },
    filterByValue: (state, action) => {
      let value: string = action.payload.value
      return {
        ...state,
        users:
          [...state.users].filter((user) =>
            user.username.toLowerCase().includes(value.toLowerCase())
          ) ||
          [...state.users].filter((user) =>
            user.email.toLowerCase().includes(value.toLowerCase())
          ),
      }
    },
    deleteUser: (state, action) => {
      state.dateFilteredUser = state.dateFilteredUser.filter(
        (user) => user.id !== action.payload
      )
      state.ratingFilteredUser = state.ratingFilteredUser.filter(
        (user) => user.id !== action.payload
      )
      state.users = state.users.filter((user) => user.id !== action.payload)
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserInfo.pending, (state) => {
      state.getUserDataRequest = true
      state.getUserDataSuccess = false
      state.getUserDataError = false
    })
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.getUserDataRequest = false
      state.getUserDataSuccess = true
      state.getUserDataError = false
      state.users = [...action.payload]
      state.dateFilteredUser = [
        ...action.payload.sort(function (userA, userB) {
          if (userA.registration_date > userB.registration_date) {
            return 1
          }
          if (userA.registration_date < userB.registration_date) {
            return -1
          }
          return 0
        }),
      ]
      state.ratingFilteredUser = [
        ...action.payload.sort(function (userA, userB) {
          return userA.rating - userB.rating
        }),
      ]
    })
    builder.addCase(getUserInfo.rejected, (state) => {
      state.getUserDataRequest = false
      state.getUserDataSuccess = false
      state.getUserDataError = true
    })
  },
})

export default getUserInfoSlice.reducer
export const {
  sortByDate,
  sortByRating,
  clearSortAndFilter,
  filterByValue,
  deleteUser,
} = getUserInfoSlice.actions
