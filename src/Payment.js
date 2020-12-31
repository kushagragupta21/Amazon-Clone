import React, { useEffect, useState } from 'react'
import { Link,useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './payment.css'
import { useStateValue } from './StateProvider';
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from './axios'
import {db} from './firebase'
// import {getBasketTotal} from "./reducer"

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const totalPrice=()=>{
        let sum=0;
        for(let i=0;i<basket.length;i++){
            sum+=basket[i].price;
        }
        return sum;
    }

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error,setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(()=>{
        //generate the special stripe secret which allows us to charge a customer

        const getClientSecret = async () =>{
            const responce = await axios({
                method: 'post',
                //stripe expects the total in a currencies subunits
                url: `/payments/create?total=${totalPrice() * 100 }`   // 100 is multiplied  because of currency subunits of rupees is paisa
            });
            setClientSecret(responce.data.clientSecret);
        }

        getClientSecret();
    },[basket])

    console.log('THE SECRET ID >>>',clientSecret);

    const handleSubmit= async (event)=>{
        // do some fancy stripe stuff

        event.preventDefault();
        setProcessing(true);    // it disables button pressing again and again

        const payload = await stripe.confirmCardPayment(clientSecret ,{
            payment_method: {
                card: elements.getElement(CardElement)
            }

        }).then(({paymentIntent}) => {
            // paymentIntent = payment Confirmation

            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders');
        })
    }
    
    const handleChange =(event) =>{
        //Listen for changes in cardElement
        //and display any error as the customer types their card details event

        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (

        <div className="payment">

            <div className='payment__container'>
                <h1>
                    Checkout (
                        <Link to="/checkout">{basket?.length} items</Link>
                        )
                </h1>

                {/* Payment section - delivery address */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>

                    <div className="payment__address">
                        <p>{user?.email}</p>          {/** similar to user.email used for optional chaining */}
                        <p>123 React Lane</p>
                        <p>Los Angles, California</p>
                    </div>

                </div>

                {/* Payment section - Review Items */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>

                    <div className='payment__items'>

                        {/* All the products in basket*/}

                        {basket.map(items => (
                            <CheckoutProduct
                                id={items.id}
                                title={items.title}
                                image={items.image}
                                price={items.price}
                                rating={items.rating}
                            />
                        ))}

                    </div>

                </div>

                {/* Payment section - Payment Method */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe magic will goes */}
                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange} />

                                <div className="payment__priceContainer">
                                <CurrencyFormat renderText={(value) => (
                                    <>
                                    <h3>Order Total: {value}</h3>
                                        </>
                                    )}
                                        decimalScale={2}
                                        value={ totalPrice()} 
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={" ₹ "}
                                          />

                                          <button disabled={processing || disabled || succeeded}>

                                              <span>{processing ? <p>Processing</p>: "Buy Now"}</span>
                                          </button>
                                  </div>
                                    {/* Errors */}
                                    {error && <div>{error}</div>}
                            </form>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default Payment
