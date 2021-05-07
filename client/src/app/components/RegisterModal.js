import {useState} from 'react';
import {Modal,Button} from 'react-bootstrap';
import swal from 'sweetalert';
import { checkFields, fetchData } from '../utils';

const RegisterModal = ({show,hide}) => {
    const [getUsername,setUsername] = useState("");
    const [getPassword,setPassword] = useState("");
    const [getPasswordConfirm,setPasswordConfirm] = useState("");

    const userRegister = async(e) => {
        e.preventDefault();
        if(checkFields(getUsername,getPassword,getPasswordConfirm)){
            if(getPassword === getPasswordConfirm){
                if(getPassword.length > 5){
                    const registerPassToAPI = await fetchData('/graphql','POST',{
                        query:`mutation {
                            register(username: "${getUsername}", password: "${getPassword}"){
                              username,
                              id
                            }
                          }`
                    })
                    if(registerPassToAPI.errors){
                        swal(registerPassToAPI.errors[0].message);
                    } else {
                        swal('Successfull!');
                        setUsername("");
                        setPassword("");
                        setPasswordConfirm("");
                        hide();
                    }
                } else {
                    swal('Password must be bigger than 5');
                }
            } else {
                swal('Password does not match');
            }
        } else {
            swal('The fields can not be empty');
        }
        
    }
    return (
        <Modal show={show} onHide={()=>hide()} size="sm">
        <Modal.Header>Register</Modal.Header>
        <Modal.Body>
        <form onSubmit={(e)=>userRegister(e)}>
            <div className="form-group">
                <label >Username</label>
                <input 
                    type="text"
                    className="form-control" 
                    placeholder="Username"
                    value={getUsername}
                    onChange={(e)=>setUsername(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Password"
                    value={getPassword} 
                    onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label >Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Password"
                    value={getPasswordConfirm} 
                    onChange={(e)=>setPasswordConfirm(e.target.value)}
                />
            </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>hide()}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=>userRegister(e)}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

export {RegisterModal}