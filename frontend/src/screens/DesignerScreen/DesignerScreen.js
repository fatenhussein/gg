import axios from 'axios';
import React, { useEffect, useReducer, useContext, useState } from 'react';
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
import DesignerRating from '../../components/DesignerRating';
import './DesignerScreen.css';
import Navbar from '../../components/NavBar/NavBar';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST': {
      return { ...state, loading: true };
    }
    case 'FETCH_SUCCESS': {
      return {
        ...state,
        designer: action.payload,
        loading: false,
      };
    }
    case 'FETCH_FAILURE': {
      return { ...state, loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};
function DesignerScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [data, useData] = useState([]);
  const [{ loading, error, designer }, dispatch] = useReducer(reducer, {
    designer: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/designers/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        console.log(result);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);
  console.log(designer);

  return loading ? (
    <div>
      <LoadingBox />
    </div>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <React.Fragment>
      <div className="designer-container">
        <Navbar />
        <Row className="designer-row">
          <Col
            md={6}
            className="d-flex justify-content-center   animate__animated animate__fadeInLeft "
          >
            <div
              style={{
                boxShadow: '8px 8px 2px #415e6b',
                width: 450,
                height: 450,
                borderRadius: '1rem',
              }}
            >
              {console.log(designer)}
              <img
                className="img-large"
                src={designer.image}
                alt={designer.name}
                style={{ height: 450, width: 450, borderRadius: '1rem' }}
              ></img>
            </div>
          </Col>
          <Col
            md={3}
            sm={1}
            className="d-flex justify-content-center animate__animated animate__fadeInRight"
          >
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Helmet>
                  <title>{designer.name}</title>
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
                  {designer.name}
                </h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <DesignerRating rating={designer.rating}></DesignerRating>
              </ListGroup.Item>

              <ListGroup.Item
                style={{
                  color: '#415e6b',
                  fontSize: '1.2rem',
                  fontFamily: 'Poppins',
                }}
              >
                Description:
                <p
                  style={{
                    color: '#415e6b',
                    fontSize: '1.2rem',
                    fontFamily: 'Outfit',
                    maxWidth: 900,
                    overflowWrap: 'break-word',
                  }}
                >
                  {designer.description}
                </p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default DesignerScreen;
