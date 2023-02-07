import React from "react";
import { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import styles from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";
import axios from "axios";

const useStyles = makeStyles(styles);
export default function SectionImages(props) {
  const classes = useStyles();
  const [cakes, setCakes] = useState([])
  const [cookies, setCookies] = useState([])
  const [cheesecakes, setCheesecakes] = useState([])
  const [basket, setBasket]=useState([]);
  useEffect(() => {
    axios.get('https://bakery9.azurewebsites.net/products')
    .then(res => {
        setCakes(res.data.filter(product => product.categoryId === 1))
        setCookies(res.data.filter(product => product.categoryId === 2))
        setCheesecakes(res.data.filter(product => product.categoryId === 3))
    })
    .catch(err => {
        console.log(err)
    })
  },[]);

  useEffect(() => {
    axios.get('https://bakery9.azurewebsites.net/orders/' + props.id)
    .then(res => {
        setBasket(res.data.filter(order => order.status === "InProgress"));
    })
    .catch(err => {
        console.log(err)
    })
  },[]);

  
  function addToBasket(id)
  {
    if(basket.length===0)
    {
      const myOrder={
        orderDetails : [{customerId: parseInt(props.id,10),
        productId: id}],
        AddressId: 0,
        Status : 0
       }
       setBasket(myOrder);
      
       fetch('https://bakery9.azurewebsites.net/Orders/Create', {
             method: 'POST',
             body: JSON.stringify(myOrder),
             headers: { 'Content-Type' : 'application/json'} })
            .catch(error => console.error('Error:', error))
    }
    
    const myOrder={
      customerId: parseInt(props.id,10),
      productId: id
      }
      fetch('https://bakery9.azurewebsites.net/api/OrderDetails/Add', {
      method: 'POST',
      body: JSON.stringify(myOrder),
      headers: { 'Content-Type' : 'application/json'} })
      .catch(error => console.error('Error:', error))
  }


  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div className={classes.space50} />
        <div id="images">
          <div className={classes.title}>
            <h2>Cheesecakes</h2>
          </div>
          <GridContainer>
                      {cheesecakes.map(product => (
                        <GridItem xs={12} sm={4} key={product.id}>
                          <h4>{product.description}</h4>
                          <img src= {"https://bakery9.azurewebsites.net/Blob/" + product.container + '/' + product.blobName}
                              alt="..."
                              className={classes.imgRounded + " " + classes.imgFluid}/>
                          <Button justIcon round color="primary" onClick={()=>addToBasket(product.id)}>
                            <ShoppingBasketIcon className={classes.icons} />
                          </Button>
                          <h4>price: {product.price}</h4>
                        </GridItem>
                      ))}
          </GridContainer>
          </div>
          <div id="images">
          <div className={classes.title}>
            <h2>Cakes</h2>
          </div>
          <GridContainer>
                      {cakes.map(product => (
                        <GridItem xs={12} sm={4}>
                          <h4>{product.description}</h4>
                          <img src={"https://bakery9.azurewebsites.net/Blob/" + product.container + '/' + product.blobName}
                              alt="..."
                              className={classes.imgRounded + " " + classes.imgFluid}/>
                          <Button justIcon round color="primary" onClick={()=>addToBasket(product.id)}>
                            <ShoppingBasketIcon className={classes.icons} />
                          </Button>
                          <h4>price: {product.price}</h4>
                        </GridItem>
                      ))}
          </GridContainer>
          </div>
      </div>
    </div>
  );
}
