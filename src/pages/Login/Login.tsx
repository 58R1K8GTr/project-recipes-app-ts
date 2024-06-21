import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/newLogo.png';
import './styles.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const testEmail = emailRegex.test(email);
  const isDisabled = password.length > 6 && testEmail;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    navigate('/meals');
  };

  return (
    <div className="login_page overlay">
      <img src={ logo } className="login_page--logo" alt="" />
      <h2 className="login_page--title">Login to your account</h2>
      <form onSubmit={ handleSubmit }>
        <div className="input_box">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={ email }
            data-testid="email-input"
            onChange={ ({ target }) => setEmail(target.value) }
            className="form-control"
          />
        </div>
        <div className="input_box">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={ password }
            data-testid="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
            className="form-control"
          />
        </div>
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !isDisabled }
          className="btn-like-bootstrap"
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
