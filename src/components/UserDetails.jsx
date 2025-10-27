import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UserDetails({ users = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const uid = Number(id);
  // find by numeric or string id
  const user = users.find((u) => Number(u.id) === uid || String(u.id) === id);

  if (!user) {
    return (
      <div>
        <button className="btn" onClick={() => navigate(-1)}>
          Back
        </button>
        <div className="center">User not found.</div>
      </div>
    );
  }

  return (
    <div className="details-wrap">
      <button className="btn" onClick={() => navigate(-1)}>
        Back
      </button>
      <h2>{user.name}</h2>
      <div className="details-grid">
        <div>
          <strong>Email</strong>
          <div>{user.email}</div>
        </div>
        <div>
          <strong>Phone</strong>
          <div>{user.phone}</div>
        </div>
        <div>
          <strong>Username</strong>
          <div>{user.username || "—"}</div>
        </div>
        <div>
          <strong>Website</strong>
          <div>{user.website || "—"}</div>
        </div>
        <div className="full">
          <strong>Company</strong>
          <div>{user.company?.name || user.company || "—"}</div>
          {user.company?.catchPhrase && (
            <div className="muted">{user.company.catchPhrase}</div>
          )}
        </div>
        <div className="full">
          <strong>Address</strong>
          <div>
            {user.address ? (
              <div>
                {user.address.suite ? `${user.address.suite}, ` : ""}
                {user.address.street} — {user.address.city} <br />
                ZIP: {user.address.zipcode}
              </div>
            ) : (
              "—"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
