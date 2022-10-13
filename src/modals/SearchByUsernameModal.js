import Modal from "react-bootstrap/Modal"
function SearchByUsernameModal(props) {

  return <Modal
    show={props.openModal}
    onHide={props.closeModal}
    aria-labelledby="ModalHeader" >
    <Modal.Header closeButton>
      <Modal.Title id='ModalHeader'> User : {props.userRecord.loginId}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{props.userRecord.firstName} {props.userRecord.lastName}</td>
              <td>{props.userRecord.email}</td>
              <td>{props.userRecord.contactNumber}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Modal.Body>
  </Modal>
}

export default SearchByUsernameModal
