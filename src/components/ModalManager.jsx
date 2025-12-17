import { useSelector, useDispatch } from "react-redux"
import { closeModal } from "../redux/modal/slice"

// import {UserModal} from "./modals/UserModal"
import {SendResetPasswordEmailModal} from "./modals/SendResetPasswordEmailModal/SendResetPasswordEmailModal"
import {CreateContactModal} from "./modals/CreateContactModal/CreateContactModal"
import {ConfirmDeleteModal} from "./modals/ConfirmDeleteModal/ConfirmDeleteModal"
import {ConfirmLogoutModal} from "./modals/ConfirmLogoutModal/ConfirmLogoutModal"

export const ModalManager = () => {
  const { modalType, modalProps } = useSelector(state => state.modal)
  const dispatch = useDispatch()

  const close = () => dispatch(closeModal())

  switch (modalType) {
    // case "USER_INFO": return <UserModal {...modalProps} onClose={close}/>
    case "SEND_EMAIL_RESET_PASSWORD": return <SendResetPasswordEmailModal onClose={close}/>
    case "CREATE_CONTACT": return <CreateContactModal {...modalProps} onClose={close}/>
    case "CONFIRM_DELETE": return <ConfirmDeleteModal {...modalProps} onClose={close}/>
    case "CONFIRM_LOGOUT": return <ConfirmLogoutModal onClose={close}/>
    default: return null
  }
}