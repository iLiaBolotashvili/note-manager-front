import React, { useState } from 'react';
import AuthService from "../../services/auth.js";
import axios from 'axios';
import { Button, Modal, Label, TextInput, Textarea } from 'flowbite-react';

const NoteAdd = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [openModal, setOpenModal] = useState(undefined);
  const props = { openModal, setOpenModal };
  
  const addTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  const addContentHandler = (event) => {
    setContent(event.target.value);
  };

  const noteData = {
    title: title,
    content: content,
  };

  const addNoteHandler = () => {

    const currentUser = AuthService.getCurrentUser();
    let userId = currentUser.id;
  
    axios.post(`http://localhost:4000/api/notes/post/${userId}`, noteData, { headers: {'access-token': `${currentUser.accessToken}`,}})
      .then(response => {
        console.log('Note posted successfully!');
      })
      .catch(error => {
        console.error('Error posting note:', error);
      });
    
    window.location.reload();
  };

  return (
    <div>
      <Button onClick={() => props.setOpenModal('dismissible')}>Add Note</Button>
      <Modal dismissible show={props.openModal === 'dismissible'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header>Add a note</Modal.Header>
        <Modal.Body>
          <div className="py-2">
            <Label
              value="Title:"
            />
           <TextInput className='text-black' type="text" defaultValue={title} onBlur={addTitleHandler} placeholder="Title" required/>
          </div>
          <div className="py-2">
            <Label
              value="Content:"
            />
            <Textarea rows={12} className='text-black' type="text" defaultValue={content} onBlur={addContentHandler} placeholder="Content" required/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addNoteHandler}>Post Note</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NoteAdd;