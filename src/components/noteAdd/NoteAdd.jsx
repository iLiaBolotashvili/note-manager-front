import React, { useState } from 'react';
import AuthService from "../../services/auth.js";
import axios from 'axios';

const NoteAdd = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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
      <input type="text" value={title} onChange={addTitleHandler} placeholder="Title" />
      <textarea value={content} onChange={addContentHandler} placeholder="Content" />
      <button onClick={addNoteHandler}>Post Note</button>
    </div>
  );
};

export default NoteAdd;