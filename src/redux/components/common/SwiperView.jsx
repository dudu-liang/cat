import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import autoPlay from 'react-swipeable-views-utils/lib/autoPlay';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const MyComponent = () => (
    <AutoPlaySwipeableViews>
        <div style={Object.assign({}, styles.slide, styles.slide1)}></div>
        <div style={Object.assign({}, styles.slide, styles.slide2)}></div>
        <div style={Object.assign({}, styles.slide, styles.slide3)}></div>
    </AutoPlaySwipeableViews>
  );

  const styles = {
    slide: {
      width:"100%",
      paddingBottom:"50%",
      color: '#fff'
    },
    slide1: {
      backgroundImage:'url(http://oy01at27y.bkt.clouddn.com/banner1.jpg)',
      backgroundSize:'cover'
    },
    slide2: {
      backgroundImage:'url(http://oy01at27y.bkt.clouddn.com/banner2.jpg)',
      backgroundSize:'cover'
    },
    slide3: {
      backgroundImage:'url(http://oy01at27y.bkt.clouddn.com/banner3.jpg)',
      backgroundSize:'cover'
    },
  };
  
  export default MyComponent;