import { useEffect, useState } from "react"
import Search from "../search/Search"
import SortHeader from "../sort-header/SortHeader"
import Table from "../table/Table"
import styles from "./app.module.scss"
import { useDispatch } from "../../services/hooks"
import { getUserInfo } from "../../services/slices/getUserDataSlice"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Список пользователей</h1>
      <Search />
      <SortHeader />
      <Table />
    </div>
  )
}

export default App
