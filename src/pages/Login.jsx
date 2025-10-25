import { useState } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import '../styles/Login.css';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login:', { email, password });
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log('Google login');
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <div className="login-header">
          <img src="/src/assets/logo.png" alt="Taba Logo" className="login-logo" />
          <span className="login-brand">taba</span>
          <span className="login-greeting">Selamat datang!</span>
        </div>

        <div className="login-card">
          <button className="back-button">
            <ArrowLeft size={24} />
          </button>

          <h1 className="login-title">Masuk Sekarang!</h1>

          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="email"
              placeholder="Tuliskan Email kamu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />

            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Tuliskan Password kamu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button type="submit" className="login-button">
              Masuk →
            </button>
          </form>

          <div className="divider">
            <span>atau</span>
          </div>

          <button onClick={handleGoogleLogin} className="google-button">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="google-icon" />
            Masuk menggunakan Google
          </button>

          <p className="signup-text">
            Belum mendaftar? <a href="/register">Daftar di sini</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;