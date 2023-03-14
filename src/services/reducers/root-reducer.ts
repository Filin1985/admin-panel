import { combineReducers } from "redux"
import getUserDataSlice from "../slices/getUserDataSlice"

export const rootReducer = combineReducers({
  userData: getUserDataSlice,
})

export type RootState = ReturnType<typeof rootReducer>
