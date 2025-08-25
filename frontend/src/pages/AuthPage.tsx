import React, { useState } from 'react';
import { login, register, UserDTO } from '../api/client';
import { useAuth } from '../state/AuthContext';

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ usernameOrEmail: '', password: '', username: '', email: '' });
  const { user, setUser } = useAuth();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      if (mode === 'login') {
        const u = await login(form.usernameOrEmail, form.password);
        setUser(u);
      } else {
        const u = await register(form.username, form.email, form.password);
        setUser(u);
        setMode('login');
      }
    } catch (e: any) {
      setError(e.message ?? 'Unexpected error');
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="border rounded p-6 bg-white">
        <div className="flex gap-4 mb-4">
          <button onClick={() => setMode('login')} className={`px-3 py-1 rounded ${mode==='login' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>Login</button>
          <button onClick={() => setMode('register')} className={`px-3 py-1 rounded ${mode==='register' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>Register</button>
        </div>
        <form onSubmit={onSubmit} className="space-y-3">
          {mode === 'login' ? (
            <>
              <input className="w-full border rounded px-3 py-2" placeholder="Username or Email" value={form.usernameOrEmail} onChange={e => setForm({ ...form, usernameOrEmail: e.target.value })} />
              <input className="w-full border rounded px-3 py-2" type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </>
          ) : (
            <>
              <input className="w-full border rounded px-3 py-2" placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
              <input className="w-full border rounded px-3 py-2" type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <input className="w-full border rounded px-3 py-2" type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </>
          )}
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button type="submit" className="w-full bg-blue-600 text-white rounded px-4 py-2">
            {mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
      {user && (
        <div className="mt-4 text-sm text-green-700">Logged in as {user.username} ({user.email})</div>
      )}
    </div>
  );
};


