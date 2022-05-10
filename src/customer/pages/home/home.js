import React from 'react';
import './home.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "../../components/carousel/carousel.css"
import SteakImg from '../../../assets/steak.jpg';
import BrownieImg from '../../../assets/brownie.jpg';
import MojitoImg from '../../../assets/mojito.jpg';


export default function Home() {
  
  return (  
    <div className="home">
      <Carousel className="carouselcontainer" autoPlay infiniteLoop interval='5000' showArrows="true" showThumbs="false" thumbWidth={0}>
          <div>

          <h1 className="promotion-header">&#129346; HAPPY HOUR PROMOTION! &#129346;</h1>
          <p className="promotion1">Mojito @ $8</p>
          <p className="promotion2">5.30pm to 9.30pm on Fridays!</p>
          
          <div className='image-banner-1'>
            <img id='mojito-banner'src={MojitoImg}
            alt="promotion"/>
          </div>
        </div>

        <div>
          <h1 className="promotion-header">&#129385; LUNCH HOUR PROMOTION! &#129385;</h1>
          <p className="promotion1">Steak and fries 30% OFF !</p>
          <p className="promotion2">Available only from 11am to 1pm !</p>
          
          <div className='image-banner-2'>
            <img id='steak-banner'src={SteakImg}
            alt="promotion"/>
          </div> 
        </div>

        <div>
          <h1 className="promotion-header">&#127851; DESSERT PROMOTION! &#127851;</h1>
          <p className="promotion1">Chocolate Brownie free with orders above $50 !</p>
          <p className="promotion2">While stocks last !</p>
          
          <div className='image-banner-3'>
            <img id='brownie-banner'src={BrownieImg}
            alt="promotion"/>
          </div>
        </div>
      </Carousel>
      </div>
  );
}