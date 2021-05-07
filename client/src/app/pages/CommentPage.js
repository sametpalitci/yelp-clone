import {useState,useEffect} from 'react'

import { Header, Footer, CommentModal  } from "../components";
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { fetchData } from '../utils';

const CommentPage = ({history}) => {
    const [getCommentData,setCommentData] = useState([]);
    const [getSessionToken,setSessionToken] = useState(sessionStorage.getItem('token'));
    const [commentModalShow,setCommentModalShow] = useState(false);
    const restaurantInfo = history.location.state.row;
    const commentsFetch =async () => {
        const _fetchData = await fetchData('/graphql','POST',{
            query:`
            {
                getComment(restaurantId:${restaurantInfo.id}){
                  comment
                  skor
                }
              }
                          
            `
        });
        setCommentData(_fetchData.data.getComment)
    }
    useEffect(()=>{
        commentsFetch()
    },[])

    const columns = [
        {
          name: 'Comment',
          selector: 'comment',
          sortable: true,
        },
        {
            name: 'Skor',
            selector: 'skor',
            sortable: true,
            right: true,
            cell:({skor})=> {
                  let dolar = "";  
                  for(let i = 0; i< skor; i++){
                      dolar += "⭐";
                  }
                return dolar;
            }
          },
      ];
    return (
        <>
        <Header newToken={()=>setSessionToken(sessionStorage.getItem('token'))}/>
        <div className="container">
        <CommentModal show={commentModalShow} restaurantId={restaurantInfo.id} hide={()=>setCommentModalShow(false)} setNewComment={()=>commentsFetch()}/>
        {getSessionToken && 
                <button className="btn btn-warning my-3" onClick={()=>setCommentModalShow(!commentModalShow)}>Add Comment</button>
              }
            <DataTable
                className="mt-5"
                title={restaurantInfo.name}
                columns={columns}
                data={getCommentData}
                theme=""
            />
            </div>
        <Footer />
        </>
    );
};

export {CommentPage};