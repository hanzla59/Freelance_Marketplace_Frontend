import React from 'react';
import styles from './Admin.module.css';
import admin from './profile.jpg';
import { useState } from 'react';
import UsersComponent from './Users/UsersComponent';
import Verification from './Users/VerificationRequests';
import Analytics from './Dashboard/Analytics';
import ComplainsList from './Dashboard/ComplainList';


export default function Admin() {
    const [isadmin, setisadmin] = useState(false)
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [dashboard, setdashboard] = useState(true)
    const [users, setusers] = useState(false)
    const [query, setquery] = useState(false)
    const [complain, setcomplain] = useState(false)
    const [ban, setban] = useState(false)
    const [task, settask] = useState(false)
    const [service, setservice] = useState(false)

    const handleusernamechange = (e) => {
        setusername(e.target.value)
    }
    const handlepasswordchange = (e) => {
        setpassword(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        {username==="admin" && password==="Admin12345@" ? (setisadmin(true)):(alert('Invalid username or password')) }
        setusername('');
        setpassword('');
    };
    return (
        <>{!isadmin ? (
            <>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <form action="" style={{ display: 'flex', flexDirection: 'column', width: '400px' }}>
                        <h1 style={{ textAlign: 'center', fontSize: '34px' }}>Login as Admin</h1>
                        <input type="text" name="" id="name" placeholder='username' onChange={handleusernamechange} />
                        <input type="password" name="password" id="" placeholder='password' onChange={handlepasswordchange} />
                        <button type='submit' onClick={handleSubmit}>Login</button>
                    </form>
                </div>
            </>
        ) : (
            <>
                <div className={styles.admin}>
                    <div className={styles.left}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '5px 0px', padding: '6px 6px', boxShadow: '1px 1px 3px gray', borderRadius: '2px' }}>
                            <img src={admin} alt="" style={{ width: '50px', borderRadius: '50%' }} />
                            <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Admin</span>
                        </div>
                        <div className={styles.adminboard}>
                            <h2>DashBoard</h2>
                            <p onClick={() => {
                                setdashboard(true);
                                setusers(false)
                                setservice(false)
                                settask(false)
                                setquery(false)
                                setban(false)
                                setcomplain(false)
                            }}>Analytics</p>
                            <h2>Pages</h2>
                            <p onClick={() => {
                                setusers(true)
                                setdashboard(false)
                                setservice(false)
                                settask(false)
                                setquery(false)
                                setban(false)
                                setcomplain(false)
                            }}>Users</p>
                            <p onClick={() => {
                                setcomplain(true)
                                setdashboard(false)
                                setquery(false)
                                setusers(false)
                                setservice(false)
                                settask(false)
                                setban(false)
                            }}>Complaint</p>
                            <p onClick={() => {
                                settask(true)
                                setdashboard(false)
                                setservice(false)
                                setusers(false)
                                setquery(false)
                                setban(false)
                                setcomplain(false)
                            }}>Verificiation Request</p>
                            <h2>Profile</h2>
                            {/* <p>Setting</p> */}
                            <p onClick={() => setisadmin(false)}>LogOut</p>
                        </div>

                    </div>
                    <div className={styles.right}>
                        {dashboard ? (<><Analytics/></>) : (<></>)}
                        {users ? (<><div style={{display:'flex', justifyContent:'space-between'}}><h1 style={{margin:'0px'}}>List of Users</h1></div>
                            <UsersComponent/>
                        </>) : (<></>)}
                        {complain ? (<><h1>Recieved Complain</h1><ComplainsList/></>) : (<></>)}
                        
                        {task ? (<><h1>Verification Request</h1>{<Verification/>}</>) : (<></>)}
                       
                    </div>
                </div>
            </>
        )}
        </>
    )
}
