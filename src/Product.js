import React from 'react'
import "./Product.css"
import { useStateValue } from './StateProvider'
function Product({id,title,image,price,rating}) {
    const [state,dispatch] = useStateValue(); 
    
    const addToBasket =() =>{
        //dipatch the item into data layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating
            } 
        })
    }
    return (
        <div className="product">

        <div className="product_info">
            <p>{title}</p>
            <p className="product__price">
                <small>₹ </small>
                <strong>{price}</strong>
            </p>
            <div className="product__rating">
                {Array(rating).fill().map((_,i)=> (
                    <p>	&#11088;</p>
                ))}
                
            </div>
             
        </div>
        <img src={image} alt=""/>
            
            <button onClick={addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Product
