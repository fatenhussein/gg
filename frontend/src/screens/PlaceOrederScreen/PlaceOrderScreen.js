import React, { useContext, useEffect, useReducer } from 'react';
import Axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Store } from '../../Store';
import CheckoutSteps from '../../components/CheckoutSteps';
import { toast } from 'react-toastify';
import { getError } from '../../utils';
import LoadingBox from '../../components/LoadingBox';
import "./PlaceOrderScreen.css"
import ShopNav from '../../components/shopNav/ShopNav';
import Footer from '../../components/footer/Footer';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default function PlaceOrderScreen() {
  const navigate = useNavigate();
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });

      const { data } = await Axios.post(
        '/api/orders',
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart, navigate]);

  return (
    <React.Fragment>
      <ShopNav/>
    <div className='place-order-container'>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="my-3 place-order-title">Preview Order</h1>
      <Row className='place-order-row'> 
        <Col md={8}>
          <Card className="mb-3 place-order-card">
            <Card.Body>
              <Card.Title className='place-order-card-title'>Shipping</Card.Title>
              <Card.Text>
                <strong className='order-place-label'>Name:</strong> <span className='place-order-value'>{cart.shippingAddress.fullName} </span><br />
                <strong className='order-place-label' >Address: </strong> <span className='place-order-value'>{cart.shippingAddress.address}</span>,
                <span className='place-order-value'>{cart.shippingAddress.city}</span>,<span className='place-order-value'> {cart.shippingAddress.postalCode}</span>,
                <span className='place-order-value'>{cart.shippingAddress.country}</span>
              </Card.Text>
              <Link to="/shipping" className='order-place-edit'>Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3 place-order-card">
            <Card.Body className=''>
              <Card.Title className='place-order-card-title'>Payment</Card.Title>
              <Card.Text>
                <strong className='order-place-label'>Method:</strong><span className='place-order-value'> {cart.paymentMethod}</span>
              </Card.Text>
              <Link to="/payment" className='order-place-edit'>Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3 place-order-card">
            <Card.Body>
              <Card.Title className='place-order-card-title'>Items</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                        <Link className='order-place-label' to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span  className='place-order-value'>{item.quantity}</span>
                      </Col>
                      <Col md={3}> 
                      <span className='place-order-value'>{item.price} JD</span></Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart" className='order-place-edit'>Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='place-order-card'> 
            <Card.Body>
              <Card.Title className='place-order-card-title'>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col className='order-place-label'>Items</Col>
                    <Col>   <span className='place-order-value'>{cart.itemsPrice.toFixed(2)} JD</span></Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col className='order-place-label'>Shipping</Col>
                    <Col>   <span className='place-order-value'>{cart.shippingPrice.toFixed(2)} JD</span></Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col className='order-place-label'>Tax</Col>
                    <Col>   <span className='place-order-value'>{cart.taxPrice.toFixed(2)} JD</span></Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong className='order-place-label'> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>   <span className='place-order-value'>{cart.totalPrice.toFixed(2)} JD</span></strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0}
                      className='place-order-btn'
                    >
                      Place Order
                    </Button>
                  </div>
                  {loading && <LoadingBox></LoadingBox>}
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
