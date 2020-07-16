import React from 'react';
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
  

    // const [unmountOnClose, setUnmountOnClose] = useState(true);
  
    const toggle = () => setIsOpen(!isOpen);

  
    return (
        <div style={{maxWidth: '100%'}}>

            {whichForm === "list" && <Modal isOpen={isOpen} toggle={toggle} className={className}>
                <ModalHeader style={{background:'#31a05f', color: 'white'}} toggle={toggle}>Add New List</ModalHeader>
                <ModalBody style={{background:'#31a05f'}}>
                    <Input type="text" placeholder="list name" onChange={handleChange} value={listName}/>
                </ModalBody>
                <ModalFooter style={{background:'#31a05f'}}>
                    <Button style={{background: '#31a05f', border: '1px solid white'}} onClick={()=>{
                        onSubmit()
                        toggle()
                    }}>Add</Button>{' '}
                    <Button color="danger" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>}
            {whichForm === "friend" && <Modal isOpen={isOpen} toggle={toggle} className={className}>
                <ModalHeader style={{background:'#31a05f', color: 'white'}}toggle={toggle}>Add New Friend</ModalHeader>
                <ModalBody style={{background:'#31a05f'}}>
                    <Input type="text" placeholder="username of friend" onChange={handleChangeFriend} value={friend}/>
                </ModalBody>
                <ModalFooter style={{background:'#31a05f'}}>
                    <Button style={{background: '#31a05f', border: '1px solid white'}} onClick={()=>{
                        onSubmitFriend()
                        toggle()
                    }}>Follow Friend</Button>{' '}
                    <Button color="danger" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>}
        </div>
    );
}

export default ModalExample;