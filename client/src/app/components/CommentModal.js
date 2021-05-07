import {useState} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {checkFields, fetchData} from '../utils';
import swal from 'sweetalert';
const CommentModal = ({show,hide,setNewComment,restaurantId}) => {
    const [getComment,setComment] = useState([]);
    const [getSkor,setSkor] = useState([]);

    const sendRestaurantToAPI =async (e) => {
        e.preventDefault();
        if(checkFields(getComment,getSkor)){
            const restaurantToAPI = await fetchData('/graphql','POST',{
                query:`mutation {
                    addComment(comment: "${getComment}", skor: ${getSkor}, restaurantId: ${restaurantId}) {
                      comment
                    }
                  }
                  `
            },sessionStorage.getItem('token'));
            if(restaurantToAPI.errors){
                swal(restaurantToAPI.errors[0].message);
            } else {
                setComment("");
                setSkor("");
                swal('Successfull!');
                setNewComment();
                hide();
            }
        } else {
            swal("The fields can not be empty")
        }
    }
    return (
        <>
        <Modal show={show} onHide={()=>hide()} size="sm">
        <Modal.Header>Comment Add</Modal.Header>
        <Modal.Body>
        <form onSubmit={(e)=>sendRestaurantToAPI(e)}>
            <div className="form-group">
                <label >Comment</label>
                <input 
                    type="text"
                    className="form-control" 
                    placeholder="Comment"
                    value={getComment}
                    onChange={(e)=>setComment(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Skor</label>
                <input 
                    type="number" 
                    className="form-control" 
                    placeholder="Location"
                    value={getSkor} 
                    onChange={(e)=>setSkor(e.target.value)}
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

export {CommentModal}