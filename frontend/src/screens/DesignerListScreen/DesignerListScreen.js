import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { Store } from '../../Store';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import ShopNav from '../../components/shopNav/ShopNav';
import { getError } from '../../utils';
//import './ProductListScreen.css';
import "./DesignerListScreen.css"
import Footer from '../../components/footer/Footer';
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
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return {
        ...state,
        loadingCreate: false,
      };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };

    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false };

    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

export default function DesignerListScreen() {
  const [
    {
      loading,
      error,
      designers,
      pages,
      loadingCreate,
      loadingDelete,
      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/designers/admin?page=${page} `, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {}
    };
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [page, userInfo, successDelete]);

  const createHandler = async () => {
    if (window.confirm('Are you sure to create?')) {
      try {
        dispatch({ type: 'CREATE_REQUEST' });
        const { data } = await axios.post(
          '/api/designers',
          {},
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        toast.success('designer created successfully');
        dispatch({ type: 'CREATE_SUCCESS' });
        navigate(`/admin/designer/${data.designer._id}`);
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: 'CREATE_FAIL',
        });
      }
    }
  };
  const deleteHandler = async (designer) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        await axios.delete(`/api/designers/${designer._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('designer deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
  };
  return (
    <React.Fragment>
   <Navbar/>
      <div className="designer-list-container ">
        <Row className="designer-list-row">
          <Col>
            <h1 className="designerList-title">Designers</h1>
          </Col>
          <Col className="col text-end">
            <div>
              <Button type="button" onClick={createHandler} className='creat-designer-btn'>
                Create Designer
              </Button>
            </div>
          </Col>
        </Row>

        {loadingCreate && <LoadingBox></LoadingBox>}
        {loadingDelete && <LoadingBox></LoadingBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>

                  <th>CATEGORY</th>
                </tr>
              </thead>
              <tbody className="tbody-designer-list">
                {designers.map((designer) => (
                  <tr key={designer._id} id="tbody-designer-list">
                    <td>{designer._id}</td>
                    <td>{designer.name}</td>

                    <td>{designer.category}</td>

                    <td className="edit-delet-designerList">
                      <Button
                      className='designer-edit-delet--btn'
                        type="button"
                        variant="light"
                        onClick={() =>
                          navigate(`/admin/designer/${designer._id}`)
                        }
                      >
                        Edit
                      </Button>
                      &nbsp;
                      <Button
                      
                      className='designer-edit-delet--btn'
                        type="button"
                        variant="light"
                        onClick={() => deleteHandler(designer)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pages">
              {[...Array(pages).keys()].map((x) => (
                <Link
                  className={x + 1 === Number(page) ? 'btn text-bold' : 'btn'}
                  key={x + 1}
                  to={`/admin/designers?page=${x + 1}`}
                >
                  {x + 1}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
}
