import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            value={ email }
            data-testid="email-input"
            onChange={ ({ target }) => setEmail(target.value) }
            className="form-control"
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            value={ password }
            data-testid="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
            className="form-control"
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !isDisabled }
          className="btn btn-success"
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
