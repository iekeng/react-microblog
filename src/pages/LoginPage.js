import Body from '../components/Body'
import { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputField from '../components/InputField'

export default function LoginPage() {
  const [formErrors, setFormErrors] = useState({})
  const passwordField = useRef()
  const usernameField = useRef()

  useEffect(() => {
    usernameField.current.focus();
  }, [])


  const onSubmit = (ev) => {
    ev.preventDefault();

    const username = usernameField.current.value;
    const password = passwordField.current.value;

    const errors = {};
    if (!username) {
      errors.username = "Username field must not be empty.";
    }
    if (!password) {
      errors.password = "Password field must not be empty.";
    }
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    console.log(`You entered ${username}:${password}`);

    //log user in
  }
  return (
    <Body>
      <h1>Login Form</h1>
      <Form onSubmit={onSubmit}>
        <InputField name="username" fieldRef={usernameField} 
          label="Username or Email" error={formErrors.username} />
        <InputField name="username" label="Password" type="password"
          fieldRef={passwordField} error={formErrors.password} />
        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </Body>
)
}