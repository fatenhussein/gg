import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from '../DesignerRating';
import { Store } from '../../Store';
import axios from 'axios';
function Designer(props) {
  const { designer } = props;
 

  return (
    <Card id="d-card" >
      <Link to={`/designer/${designer.slug}`}>
        <img
          src={designer.image}
          className="card-img-top"
          alt={designer.name}
          style={{ height: 300,objectFit: 'cover' }}
        />
      </Link>

      <Card.Body>
        <Link to={`/designer/${designer.slug}`}>
          <Card.Title
            style={{
              color: '#415e6b',
              fontSize: '1.2rem',
              fontWeight: 200,
              fontFamily: 'Poppins',
              textTransform:'capitalize'
            }}
          >
            {designer.name}
          </Card.Title>
        </Link>
        <Rating rating={designer.rating} />
      </Card.Body>
    </Card>
  );
}
export default Designer;
