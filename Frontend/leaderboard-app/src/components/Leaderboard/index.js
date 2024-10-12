import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { MdDeleteOutline } from "react-icons/md";
import Notification from '../Notifications'; 

const Leaderboard = () => {
  const [rankings, setRankings] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '', show: false });

  const fetchRankings = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/users/rankings');
      setRankings(res.data);
    } catch (error) {
      showNotification('Failed to fetch leaderboard. Please try again.', 'error');
    }
  }, []);

  useEffect(() => {
    fetchRankings();
  }, [fetchRankings]);

  const onClickDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/user/${id}`);
      showNotification('User deleted successfully.', 'success');
      fetchRankings(); // Refresh rankings after deletion
    } catch (error) {
      showNotification('Failed to delete user. Please try again.', 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    
    // Use a timeout to add 'show' class for transition
    setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: true }));
    }, 10); // Small delay for the class to take effect

    setTimeout(() => {
        setNotification({ message: '', type: '', show: false }); // Clear notification after 3 seconds
    }, 3000);
};

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center">Leaderboard</h2>
        {/* Display notification component */}
        {notification.message && <Notification message={notification.message} type={notification.type} show={notification.show} />}

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Total Points</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.points}</td>
                <td>
                  <button 
                    type="button" 
                    style={{ border: '0px', backgroundColor: 'transparent' }} 
                    onClick={() => onClickDeleteUser(user._id)}
                  >
                    <MdDeleteOutline size="20" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );
};

export default Leaderboard;
