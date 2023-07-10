import React, { useContext } from 'react';
import { Store } from '../../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import './CartScreen.css';
import axios from 'axios';
import ShopNav from '../../components/shopNav/ShopNav';
import Footer from '../../components/footer/Footer';

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const updateCartHandler = async (item, quantity) => {
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
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };
  return (
    <React.Fragment>
         <ShopNav/>
    <div className="cart-container">
   
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row  className='cart-row-con' >
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/shop">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup className='product-shop-cart'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4} className="col-img">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${item.slug}`} className="col-name">
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={3} className="pulse-minus">
                      <Button
                        id="btn-cart"
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant="light"
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span id="quantity">{item.quantity}</span>{' '}
                      <Button
                        id="btn-cart"
                        variant="light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <div className="trash-btn-price">
                      <Col md={3} className="col-price">
                        {item.price} JD
                      </Col>
                      <Col md={2}>
                        <Button
                          id="btn-cart"
                          onClick={() => removeItemHandler(item)}
                          variant="light"
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </div>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card className='empty'>
            <Card.Body >
              <ListGroup variant="flush" >
                <ListGroup.Item>
                  <h3 className="col-total">
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : 
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}JD
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      id="cheack-out-btn"
                      onClick={checkoutHandler
                      }
                      type="button"
                      variant="primary"
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
  
    </div>
    <Footer/>
    </React.Fragment>
  );
}
