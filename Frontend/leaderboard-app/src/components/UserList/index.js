import React, { useState, useEffect, useCallback } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { Card, Button, Form } from "react-bootstrap";
import Notification from "../Notifications";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [isAddUser, setIsAddUser] = useState(false);
  const [addUser, setAddUser] = useState({ name: "", points: "" });
  const [points, setPoints] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get('https://leaderboard-app-backend-tl3i.onrender.com/api/users');
      setUsers(res.data);
    } catch (error) {
      showNotification("Failed to fetch users. Please try again.", "error");
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const onClearPoints = () => {
    setTimeout(() => {
      setPoints(null);
    }, 3000);
  };

  const handleClaimPoints = async () => {
    setIsLoading(true);
    if (selectedUser) {
      try {
        const res = await axios.post('https://leaderboard-app-backend-tl3i.onrender.com/api/users/claim', { userId: selectedUser });
        
        setPoints(res.data.points);
        showNotification("Points claimed successfully!", "success");
        setIsLoading(false);
        onClearPoints();
      } catch (error) {
        console.error(error);
        showNotification("Failed to claim points, please try again.", "error");
        setIsLoading(false);
      }
    } else {
      showNotification("Please select a user to claim points.", "error");
      setIsLoading(false);
    }
  };

  const onChangeName = (event) => {
    setAddUser((prevState) => ({ ...prevState, name: event.target.value }));
  };

  const onChangeNumber = (event) => {
    setAddUser((prevState) => ({ ...prevState, points: event.target.value }));
  };

  const onClickAddNewUser = async () => {
    setIsLoading(true);
    if (addUser.name !== "" && addUser.points !== "") {
      try {
        const res = await axios.post('https://leaderboard-app-backend-tl3i.onrender.com/api/users', addUser);
        console.log(res)
        showNotification('User added successfully!', 'success');
        setUsers([...users, res.data]); 
        setAddUser({ name: '', points: '' }); 
        setIsAddUser(false); 
      } catch (error) {
        showNotification("Failed to add user. Please try again.", "error");
        setIsLoading(false);
      }
    } else {
      showNotification("Please provide both name and points.", "error");
      setIsLoading(false);
    }
  };

  const handleUserSelection = (e) => {
    setSelectedUser(e.target.value);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: true }));
    }, 10);

    setTimeout(() => {
      setNotification({ message: "", type: "", show: false });
    }, 3000);
  };

  return (
    <div className="container">
      {/* Show notification at the top of the page */}
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          show={notification.show}
        />
      )}

      <Card className="mb-3">
        <Card.Body>
          <h2 className="text-center">User Management</h2>
          <Form>
            <Form.Group controlId="userSelect">
              <Form.Label>Select User:</Form.Label>
              <Form.Control as="select" onChange={handleUserSelection}>
                <option value="">--Select User--</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <div style={{ marginTop: "25px" }}>
              <Button variant="primary" onClick={handleClaimPoints}>
                Claim Points
              </Button>
              <Button
                variant="secondary"
                className="ms-2"
                onClick={() => setIsAddUser((prev) => !prev)}
              >
                {isAddUser ? "Cancel" : "Add User"}
              </Button>
            </div>
            {isAddUser && (
              <div className="mt-3">
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  onChange={onChangeName}
                />
                <Form.Control
                  type="number"
                  placeholder="Enter points"
                  className="mt-2"
                  onChange={onChangeNumber}
                />
                <Button
                  variant="success"
                  className="mt-2"
                  onClick={onClickAddNewUser}
                >
                  Add
                </Button>
              </div>
            )}
          </Form>
          {points !== null && (
            <p className="alert alert-info">Points claimed: {points}</p>
          )}
        </Card.Body>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {isLoading && (
            <ThreeDots
              visible={true}
              height="40"
              width="40"
              color="black"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default UserList;
