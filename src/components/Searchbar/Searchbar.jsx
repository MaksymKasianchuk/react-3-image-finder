// import PropTypes from 'prop-types';
// import * as yup from 'yup';
import { nanoid } from 'nanoid';
import { Formik, Field } from 'formik';
import { SearchbarStyled, FormGroup, FormButton} from './Searchbar.styled';

const Searchbar = ({ submitHandler }) => {
    const queryId = nanoid();
    const handleSubmit = (values, actions) => {
        submitHandler(values);
        actions.resetForm();
    }
    return(
        <Formik
        initialValues={{query: ''}}
        onSubmit={handleSubmit}
        >
            <SearchbarStyled>
                <FormGroup>
                    <label htmlFor={queryId}>
                        <Field type="text" id={queryId} name="query" placeholder="Enter search query" />
                    </label>
                </FormGroup>
                <FormButton type="submit">🔍</FormButton>
            </SearchbarStyled>
        </Formik>
    ) 
};

export default Searchbar;