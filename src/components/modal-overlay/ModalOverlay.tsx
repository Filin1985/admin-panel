import { FC } from "react"
import styles from "./modal-overlay.module.scss"

interface IOverlayClick {
  onClick: () => void
}

export const ModalOverlay: FC<IOverlayClick> = ({ onClick }) => {
  return <div className={styles.modal__overlay} onClick={onClick} />
}

export default ModalOverlay
