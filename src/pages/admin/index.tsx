import { useState } from 'react';
import { useRouter } from 'next/router';

const AdminPanel = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  const router = useRouter();
  const menus = ['Dashboard', 'Products', 'Orders', 'Users', 'Settings'];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin1') {
      setIsLoggedIn(true);
      router.push('/admin/dashboard'); // Redirect to admin dashboard after login
    } else {
      alert('Invalid credentials!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    router.push('/'); // Redirect to home page after logout
  };

  return (
    <div className="h-screen">
      {!isLoggedIn ? (
        // Login Screen
        <div className="flex items-center justify-center h-full bg-gray-100">
          <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
              Login
            </button>
          </form>
        </div>
      ) : (
        // Admin Panel
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-gray-800 text-white flex flex-col">
            <h2 className="text-2xl font-bold p-4 border-b border-gray-700">Admin</h2>
            <ul className="flex-1">
              {menus.map((menu) => (
                <li
                  key={menu}
                  className={`p-4 cursor-pointer hover:bg-gray-700 ${activeMenu === menu ? 'bg-gray-700' : ''}`}
                  onClick={() => setActiveMenu(menu)}
                >
                  {menu}
                </li>
              ))}
            </ul>
            <button className="p-4 bg-red-500 text-white hover:bg-red-600" onClick={handleLogout}>
              Logout
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-4">{activeMenu}</h1>
            <p className="text-gray-600">Welcome to the {activeMenu} page!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;


