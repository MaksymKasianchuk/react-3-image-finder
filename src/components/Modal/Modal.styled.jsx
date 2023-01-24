import styled from '@emotion/styled';

export const ModalStyled = styled.div`
    background: rgb(0 0 0 / 45%);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    &>.modal-content{
        background: #fff;
        padding: 20px;
        border-radius: ${props => props.theme.radii.cardBorderRadius}px;
        min-width: 300px;
        min-height: 100px;
    }
`;