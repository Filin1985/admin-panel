import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getUserDataApi} from '../../api'

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
  filteredUsers: IUsersInfo[]
  appliedFilters: string[]
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
  filteredUsers: [],
  appliedFilters: [],
}

export const getUserInfo = createAsyncThunk(
  'userInfo/getUserInfo',
  async (_, {rejectWithValue}) => {
    try {
      const response = await getUserDataApi()
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getUserInfoSlice = createSlice({
  name: 'userInfo',
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
      let filteredValues = state.users.filter((user) =>
        user.username.toLowerCase().includes(value.toLowerCase())
      )
      let appliedFilters = state.appliedFilters

      if (value) {
        appliedFilters = addFilterIfNotExists('search', appliedFilters)
        state.filteredUsers = filteredValues
      } else {
        appliedFilters = removeFilter('search', appliedFilters)
        if (appliedFilters.length === 0) {
          state.filteredUsers = state.users
        }
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
      state.filteredUsers = [...action.payload]
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

function addFilterIfNotExists(filter: string, appliedFilters: string[]) {
  let index = appliedFilters.indexOf(filter)
  if (index === -1) appliedFilters.push(filter)

  return appliedFilters
}

function removeFilter(filter: string, appliedFilters: string[]) {
  let index = appliedFilters.indexOf(filter)
  appliedFilters.splice(index, 1)
  return appliedFilters
}

function sortUsers(field: keyof IUsersInfo) {
  return (a: IUsersInfo, b: IUsersInfo) => (a[field] > b[field] ? 1 : -1)
}
