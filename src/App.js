import React, { Component } from 'react';
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Modal from './components/Modal';
import Loader from './components/Loader';

import imagesApi from './services/images-api';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    currentLargeImageURL: '',
    showModal: false,
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.searchQuery !== this.state.searchQuery){
      this.fetchImages();
    }
  };

  onChangeQuery = query =>{
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null
    });
  };

  fetchImages = () => {
    const {currentPage, searchQuery} = this.state;
    const options = {searchQuery, currentPage};

    this.setState({ isLoading: true });
    
    imagesApi
      .fetchImages(options)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          currentPage: prevState.currentPage + 1
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({isLoading: false}));
  };

  onModalOpen = (e) => {
    const {target} = e;
    if(target.nodeName === 'IMG'){
      const largeUrl = target.dataset.source;
      this.setState({
        showModal: true,
        currentLargeImageURL: largeUrl
      });
    }
  };

  closeModal = () => {
    this.setState({ showModal: false, currentLargeImageURL: '' });
  };

  render(){
    const {images, isLoading, error, showModal, currentLargeImageURL} = this.state;
    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

    return (
      <div>
        {error && <h1>Error:{error}</h1>}
        <Searchbar onSubmit={this.onChangeQuery} />
        <ImageGallery images={images} onItemClick={this.onModalOpen}/>
        {isLoading && (<Loader/>)}
        {shouldRenderLoadMoreButton && (
          <Button onClick={this.fetchImages} />
        )}
        {showModal && (
          <Modal onClose={this.closeModal}>
            <img src={currentLargeImageURL} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
