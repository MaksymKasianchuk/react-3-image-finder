import React, { Component } from 'react'
import Modal from 'components/Modal';

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
            <div onClick={this.toggleShowModal}>
                <img src={webformatURL} alt={id} />
                {showModal && 
                    (<Modal closeModal={this.toggleShowModal}>
                        <img src={largeImageURL} width="900" alt="big image" />
                    </Modal>)
                }
            </div>
        )
    }
}
