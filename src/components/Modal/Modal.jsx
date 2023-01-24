import React from 'react';
import { createPortal } from 'react-dom';
import { ModalStyled } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children }) => {
  return createPortal(
    <ModalStyled>
        <div className='modal-content'>{children}</div>
    </ModalStyled>,
    modalRoot
  );
};

export default Modal;