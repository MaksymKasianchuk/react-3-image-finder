import React, { Component } from 'react'
import Modal from 'components/Modal';
import { ImageGalleryItemStyled, GalleryItemImg } from './ImageGallery.styled'

export default class ImageGalleryItem extends Component {
    state = {
        showModal: false,
    }
    toggleShowModal = () => {
        this.setState(prevState =>({showModal: !prevState.showModal}));
    };

    render() {
        const { showModal } = this.state;
        const { webformatURL, largeImageURL, id } = this.props.image;
        return (
            <ImageGalleryItemStyled type="button" onClick={this.toggleShowModal}>
                <GalleryItemImg src={webformatURL} alt={id} />
                {showModal && 
                    (<Modal closeModal={this.toggleShowModal}>
                        <img src={largeImageURL} width="900" alt="big image" />
                    </Modal>)
                }
            </ImageGalleryItemStyled>
        )
    }
}
