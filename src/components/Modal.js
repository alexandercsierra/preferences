import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';

const ModalExample = (props) => {
    const {
      className,
      isOpen,
      setIsOpen,
      whichForm,
      handleChange,
      onSubmit,
      listName,
      handleChangeFriend,
      friend,
      onSubmitFriend
    } = props;
  

    const [unmountOnClose, setUnmountOnClose] = useState(true);
  
    const toggle = () => setIsOpen(!isOpen);

  
    return (
        <div style={{maxWidth: '100%'}}>

            {whichForm === "list" && <Modal isOpen={isOpen} toggle={toggle} className={className} unmountOnClose={unmountOnClose}>
                <ModalHeader toggle={toggle}>Add New List</ModalHeader>
                <ModalBody>
                    <Input type="text" placeholder="list name" onChange={handleChange} value={listName}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=>{
                        onSubmit()
                        toggle()
                    }}>Add</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>}
            {whichForm === "friend" && <Modal isOpen={isOpen} toggle={toggle} className={className} unmountOnClose={unmountOnClose}>
                <ModalHeader toggle={toggle}>Add New Friend</ModalHeader>
                <ModalBody>
                    <Input type="text" placeholder="username of friend" onChange={handleChangeFriend} value={friend}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=>{
                        onSubmitFriend()
                        toggle()
                    }}>Follow Friend</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>}
        </div>
    );
}

export default ModalExample;