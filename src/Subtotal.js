import React from 'react'
import './Subtotal.css'
import CurrencyFormat from "react-currency-format"
import { useStateValue } from './StateProvider';
import { useHistory } from 'react-router-dom';

function Subtotal() {
    const history = useHistory();
    const [{basket},dispatch] = useStateValue();
    const totalPrice=()=>{
        let sum=0;
        for(let i=0;i<basket.length;i++){
            sum+=basket[i].price;
        }
        return sum;
    }
    return (
        <div className="subtotal">

        <CurrencyFormat renderText={(value) => (
            <>
            <p>
            {/* Part of HomeWork */}
                Subtotal ({basket.length} items):
                <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
                <input type="checkbox" /> This order contains Gift
            </small>
            </>
        )}
        decimalScale={2}
        value={ totalPrice()} //Part of homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={" ₹ "}
            />
            <button onClick={e => history.push('/payment')}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
