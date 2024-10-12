import {Link,useLocation} from 'react-router-dom'



const Navigation = () => {
    const location = useLocation();
  
    return (
      <nav className="navigation">
        <Link to="/" className={`btn btn-secondary ${location.pathname === '/' ? '' : 'selected-btn'}`}>
          Manage Users
        </Link>
        {console.log(location.pathname)}
        <Link to="/leaderboard" className={`btn btn-secondary ${location.pathname === '/leaderboard' ? '' : 'selected-btn'}`}>
          View Leaderboard
        </Link>
      </nav>
    );
  };

  export default Navigation