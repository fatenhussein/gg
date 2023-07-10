import React, { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../../utils';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from '../../components/Rating';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import Button from 'react-bootstrap/Button';
import LinkContainer from 'react-router-bootstrap/LinkContainer';

import './DesignersSearchScreen.css';

import Footer from '../../components/footer/Footer';
import Designer from '../../components/Designer/Designer';
import Navbar from '../../components/NavBar/NavBar';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        designers: action.payload.designers,
        page: action.payload.page,
        pages: action.payload.pages,
        countDesigners: action.payload.countDesigners,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const ratings = [
  {
    name: '4stars & up',
    rating: 4,
  },

  {
    name: '3stars & up',
    rating: 3,
  },

  {
    name: '2stars & up',
    rating: 2,
  },

  {
    name: '1stars & up',
    rating: 1,
  },
];

export default function SearchScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const category = sp.get('category') || 'all';
  const query = sp.get('query') || 'all';

  const rating = sp.get('rating') || 'all';
  const order = sp.get('order') || 'newest';
  const page = sp.get('page') || 1;

  const [{ loading, error, designers, pages, countDesigners }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/designers/search?page=${page}&query=${query}&category=${category}&rating=${rating}&order=${order}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, error, order, page, query, rating]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/designers/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, [dispatch]);

  const getFilterUrl = (filter, skipPathname) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;

    const sortOrder = filter.order || order;
    return `${
      skipPathname ? '' : '/designers/search?'
    }category=${filterCategory}&query=${filterQuery}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };

  return (
    <React.Fragment>
     <Navbar/>
      <div className="designer-search-page-container">
        <Helmet>
          <title>Search designers</title>
        </Helmet>
        <Row id="designer-search-page-row">
          <Col md={3} className="h-100">
            <h3 className="designer-search-title">Categories</h3>
            <div>
              <ul>
                <li>
                  <Link
                    className={'all' === category ? 'text-bold' : ''}
                    to={getFilterUrl({ category: 'all' })}
                    id="designer-search-text"
                  >
                    Any
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c}>
                    <Link
                      className={c === category ? 'text-bold' : ''}
                      id="designer-search-text"
                      to={getFilterUrl({ category: c })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="designer-search-title">Avg. Customer Review</h3>
              <ul>
                {ratings.map((r) => (
                  <li key={r.name}>
                    <Link
                      to={getFilterUrl({ rating: r.rating })}
                      className={
                        `${r.rating}` === `${rating}` ? 'text-bold' : ''
                      }
                    >
                      <Rating caption={' & up'} rating={r.rating}></Rating>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to={getFilterUrl({ rating: 'all' })}
                    className={rating === 'all' ? 'text-bold' : ''}
                  >
                    <Rating caption={' & up'} rating={0}></Rating>
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col md={9}>
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
                <Row className="justify-content-between mb-3">
                  <Col md={6}>
                    <div  id="designer-search-text">
                      {countDesigners === 0 ? 'No' : countDesigners} Results
                      {query !== 'all' && ' : ' + query}
                      {category !== 'all' && ' : ' + category}
                      {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                      {query !== 'all' ||
                      category !== 'all' ||
                      rating !== 'all' ? (
                        <Button
                          variant="light"
                          onClick={() => navigate('/designers/search')}
                        >
                          <i className="fas fa-times-circle"></i>
                        </Button>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                {designers.length === 0 && (
                  <MessageBox>No designer Found</MessageBox>
                )}

                <Row>
                  {designers.map((designer) => (
                    <Col sm={6} lg={4} className="mb-5" key={designer._id}>
                      <Designer designer={designer}></Designer>
                    </Col>
                  ))}
                </Row>

                <div>
                  {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                      to={{
                        pathname: '/designers/search',
                        seacrh: getFilterUrl({ page: x + 1 }, true),
                      }}
                    >
                      <Button
                        className={Number(page) === x + 1 ? 'text-bold' : ''}
                        variant="light"
                        id='btn-page'
                      >
                        {x + 1}
                      </Button>
                    </LinkContainer>
                  ))}
                </div>
              </>
            )}
          </Col>
        </Row>
      </div>
      <Footer/>
    </React.Fragment>
  );
}
