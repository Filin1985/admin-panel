import {useState} from 'react'
import styles from './table.module.scss'
import TableRow from './table-row/TableRow'
import Paginate from '../pagination/Pagination'
import {useSelector} from '../../services/hooks'

const PAGE_SIZE = 5

const Table = () => {
  const {
    isFilteredByDate,
    isFilteredByRating,
    dateFilteredUser,
    ratingFilteredUser,
    filteredUsers,
  } = useSelector((store) => store.userData)
  const {users} = useSelector((store) => store.userData)

  const [currentPage, setCurrentPage] = useState(1)
  const [active, setActive] = useState(1)
  const [postsPerPage] = useState(PAGE_SIZE)

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentUsers = isFilteredByDate
    ? dateFilteredUser.slice(indexOfFirstPost, indexOfLastPost)
    : isFilteredByRating
    ? ratingFilteredUser.slice(indexOfFirstPost, indexOfLastPost)
    : filteredUsers.slice(indexOfFirstPost, indexOfLastPost)

  console.log(currentUsers)

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    setActive(pageNumber)
  }

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
      setActive(currentPage - 1)
    }
  }

  const nextPage = () => {
    if (currentPage !== Math.ceil(users.length / postsPerPage)) {
      setCurrentPage(currentPage + 1)
      setActive(currentPage + 1)
    }
  }

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.table__head}>Username</th>
            <th className={styles.table__head}>E-mail</th>
            <th className={styles.table__head}>Registration date</th>
            <th className={styles.table__head}>Rating</th>
            <th className={styles.table__head}></th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 && (
            <>
              {currentUsers.map((user) => (
                <TableRow
                  key={user.id}
                  id={user.id}
                  username={user.username}
                  email={user.email}
                  registration_date={user.registration_date}
                  rating={user.rating}
                />
              ))}
            </>
          )}
        </tbody>
      </table>
      <Paginate
        postsPerPage={postsPerPage}
        totalPosts={users.length}
        paginate={paginate}
        previousPage={previousPage}
        nextPage={nextPage}
        active={active}
      />
    </>
  )
}

export default Table
