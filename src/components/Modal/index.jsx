import React from 'react'
import { Button, Modal } from 'react-bootstrap';

const MyModal = ({Show, HandleClose, HandleSave, children, title, Size, SaveTitle = "Save Changes", SaveVariant = "primary", CancelTitle = "Cancel", CancelVariant =  "secondary"}) => {
  return (
    <Modal size={Size} show={Show} onHide={HandleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children ? children : null}
      </Modal.Body>
      <Modal.Footer>
        <Button variant={CancelVariant} onClick={HandleClose}>
          {CancelTitle}
        </Button>
        <Button variant={SaveVariant} onClick={HandleSave}>
          {SaveTitle}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default MyModal;

