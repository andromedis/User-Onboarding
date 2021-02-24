import React, { useState } from 'react';
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


function Form(props) {
  const { postUser } = props;
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState(initialFormErrors);

  const onSubmit = evt => {
    evt.preventDefault();
    const newUser = {
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
      terms: values.terms,
    }
    postUser(newUser);
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

  return (
    <form onSubmit={onSubmit}>
      <label>Name
        <input
          name='name'
          type='text'
          value={values.name}
          onChange={onChange}
        />
      </label>

      <label>Email
        <input
          name='email'
          type='text'
          value={values.email}
          onChange={onChange}
        />
      </label>

      <label>Password
        <input 
          name='password'
          type='password'
          value={values.password}
          onChange={onChange}
        />
      </label>

      <label>Accept Terms of Service
        <input 
          type='checkbox'
          name='terms'
          onChange={onChange}
          checked={values.terms}
        />
      </label>

      <button>Submit</button>
    </form>
  );
}

export default Form;