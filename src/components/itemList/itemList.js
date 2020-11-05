import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const LoadBox = styled.div`
background-color: #fff;
padding: 25px 25px 15px 25px;
margin-bottom: 30px;
border-radius: 5px;
`,
ItemsList = styled.ul`
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    border-radius: .25rem;
    margin-top: 10px;
    box-sizing: border-box;
    cursor: pointer;
    
`;

function ItemList({getData, onItemSelected, renderItem}) {

    const [itemList, updateList] = useState([]);
    const [loading, updateLoading] = useState(false);
    const [error, updateError] = useState(false);

    useEffect(() => {
      
        updateLoading(true);
        getData()
            .then( (data) => {
                updateList(data);
                updateLoading(false);
             })
            .catch( () => updateError(true))
            }, [])

   


   function renderItems(data) {
        return data.map((item) => {
            const {id} = item;
            const label = renderItem(item);
            return (
                <li key={id} className="list-group-item"  onClick={() => onItemSelected(item.id)} >
                    {label}
                </li>
            )
        })
    }

    
        
        if (error) {
            return <ErrorMessage/>
        }

        if (!itemList || loading) {
            return <LoadBox><Spinner/></LoadBox> 
        }

        const items = renderItems(itemList);

        return (
            <ItemsList>
                {items}
            </ItemsList>
        );
    
}

export default ItemList;