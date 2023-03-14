import { ChangeEvent, useState, useEffect } from "react"
import { SearchIcon } from "../../svg/SearchIcon"
import { ResetIcon } from "../../svg/ResetIcon"
import { useSelector, useDispatch } from "../../services/hooks"
import {
  clearSortAndFilter,
  filterByValue,
} from "../../services/slices/getUserDataSlice"
import styles from "./search.module.scss"

function Search() {
  const [filterValue, setFilterValue] = useState("")
  const dispatch = useDispatch()
  const { isFilteredByDate, isFilteredByRating } = useSelector(
    (store) => store.userData
  )
  const handleClearFilter = () => {
    dispatch(clearSortAndFilter())
  }

  const filterByInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setFilterValue(e.target.value)
  }

  useEffect(() => {
    dispatch(filterByValue({ value: filterValue }))
  }, [filterValue])

  return (
    <div className={styles.search}>
      <div className={styles.search__input}>
        <SearchIcon />
        <input
          value={filterValue}
          className={styles.search__text}
          onChange={filterByInput}
          type="text"
          placeholder="Поиск по имени или e-mail"
        />
      </div>
      <div className={styles.search__reset}>
        {(isFilteredByDate || isFilteredByRating) && (
          <>
            <ResetIcon />
            <button
              className={styles.search__button}
              type="button"
              onClick={handleClearFilter}
            >
              Очистить фильтр
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Search
