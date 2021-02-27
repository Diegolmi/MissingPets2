import styled from '@emotion/styled';

export const Formulario = styled.form`
    max-width: 600px;
    width: 95%auto;
    margin: 5rem auto 0 auto;

    fieldset {
        margin: 1rem;
        border: 1px solid #e1e1e1;
        font-size: .5rem;
        padding: 1rem;
    }
`
export const Campo = styled.div`
    margin-bottom: 1rem;
    display: flex;
    align-items: center;

    label {
        flex: 0 0 150px;
        font-size: 1rem;
    }

    input, textarea {
        flex: 1;
        padding: 1rem;
    }
    textarea {
        height: 400px
    }
`

export const InputSubmit = styled.input`
background-color: #00bfbf;
width: 100%;
padding: 1rem;
color: #FFF;
font-size: 1rem;
text-align: center;
text-transform: uppercase;
border: none;
font-family: 'PT Sans', sans-serif;
font-weight: 700;

&:hover {
    cursor: pointer;
}
`
export const Error = styled.p`
     background-color: red;
     padding: .3rem;
     font-family:'PT Sans', sans-serif;
     font-weight: 700;
     font-size: 1rem;
     color: #FFF;
     text-align: center;
     text-transform: uppercase;
     margin: 1rem 0;

`;