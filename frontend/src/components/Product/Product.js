import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Prodect.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from '../Rating';
import { Store } from '../../Store';
import axios from 'axios';

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <React.Fragment>
      <Card style={{ height: 610}}>
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
            style={{ height: 400 }}
          />
        </Link>
        <Card.Body>
          <Link to={`/product/${product.slug}`}>
            <Card.Title
              style={{
                color: '#415e6b',
                fontSize: '1.1rem',
                fontWeight: 400,
                fontFamily: 'Poppins',
                textTransform: 'capitalize'
              }}
            >
              {product.name}
            </Card.Title>
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <Card.Text
            style={{
              color: '#415e6b',
              fontSize: '1rem',
              fontWeight: 400,
              fontFamily: 'Poppins',
            }}
          >
            {product.price}JD
          </Card.Text>
          {product.countInStock === 0 ? (
            <Button variant="light" disabled>
              Out of stock
            </Button>
          ) : (
            <Button
              className="cart-btn"
              onClick={() => addToCartHandler(product)}
            >
              Add to cart
            </Button>
          )}
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}

export default Product;
