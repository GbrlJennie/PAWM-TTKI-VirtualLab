import React, {useState, useEffect, use} from 'react';
import '../styles/Header.css';
import tabaImg from '../assets/logo.png';
import { supabase } from '../supabaseClient';

const Header = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  // Ambil inisial
const avatarInitial = displayName.charAt(0).toUpperCase();

  return (
    <header className="header">
      <div className="header-left">
          <img src={tabaImg} alt="Logo" width="40" height="40" /> <span className="logo-text">taba</span>
      </div>
      <div className="user-profile">
        <div className="avatar">{avatarInitial}</div>
        <div className="user-info">
          <span className="username">{displayName}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;