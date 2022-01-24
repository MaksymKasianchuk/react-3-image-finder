import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import styles from './ImageGallery.module.scss';

const ImageGallery = ({ images, onItemClick }) => {
    return (
        <ul onClick={onItemClick} className={styles.ImageGallery}>
          {images.map(({ id, webformatURL, tags, largeImageURL}) => (
              <ImageGalleryItem key={id} src={webformatURL} alt={tags} largeImageURL={largeImageURL} />
          ))}
        </ul>
    );
};

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
    onItemClick: PropTypes.func.isRequired,
};

export default ImageGallery;