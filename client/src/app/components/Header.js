import {useState} from 'react';

import {Link} from 'react-router-dom';

import {LoginModal} from './LoginModal'
import {RegisterModal} from './RegisterModal'

const Header = () => {
    const [loginModalShow, setLoginModalShow] = useState(false);
    const [registerModalShow, setRegisterModalShow] = useState(false);
    return (
        <>
            <LoginModal show={loginModalShow} hide={()=>setLoginModalShow(false)}/>
            <RegisterModal show={registerModalShow} hide={()=>setRegisterModalShow(false)}/>
            <div className="container">
                <div className="row mt-4">
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <Link to="/" className="text-decoration-none text-bold text-dark fs-3">Yelp Clone Project</Link>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <button className="btn  mx-3" onClick={()=>setLoginModalShow(!loginModalShow)}>Login</button>
                            <button className="btn btn-outline-primary" onClick={()=>setRegisterModalShow(!registerModalShow)}>Register</button>
                        </div> 
                    </div>
                </div>
            </div>
        </>
    )
};

export {Header};