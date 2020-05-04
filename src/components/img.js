import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const Img = ({ img }) => (
  <div>
    <img src={img.urls.small} alt={img.alt_description} />
    <div className="img-info">
      <a href={img.links.html}>{img.user.name}</a>
      <span>
        {img.likes}
        {img.liked_by_user ? (
          <span style={{ color: '#ff5656' }}>&#10084;</span>
        ) : (
          <span>&#10084;</span>
        )}
      </span>
    </div>
    <Moment className="moment" fromNow>
      {img.created_at}
    </Moment>
  </div>
);

Img.propTypes = {
  img: PropTypes.object.isRequired,
};

export default Img;
