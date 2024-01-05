import Body from '../components/Body'
import { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputField from '../components/InputField'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';
import { useFlash } from '../contexts/FlashProvider';

export default function LoginPage() {
  const [formErrors, setFormErrors] = useState({})
  const passwordField = useRef()
  const usernameField = useRef()
  const {login} = useUser();
  const flash = useFlash();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    usernameField.current.focus();
  }, [])


  const onSubmit = async (ev) => {
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

    //log user 
    const result = await login(username, password);
    if (result === 'fail') {
      flash('Invalid username or password', 'danger');
    } else if (result === 'ok') {
      console.log(result)
      let next = '/';
      if (location.state && location.state.next) {
        next = location.state.next;
      }
      navigate(next);
    }
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
      <hr />
      <p>Don&apos;t have an account? <Link to="/register">Register here</Link>!</p>
    </Body>
)
}