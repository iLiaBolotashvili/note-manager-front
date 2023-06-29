import React, { useState } from 'react';
import axios from 'axios';
import AuthService from "../../services/auth.js";
import { Button } from 'flowbite-react';
import { TiDeleteOutline } from 'react-icons/ti';

const NoteDelete = ({ noteId, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  const currentUser = AuthService.getCurrentUser();

  const deleteNoteHandler = async () => {
    setIsLoading(true);

    try {
      const response = await axios.delete(`http://localhost:4000/api/notes/delete/${noteId}`, {
        headers: {
          'access-token': `${currentUser.accessToken}`,
        }
      });

      if (response.status === 204) {
        setIsDeleted(true);
      } else if (response.status === 404) {
        setError('Note not found');
      } else {
        setError('Error deleting note');
      }
    } catch (error) {
      setError('An error occurred');
    }

    onDelete();
    setIsLoading(false);

  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (isDeleted) {
    return <p>Note deleted successfully!</p>;
  }

  return (
    <Button onClick={deleteNoteHandler} disabled={isLoading} outline pill>
      <TiDeleteOutline className='w-4 h-4' />
    </Button>
  );
};

export default NoteDelete;