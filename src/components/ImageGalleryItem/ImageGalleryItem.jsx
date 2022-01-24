import React from 'react';
import styles from './ImageGalleryItem.module.scss';

const ImageGalleryItem = ({src, alt, largeImageURL}) =>{
    return (
        <li className={styles.ImageGalleryItem}>
            <img src={src} alt={alt} data-source={largeImageURL} className={styles.ImageGalleryItem_image}/>
        </li>
    );
   
};

export default ImageGalleryItem;