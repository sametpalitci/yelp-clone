import {useState, useEffect} from 'react';

import {Link} from 'react-router-dom';
import swal from 'sweetalert';

import {LoginModal} from './LoginModal'
import {RegisterModal} from './RegisterModal'

const Header = ({newToken}) => {
    const [loginModalShow, setLoginModalShow] = useState(false);
    const [registerModalShow, setRegisterModalShow] = useState(false);
    const [getSessionToken,setSessionToken] = useState(sessionStorage.getItem('token'));
    const logOut = () => {
        sessionStorage.clear('token');
        setSessionToken(null);
        newToken();
        swal("Log out!")
    }
    const setNewToken = () => {
        setSessionToken(sessionStorage.getItem('token'))
        newToken();
    }
    
    return (
        <>
            <LoginModal show={loginModalShow} hide={()=>setLoginModalShow(false)} setNewToken={()=>setNewToken()}/>
            <RegisterModal show={registerModalShow} hide={()=>setRegisterModalShow(false)}/>
            <div className="container">
                <div className="row mt-4">
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <Link to="/" className="text-decoration-none text-bold text-dark fs-3">Yelp Clone Project</Link>
                        </div>
                        {!getSessionToken ? 
                        <div className="d-flex align-items-center justify-content-center">
                            <button className="btn  mx-3" onClick={()=>setLoginModalShow(!loginModalShow)}>Login</button>
                            <button className="btn btn-outline-primary" onClick={()=>setRegisterModalShow(!registerModalShow)}>Register</button>
                        </div> 
                        :
                        <div className="d-flex align-items-center justify-content-center">
                            <button className="btn btn-outline-danger mx-3" onClick={()=>logOut()}>Exit</button>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
};

export {Header};