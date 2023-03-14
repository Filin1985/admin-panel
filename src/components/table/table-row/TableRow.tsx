import React from "react"
import { DeleteIcon } from "../../../svg/DeleteIcon"
import styles from "../table.module.scss"
import { IUsersInfo } from "../../../services/slices/getUserDataSlice"
import { useDispatch } from "../../../services/hooks"
import { deleteUser } from "../../../services/slices/getUserDataSlice"

export interface IUser {
  user: IUsersInfo
}

const TableRow: React.FC<IUsersInfo> = ({
  id,
  username,
  email,
  registration_date,
  rating,
}) => {
  const dispatch = useDispatch()

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id))
  }

  return (
    <tr>
      <td className={styles.table__row}>{username}</td>
      <td className={styles.table__row}>{email}</td>
      <td className={styles.table__row}>{registration_date}</td>
      <td className={styles.table__row}>{rating}</td>
      <td className={styles.table__row}>
        <DeleteIcon onClick={() => handleDelete(id)} />
      </td>
    </tr>
  )
}

export default TableRow
