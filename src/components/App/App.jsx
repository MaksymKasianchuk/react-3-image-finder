import React, { Component } from 'react'
import { nanoid } from 'nanoid';
import { Container } from './App.styled';
import Modal from 'components/Modal';
import Searchbar from 'components/Searchbar';
import Section from 'components/Section';

const STATUS ={
  
}

export default class App extends Component {
  state ={
    searchQuery: '',
    status: ''
  }

  handleSubmit = () =>{

  }

  render() {

    return (
      <>
        <Searchbar submitHandler={()=>this.handleSubmit} />
        {/* <Modal></Modal> */}
      </>
    );
  }
}
