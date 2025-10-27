import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import AddUser from "./components/AddUser";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

  // load users from API and localStorage-added users
  useEffect(() => {
    let mounted = true;
    async function fetchUsers() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        // merge with locally added users stored in localStorage
        const local = JSON.parse(localStorage.getItem("addedUsers") || "[]");
        if (mounted) setUsers([...data, ...local]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
    return () => {
      mounted = false;
    };
  }, []);

  function addUser(newUser) {
    // assign a unique ID beyond API ids
    const id = Date.now();
    const userWithId = { id, ...newUser };
    const updated = [...users, userWithId];
    setUsers(updated);
    // persist only the locally added users
    const persisted = JSON.parse(localStorage.getItem("addedUsers") || "[]");
    localStorage.setItem(
      "addedUsers",
      JSON.stringify([...persisted, userWithId])
    );
    navigate("/");
  }

  // theme toggle
  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <div className="app-root">
      <header className="topbar">
        <div className="container">
          <Link to="/" className="logo">
            User Dashboard
          </Link>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/add">Add User</Link>
            <button className="btn small" onClick={toggleTheme}>
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </nav>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route
            path="/"
            element={<UserList users={users} loading={loading} error={error} />}
          />
          <Route path="/users/:id" element={<UserDetails users={users} />} />
          <Route path="/add" element={<AddUser onAdd={addUser} />} />
          <Route
            path="*"
            element={
              <div>
                Page not found —{" "}
                <button onClick={() => navigate("/")}>Go home</button>
              </div>
            }
          />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">Built with React • Demo dashboard</div>
      </footer>
    </div>
  );
}
