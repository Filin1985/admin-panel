import React, { useEffect, FC, ReactNode } from "react"
import styles from "./modal.module.scss"
import ReactDOM from "react-dom"
import ModalOverlay from "../modal-overlay/ModalOverlay"

interface IModalProps {
  closeModal: () => void
  children: ReactNode
  withTitle?: boolean
}

const ESC_KEYCODE = 27
const modalSelector = document.querySelector("#react-modals") as HTMLElement

const Modal: FC<IModalProps> = ({ children, closeModal }) => {
  const closeByEsc = (e: KeyboardEvent) => {
    if (e.keyCode === ESC_KEYCODE) {
      closeModal()
    }
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal__container}>{children}</div>
      <ModalOverlay onClick={closeModal} />
    </>,
    modalSelector
  )
}

export default Modal
