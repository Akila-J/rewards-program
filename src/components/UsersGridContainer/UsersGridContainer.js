import { useState, useEffect } from 'react';
import UserTile from '../UserTile';
import { transformData } from '../../utils/transformData';
import './UsersGridContainer.css';

const UsersGridContainer = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/users.json')
      .then(res => res.json())
      .then(res => {
        const users = transformData(res.data);
        setUsers(users);
      });
  }, []);

  const userTiles = users.map(user => (
    <UserTile key={user.transactionDate} {...user} />
  ));
  return (
    <>
      <h1 className="user-list-header">Users</h1>
      <div className="user-list-container">
        {userTiles}
      </div>
    </>
  );
}

export default UsersGridContainer;
