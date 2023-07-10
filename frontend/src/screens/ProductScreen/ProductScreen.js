import axios from 'axios';
import React, { useEffect, useReducer, useContext } from 'react';
import Col from 'react-bootstrap/esm/Col';
import { useParams, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Rating from '../../components/Rating';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { getError } from '../../utils';
import { Store } from '../../Store';
import ShopNav from '../../components/shopNav/ShopNav';
import Footer from '../../components/footer/Footer';
import './ProductScreen.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function ProductScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/cart');
  };

  return loading ? (
    <div>
      <LoadingBox />
    </div>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <React.Fragment>
      <div className="product-container">
        <ShopNav />
        {/*product.name*/}

        <Row id="product-col-con">
          <Col md={4} className="product-col">
            <div id="product-img-con">
              <img src={product.image} alt={product.name}></img>
            </div>
          </Col>
          <Col md={3} className="product-col">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>

                <h1
                  style={{
                    color: '#415e6b',
                    fontSize: '2rem',
                    fontWeight: 400,
                    fontFamily: 'Poppins',
                    textTransform: 'capitalize',
                  }}
                >
                  {product.name}
                </h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                ></Rating>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  color: '#415e6b',
                  fontSize: '1.4rem',
                  fontWeight: 400,
                  fontFamily: 'Poppins',
                }}
              >
                Pirce : {product.price} JD
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  color: '#415e6b',
                  fontSize: '1.2rem',
                  fontFamily: 'Poppins',
                }}
              >
                Description:
                <p>{product.description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={2} className="product-col">
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col
                        style={{
                          color: '#415e6b',
                          fontSize: '1.2rem',
                          fontFamily: 'Poppins',
                        }}
                      >
                        Price:
                      </Col>
                      <Col
                        style={{
                          color: '#415e6b',
                          fontSize: '1.4rem',
                          fontWeight: 400,
                          fontFamily: 'Poppins',
                        }}
                      >
                        {product.price}JD
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col
                        className="product-col"
                        style={{
                          color: '#415e6b',
                          fontSize: '1.2rem',
                          fontFamily: 'Poppins',
                        }}
                      >
                        Status:
                      </Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <Badge bg="success">In Stock</Badge>
                        ) : (
                          <Badge bg="danger">Unavailable</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <div className="d-grid" style={{ marginTop: '2rem' }}>
                        <Button
                          onClick={addToCartHandler}
                          variant="primary"
                          className="product-btn"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default ProductScreen;
