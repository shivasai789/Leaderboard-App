import React, { useEffect, useState, useCallback } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { Card } from "react-bootstrap";
import { MdDeleteOutline } from "react-icons/md";
import Notification from "../Notifications";

const Leaderboard = () => {
  const [rankings, setRankings] = useState([]);
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    show: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchRankings = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "https://leaderboard-app-backend-tl3i.onrender.com/api/users/rankings"
      );
      setRankings(res.data);
      setIsLoading(false);
    } catch (error) {
      showNotification(
        "Failed to fetch leaderboard. Please try again.",
        "error"
      );
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRankings();
  }, [fetchRankings]);

  const onClickDeleteUser = async (id) => {
    try {
      await axios.delete(
        `https://leaderboard-app-backend-tl3i.onrender.com/api/users/${id}`
      );
      showNotification("User deleted successfully.", "success");
      fetchRankings(); // Refresh rankings after deletion
    } catch (error) {
      showNotification("Failed to delete user. Please try again.", "error");
    }
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
    <Card>
      <Card.Body>
        <h2 className="text-center">Leaderboard</h2>
        <div className="d-flex justify-content-center">
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
        {/* Display notification component */}
        {notification.message && (
          <Notification
            message={notification.message}
            type={notification.type}
            show={notification.show}
          />
        )}

        {!isLoading && (
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
                      style={{ border: "0px", backgroundColor: "transparent" }}
                      onClick={() => onClickDeleteUser(user._id)}
                    >
                      <MdDeleteOutline size="20" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card.Body>
    </Card>
  );
};

export default Leaderboard;
