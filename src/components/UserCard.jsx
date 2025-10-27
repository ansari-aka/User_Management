import React from "react";
import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  const company = user.company?.name || user.company || "—";
  return (
    <article className="card">
      <h3>{user.name}</h3>
      <p className="muted">{user.email}</p>
      <p className="muted">{user.phone}</p>
      <p className="muted">{company}</p>
      <Link to={`/users/${user.id}`} className="details">
        View Details
      </Link>
    </article>
  );
}
