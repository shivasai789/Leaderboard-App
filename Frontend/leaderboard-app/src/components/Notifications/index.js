import React from "react";
import "./index.css";

const Notification = ({ message, type, show }) => {
  return (
    <div className={`notification ${type} ${show ? "show" : ""}`}>
      {message}
    </div>
  );
};

export default Notification;
