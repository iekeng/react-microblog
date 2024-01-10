import { useContext } from "react";
import { FlashContext } from '../contexts/FlashProvider';
import Alert from 'react-bootstrap/Alert';
import Collapse from "react-bootstrap/Collapse";

export default function FlashMessage() {
  const { flashMessage, visible, hideFlash } = useContext(FlashContext);

  return(
    <Collapse in={visible}>
      <div>
        <Alert variant={flashMessage.type || 'info'} dismissible
          onClose={hideFlash} data-visible={visible}>
          {flashMessage.message}
        </Alert>
      </div>
    </Collapse>
  )
}