import React, { Component } from 'react'
import { Container } from './App.styled';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import * as API from 'api/api';

const STATUSES = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved'
};

export default class App extends Component {
  state ={
    images: [],
    query: '',
    page: 1,
    error: '',
    status: STATUSES.IDLE,
  }

  componentDidUpdate(_, prevState){
    const { query, page } = this.state;
    if(prevState.query !== query || prevState.page !== page){
      this.fetchImages();
    }
  };

  handleSubmit = (values) =>{
    const { query } = values;
    this.setState({ 
      images: [],
      query, 
      page: 1,
      error: '',
    });
  };

  loadMore = () => {
    this.setState(prevState => ({page: prevState.page + 1}));
  };

  fetchImages = async () => {
    this.setState({status: STATUSES.PENDING});
    const { query, page } = this.state;
    try {
      const newImages = await API.searchImages(query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        status: STATUSES.RESOLVED
      }));
    } 
    catch (error) {
      this.setState({
        error,
        status: STATUSES.REJECTED
      });
    }
  }

  render() {
    const { images, query, page, error, status } = this.state;
    return (
      <>
        <Searchbar submitHandler={this.handleSubmit} />
        <Container>
          <ImageGallery images={images}/>
          {images.length > 0 && (<Button clickHandler={this.loadMore}/>)}
        </Container>
      </>
    );
  }
}
