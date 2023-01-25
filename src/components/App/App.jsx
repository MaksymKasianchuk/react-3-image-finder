import React, { Component } from 'react'
import { Container, ErrorMessage, LoadMoreBtnWrap } from './App.styled';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
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
      if(newImages.length === 0){
        this.setState({
          error: `Nothing found for your request: ${query}`,
          status: STATUSES.REJECTED
        });
      }
      else{
        this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
          status: STATUSES.RESOLVED
        }));
      }
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

    if(status === STATUSES.IDLE){
      return(
        <Searchbar submitHandler={this.handleSubmit} />
      );
    };

    if(status === STATUSES.PENDING){
      return(
        <>
        <Searchbar submitHandler={this.handleSubmit} />
        <Container>
          <ImageGallery images={images}/>
          <Loader/>
        </Container>
        </>
      );
    };

    if(status === STATUSES.RESOLVED){
      return(
        <>
          <Searchbar submitHandler={this.handleSubmit} />
          <Container>
            <ImageGallery images={images}/>
              <LoadMoreBtnWrap>
                <Button clickHandler={this.loadMore}/>
              </LoadMoreBtnWrap>
          </Container>
        </>
      );
    }

    if(status === STATUSES.REJECTED){
      return(
        <>
          <Searchbar submitHandler={this.handleSubmit} />
          <Container>
            <ErrorMessage>{error}</ErrorMessage>
          </Container>
        </>
      );
    }
  }
}
