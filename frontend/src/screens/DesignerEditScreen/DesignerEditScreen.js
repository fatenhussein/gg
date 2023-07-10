import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../../Store';
import { getError } from '../../utils';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import './DesignerEditScreen.css';
import ShopNav from '../../components/shopNav/ShopNav';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/NavBar/NavBar';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};
export default function DesignerEditScreen() {
  const navigate = useNavigate();
  const params = useParams(); // /designer/:id
  const { id: designerId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/designers/${designerId}`);
        setName(data.name);
        setSlug(data.slug);

        setImage(data.image);
        setCategory(data.category);

        setDescription(data.description);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [designerId]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/designers/${designerId}`,
        {
          _id: designerId,
          name,
          slug,
          image,
          category,
          description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Designer updated successfully');
      navigate('/admin/designers');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post('/api/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: 'UPLOAD_SUCCESS' });

      toast.success('Image uploaded successfully');
      setImage(data.secure_url);
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };
  return (
    <React.Fragment>
      <Navbar />
      <div className="designer-edit-container">
        <Helmet>
          <title>Edit designer ${designerId}</title>
        </Helmet>
        <h1 className="designer-edit-title">Edit designer {designerId}</h1>

        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label className="designer-edit-label">Name</Form.Label>
              <Form.Control
                className="designer-edit-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="slug">
              <Form.Label className="designer-edit-label">Slug</Form.Label>
              <Form.Control
                className="designer-edit-input"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
              <Form.Label className="designer-edit-label">
                Image File
              </Form.Label>
              <Form.Control
                className="designer-edit-input"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="imageFile">
              <Form.Label className="designer-edit-label">
                Upload File
              </Form.Label>
              <Form.Control
                className="designer-edit-input"
                type="file"
                onChange={uploadFileHandler}
              />
              {loadingUpload && <LoadingBox></LoadingBox>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label className="designer-edit-label">Category</Form.Label>
              <Form.Control
                className="designer-edit-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label className="designer-edit-label">
                Description
              </Form.Label>
              <Form.Control
                className="designer-edit-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <div className="mb-3">
              <Button
                disabled={loadingUpdate}
                type="submit"
                className="designer-edit-btn"
              >
                Update
              </Button>
              {loadingUpdate && <LoadingBox></LoadingBox>}
            </div>
          </Form>
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
}
