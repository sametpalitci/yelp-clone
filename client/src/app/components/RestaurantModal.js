import {useState} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {checkFields, fetchData} from '../utils';
import swal from 'sweetalert';
const RestaurantModal = ({show,hide,setNewRestaurant}) => {
    const [getName,setName] = useState([]);
    const [getLocation,setLocation] = useState([]);
    const [getPrice,setPrice] = useState([]);

    const sendRestaurantToAPI =async (e) => {
        e.preventDefault();
        if(checkFields(getName,getLocation,getPrice)){
            const restaurantToAPI = await fetchData('/graphql','POST',{
                query:`mutation {
                    addRestaurant(name: "${getName}", location: "${getLocation}",price:${getPrice}){
                      name
                    }
                  }`
            },sessionStorage.getItem('token'));
            if(restaurantToAPI.errors){
                swal(restaurantToAPI.errors[0].message);
            } else {
                setPrice("");
                setLocation("");
                setName("");
                swal('Successfull!');
                setNewRestaurant();
                hide();
            }
        } else {
            swal("The fields can not be empty")
        }
    }
    return (
        <>
        <Modal show={show} onHide={()=>hide()} size="sm">
        <Modal.Header>Restaurant Add</Modal.Header>
        <Modal.Body>
        <form onSubmit={(e)=>sendRestaurantToAPI(e)}>
            <div className="form-group">
                <label >Name</label>
                <input 
                    type="text"
                    className="form-control" 
                    placeholder="Name"
                    value={getName}
                    onChange={(e)=>setName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Location</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Location"
                    value={getLocation} 
                    onChange={(e)=>setLocation(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Price</label>
                <input 
                    type="number" 
                    className="form-control" 
                    placeholder="Price"
                    value={getPrice} 
                    onChange={(e)=>setPrice(e.target.value)}
                />
            </div>
        </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>hide()}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=>sendRestaurantToAPI(e)}>
            add
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    );
}

export {RestaurantModal}