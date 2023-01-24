import React, { Component } from 'react'
import { createPortal } from 'react-dom';
import { ModalStyled } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount(){
    window.addEventListener('keydown', this.handleKeyDown);
  };
  componentWillUnmount(){
    window.removeEventListener('keydown', this.handleKeyDown);
  };

  handleKeyDown = (e) => {
    if(e.code === 'Escape'){
        this.props.closeModal();
    }
  };
  handleBackdropClick = (e) => {
    if(e.currentTarget !== e.target){
        this.props.closeModal();
    }
  };

  render() {
    return createPortal(
      <ModalStyled onClick={this.handleBackdropClick}>
          <div className='modal-content'>{this.props.children}</div>
      </ModalStyled>,
      modalRoot
    );
  }
};