import axios from 'axios';
import React, { useEffect, useState } from 'react';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const UsersComponent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/fyp/admin/getUsers`);
        console.log('Users API response:', response.data); // Debug log to check structure
        setUsers(response.data.Users || []); // Use data structure based on actual response
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Run once on component mount

  const toggleBanStatus = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id ? { ...user, isBan: !user.isBan } : user
      )
    );
  };

  const handleBanClick = async (id) => {
    try {
      const res = await axios.put(`${BASE_URL}/fyp/admin/banUser/${id}`);
      alert(res.data.message);
      toggleBanStatus(id);
    } catch (error) {
      console.error('Error banning user', error);
    }
  };

  const handleUnbanClick = async (id) => {
    try {
      console.log(`Unbanning user with ID: ${id}`);
      const res = await axios.put(`${BASE_URL}/fyp/admin/unbanUser/${id}`);
      alert(res.data.message);
      toggleBanStatus(id);
    } catch (error) {
      console.error('Error unbanning user', error);
    }
  };

  // CSS styles as JavaScript objects
  const styles = {
    container: {
      maxWidth: '100%',
      margin: '0 auto',
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    th: {
      border: '1px solid #ddd',
      padding: '8px',
      backgroundColor: 'black',
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'left',
    },
    td: {
      border: '1px solid #ddd',
      padding: '8px',
      textAlign: 'left',
    },
    evenRow: {
      backgroundColor: '#f9f9f9',
    },
    actionButton: (isBanned) => ({
      padding: '5px 10px',
      border: 'none',
      cursor: 'pointer',
      color: 'white',
      fontWeight: 'bold',
      borderRadius: '4px',
      backgroundColor: isBanned ? '#5bc0de' : '#d9534f',
    }),
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Serial Number</th>
            <th style={styles.th}>Username</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>User Role</th>
            <th style={styles.th}>Location</th> {/* Added Location Column */}
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user._id} // Use unique identifier
              style={index % 2 === 0 ? styles.evenRow : {}}
            >
              <td style={styles.td}>{index + 1}</td>
              <td style={styles.td}>{user.username}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>{user.role}</td>
              <td style={styles.td}>{user.location}</td> {/* Displaying User Location */}
              <td style={styles.td}>
                <button
                  style={styles.actionButton(user.isBan)}
                  onClick={() => user.isBan ? handleUnbanClick(user._id) : handleBanClick(user._id)}
                >
                  {user.isBan ? 'Unban' : 'Ban'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersComponent;
