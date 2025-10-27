import { useState } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import '../styles/Register.css'; 
import { supabase } from '../supabaseClient';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle register logic here
    console.log('Register:', { firstName, lastName, email, password });
  };

  const handleGoogleLogin = async() => {
    const {error} = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) console.log('Error: ', error.message);
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

          <h1 className="login-title">Daftar Sekarang!</h1>

          <form onSubmit={handleSubmit} className="login-form">
            {/* Input Nama Depan & Belakang */}
            <div className="form-row">
              <input
                type="text"
                placeholder="Nama depan"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="login-input"
                required
              />
              <input
                type="text"
                placeholder="Nama belakang"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="login-input"
                required
              />
            </div>

            {/* Input Email */}
            <input
              type="email"
              placeholder="Tuliskan Email kamu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />

            {/* Input Password */}
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
              Daftar →
            </button>
          </form>

          <div className="divider">
            <span>atau</span>
          </div>

          <button onClick={handleGoogleLogin} className="google-button">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="google-icon" />
            Daftar menggunakan Google
          </button>

          <p className="signup-text">
            Sudah mendaftar? <a href="/login">Masuk di sini</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;