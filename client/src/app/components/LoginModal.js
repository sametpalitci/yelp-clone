import {useState} from 'react';
import {Modal,Button} from 'react-bootstrap';
import swal from 'sweetalert';
import { checkFields, fetchData } from '../utils';

const LoginModal = ({show,hide}) => {
    const [getUsername,setUsername] = useState("");
    const [getPassword,setPassword] = useState("");

    const userLogin = async (e) => {
        e.preventDefault();
        console.log(getUsername,getPassword)
        if(checkFields(getUsername,getPassword)){
            const loginPassToAPI = await fetchData('/graphql','POST',{
                query:`mutation {
                    login(username: "${getUsername}", password: "${getPassword}"){
                      username,
                      id
                    }
                  }`
            })
            if(loginPassToAPI.errors){
                swal(loginPassToAPI.errors[0].message);
            } else {
                swal('Successfull!');
                setUsername("");
                setPassword("");
                hide();
            }
        } else {
            swal("The fields can not be empty")
        }
    }
    return (
        <Modal show={show} onHide={()=>hide()} size="sm">
        <Modal.Header>Login</Modal.Header>
        <Modal.Body>
        <form onSubmit={(e)=>userLogin(e)}>
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
        </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>hide()}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=>userLogin(e)}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

export {LoginModal}