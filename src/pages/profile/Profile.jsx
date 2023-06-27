import React, { useState, useEffect } from 'react';
import AuthService from "../../services/auth.js";
import NoteAdd from '../../components/noteAdd/NoteAdd.jsx';
import axios from "axios";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  let userId = currentUser.id;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.get(`http://localhost:4000/api/notes/get/${userId}`, {
          headers: {
            'access-token': `${currentUser.accessToken}`,
          }
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
  <div className="w-96 h-96 text-black my-2 mx-auto">
      <h3>
        <strong>Profile: </strong>{currentUser.username}
      </h3>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>

      <ul>
        {data.map(note => (
          <li key={note.id}>
            {note.title}
            {note.content}
          </li>
        ))}
      </ul>

      <NoteAdd />

    </div>
  );
};

export default Profile;