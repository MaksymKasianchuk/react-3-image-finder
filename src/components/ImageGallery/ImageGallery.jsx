import ImageGalleryItem from './ImageGalleryItem';
import { nanoid } from 'nanoid';


const ImageGallery = ({ images }) => {
    return (
        <ul>
            {
                images.map(image => (
                    <li key={nanoid()}><ImageGalleryItem image={image}/></li>
                ))
            }
        </ul>
    )
};

export default ImageGallery;
