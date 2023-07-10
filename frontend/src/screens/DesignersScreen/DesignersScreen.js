import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import Designer from '../../components/Designer/Designer';
import './DesignersScreen.css';
import SearchScreen from '../SearchScreen/SearchScreen';
import SearchBox from '../../components/SearchBox';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/footer/Footer';
import DesignerSearch from '../../components/DesignersSearchBox';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, designers: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function DesignersScreen() {
  const [{ loading, error, designers }, dispatch] = useReducer(
    logger(reducer),
    {
      designers: [],
      loading: true,
      error: '',
    }
  );
  //const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData1 = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/designers');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      //setProducts(result.data);
    };
    fetchData1();
  }, []);
  return (
    <React.Fragment>
      <Navbar />

      <div className="designers-con">
        <Helmet>
          <title>Featured Designers</title>
        </Helmet>
        <h1>Featured Designers</h1>
        <DesignerSearch></DesignerSearch>
        <div>
          {loading ? (
            <div>
              <LoadingBox />
            </div>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <Row className="designers-row">
              {designers.map((designer) => (
                <Col
                  key={designer.slug}
                  sm={3}
                  md={4}
                  lg={3}
                  className="mb-3 d-flex justify-content-center"
                >
                  <Designer designer={designer}></Designer>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
export default DesignersScreen;
