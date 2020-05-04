import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Img from './img';

const ImgsList = ({ imgs }) => {
  return (
    <div>
      {imgs.length ? (
        <div className="container-imgs">
          {imgs.map((img) => (
            <div key={img.id}>
              <Img img={img} />
              <Link className="details" to={`/${img.id}`}>
                details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p />
      )}
    </div>
  );
};

ImgsList.propTypes = {
  imgs: PropTypes.array,
};

export default ImgsList;
