import React from 'react'
import "./Home.css"
import Product from './Product'
function Home() {
    return (
        <div className="home">
        <div className="home__container">
        <img className="home__image" src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" alt=""/>
        <div className="home__row">
            
            <Product 
            id="1" 
            title='Think like Monk' 
            price={199} 
            image='https://images-na.ssl-images-amazon.com/images/I/81s6DUyQCZL.jpg' 
            rating={3}

            />
            <Product id="2"
            title='Kitchen Mixture' 
            price={2390.0} 
            image='https://images-na.ssl-images-amazon.com/images/I/714W80Jwi0L._SL1500_.jpg' 
            rating={5}

            />
           
            
            
        </div>

        <div className="home__row">
        <Product 
            id="3" 
            title='Apple iPhone MaxPro' 
            price={24500} 
            image='https://images-na.ssl-images-amazon.com/images/I/61tuQdl2yLL._SL1024_.jpg' 
            rating={4}

            />
            <Product 
            id="4" 
            title='Amazon Echo' 
            price={2499} 
            image='https://images-na.ssl-images-amazon.com/images/I/61EXU8BuGZL._SL1100_.jpg' 
            rating={3}

            />
            <Product 
            id="5" 
            title='New Apple mac book Pro' 
            price={79000} 
            image='https://images-na.ssl-images-amazon.com/images/I/81MkiDFq80L._SL1500_.jpg' 
            rating={5}

            />
            
        </div>
        
        <div className="home__row">
        <Product 
            id="6" 
            title='Samsung ' 
            price={68900} 
            image='https://images-na.ssl-images-amazon.com/images/I/51ntZfI2bmL.jpg' 
            rating={5}

            />
        </div>
        
        </div>
            
        </div>
    )
}

export default Home
