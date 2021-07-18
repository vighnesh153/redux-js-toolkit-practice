/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React, {useEffect} from "react";

import {RootState} from "src/store";
import {fetchUsers} from "src/store/users";
import {useDispatch, useSelector} from "react-redux";

const Users: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const usersTable = (
    <table className={'users-table'}>
      <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
      </tr>
      </thead>
      <tbody>
      {users.data.map((user) => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );

  return (
    <div className={'users-container'}>
      <h2>Users</h2>
      {users.fetching ? (
        <p>Loading...</p>
      ) : users.fetchError ? (
        <p>{users.fetchError}</p>
      ) : (
        usersTable
      )}
    </div>
  );
};

export default Users;
