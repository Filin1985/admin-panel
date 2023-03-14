import React from "react"
import styles from "./pagination.module.scss"

interface IPagintor {
  postsPerPage: number
  totalPosts: number
  paginate: (number: number) => void
  previousPage: () => void
  nextPage: () => void
  active: number
}

const Paginate = ({
  postsPerPage,
  totalPosts,
  paginate,
  previousPage,
  nextPage,
  active,
}: IPagintor) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <ul className={styles.pagination_container}>
      <li onClick={previousPage} className={styles.pagination_item}>
        {"<--"}
      </li>
      {pageNumbers.map((number) => (
        <li
          key={number}
          onClick={() => paginate(number)}
          className={
            active === number
              ? styles.pagination_item_active
              : styles.pagination_item
          }
        >
          {number}
        </li>
      ))}
      <li onClick={nextPage} className={styles.pagination_item}>
        {"-->"}
      </li>
    </ul>
  )
}

export default Paginate
