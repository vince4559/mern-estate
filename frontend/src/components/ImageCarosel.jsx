import React from 'react'
import AliceCarousel from 'react-alice-carousel';

const ImageCarosel = ({photo}) => {

  const responsive = {
      0: { 
          items: 1,
          temsFit: 'contain'
      },
};

const items = [
  <div> <img className='w-screen h-96 contain' src={photo[0]} alt='lsiting' /> </div>,
  <div> <img className='w-screen h-96 contain' src={photo[1]} alt='lsiting' /> </div>,
  <div> <img className='w-screen h-96 contain' src={photo[2]} alt='lsiting' /> </div>,
  <div> <img className='w-screen h-96 contain' src={photo[3]} alt='lsiting' /> </div>,
];

  return (
    <AliceCarousel 
      mouseTracking
      items={items}
      responsive={responsive}
      autoPlay
      infinite
      autoPlayInterval={2000}
      disableButtonsControls
      animationDuration={2000}
      // disableDotsControls
    />
  )
}

export default ImageCarosel