import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Body from '../components/Body';
import InputField from '../components/InputField';
import { useEffect, useState, useRef } from 'react';

export default function RegistrationPage() {
  const [formErrors, setFormErrors] = useState({});
  const usernameField = useRef();
  const emailField = useRef();
  const passwordField = useRef();
  const password2Field = useRef();

  const onSubmit = async (event) => {
    //TODO;
  }

  return (
    <Body>
      <h1>Register</h1>
      <Form onSubmit={onSubmit}>
        <InputField  
          name="username" label="Username" 
          error={formErrors.username} fieldRef={usernameField}/>
        <InputField
          name="email" label="Email"
          error={formErrors.email} fieldRef={emailField} />
        <InputField
          name="password" label="Password"
          error={formErrors.password} fieldRef={passwordField} />
        <InputField
          name="password" label="Password again"
          error={formErrors.password2} fieldRef={password2Field} />
        <Button variant='primary' type="submit">Register</Button>
      </Form>
    </Body>
  )
}