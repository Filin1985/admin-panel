import styles from "./sort-header.module.scss"
import { useDispatch, useSelector } from "../../services/hooks"
import {
  sortByDate,
  sortByRating,
} from "../../services/slices/getUserDataSlice"

function SortHeader() {
  const { isFilteredByDate, isFilteredByRating } = useSelector(
    (store) => store.userData
  )
  const dispatch = useDispatch()

  const handleDateSort = () => {
    dispatch(sortByDate())
  }

  const handleRatingSort = () => {
    dispatch(sortByRating())
  }

  return (
    <div className={styles.sort}>
      <p className={styles.sort__title}>Сортировка:</p>
      <button
        className={
          isFilteredByDate ? styles.sort__button_active : styles.sort__button
        }
        type="button"
        onClick={handleDateSort}
      >
        Дата регистрации
      </button>
      <button
        className={
          isFilteredByRating ? styles.sort__button_active : styles.sort__button
        }
        type="button"
        onClick={handleRatingSort}
      >
        Рейтинг
      </button>
    </div>
  )
}

export default SortHeader
