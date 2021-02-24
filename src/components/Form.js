import userEvent from '@testing-library/user-event';
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import formSchema from '../validation/formSchema';

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  terms: false,
}

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  terms: '',
}

const initialSubmitDisabled = true;

function Form(props) {
  const { postUser } = props;
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialSubmitDisabled);

  const onSubmit = evt => {
    evt.preventDefault();
    const newUser = {
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
      terms: values.terms,
    }
    postUser(newUser);
    setValues(initialFormValues);
  }

  const onChange = evt => {
    const { type, name, value, checked } = evt.target;
    const valueToUse = ( type === 'checkbox' ) ? checked : value;
    yup.reach(formSchema, name)
      .validate(valueToUse)
      .then(() => {
        setErrors({...errors, [name]: ''});
      })
      .catch(err => {
        setErrors({...errors, [name]: err.errors[0]})
      });
    setValues({...values, [name]: valueToUse});
  }

  useEffect(() => {
    formSchema.isValid(values)
      .then(valid => {
        setDisabled(!valid)
      })
  }, [values])

  return (
    <form onSubmit={onSubmit}>
      <h2>Add User</h2>
      <label>Name
        <input
          name='name'
          type='text'
          value={values.name}
          onChange={onChange}
        />
        <div>{errors.name}</div>
      </label>

      <label>Email
        <input
          name='email'
          type='text'
          value={values.email}
          onChange={onChange}
        />
        <div>{errors.email}</div>
      </label>

      <label>Password
        <input 
          name='password'
          type='password'
          value={values.password}
          onChange={onChange}
        />
        <div>{errors.password}</div>
      </label>

      <label>Accept Terms of Service
        <input 
          type='checkbox'
          name='terms'
          onChange={onChange}
          checked={values.terms}
        />
        <div>{errors.terms}</div>
      </label>

      <button disabled={disabled}>Submit</button>

    </form>
  );
}

export default Form;