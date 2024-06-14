import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="login_page">
      <img src="logo.svg" alt="" />
      <h2 className="login_page--title">Faça seu Login</h2>
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
          />
        </div>
        <div className="input_box">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={ password }
            data-testid="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </div>
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !isDisabled }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
