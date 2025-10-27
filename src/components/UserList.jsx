import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";

export default function UserList({ users = [], loading, error }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        (u.name || "").toLowerCase().includes(q) ||
        (u.email || "").toLowerCase().includes(q)
    );
  }, [users, query]);

  return (
    <section>
      <div className="list-header">
        <h1>Users</h1>
        <div className="search">
          <input
            aria-label="search"
            placeholder="Search by name or email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Link to="/add" className="btn">
            + Add User
          </Link>
        </div>
      </div>

      {loading && <div className="center">Loading users...</div>}
      {error && <div className="center error">Error: {error}</div>}

      {!loading && !error && filtered.length === 0 && (
        <div className="center">No users found.</div>
      )}

      <div className="grid">
        {filtered.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
}
