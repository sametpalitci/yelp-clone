import {useState,useEffect} from 'react'
import {fetchData} from '../utils'
import {
    Header,
    Footer
} from '../components'
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { RestaurantModal } from '../components/RestaurantModal';


const HomePage = () => {
    const [getRestaurantData,setRestaurantData] = useState([]);
    const [getSessionToken,setSessionToken] = useState(sessionStorage.getItem('token'));
    const [restaurantModalShow,setRestauranModalShow] = useState(false);
    const _fetchRestaurants = async ()=>{
        const _fetchData = await fetchData('/graphql','POST',{
            query:`
            {
                getRestaurant {
                    id
                  name
                  location
                  price
                }
              }              
            `
        });
        console.log(_fetchData)
        setRestaurantData(_fetchData.data.getRestaurant)
    }
    useEffect(()=>{
        _fetchRestaurants()
    },[])
    const columns = [
        {
          name: 'Name',
          selector: 'name',
          sortable: true,
        },
        {
          name: 'Location',
          selector: 'location',
          sortable: true,
          right: true,
        },
        {
          name: 'Price',
          selector: 'price',
          sortable: true,
          right: true,
          cell:({price})=> {
              ++price;
                let dolar = "";  
                for(let i = 0; i< price; i++){
                    dolar += "💲";
                }
              return dolar;
          }
        },
        {
          name: 'Button',
          selector: 'id',
          sortable: true,
          right: true,
          cell:(row)=> <Link to={{pathname:'/comment',state:{row}}} className="btn btn-primary">GO Comments -></Link>
        },
      ];
    return (
        <>
        <Header newToken={()=>setSessionToken(sessionStorage.getItem('token'))}/>
            <div className="container">
            <RestaurantModal show={restaurantModalShow} hide={()=>setRestauranModalShow(false)} setNewRestaurant={()=>_fetchRestaurants()}/>
              {getSessionToken && 
                <button className="btn btn-warning my-3" onClick={()=>setRestauranModalShow(!restaurantModalShow)}>Add Restaurant</button>
              }
            <DataTable
                className="mt-5"
                title="Restaurants"
                columns={columns}
                data={getRestaurantData}
                theme=""
            />
            </div>
            
        <Footer />
        </>
    );
};

export {HomePage};