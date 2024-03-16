"use client";
import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import GetAllProfiles from "./getAllProfiles";
import Link from "next/link";

export default function ProfileSearch() {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await GetAllProfiles();
      setProfiles(result);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Profile Search</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Logo</th>
            <th>Display Name</th>
            <th>Document ID</th>
            <th>Profile Link</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile, index) => (
            <tr key={profile.id}>
              <td>
               <img src={profile.imageUrl} alt="Profile Image" width="50" height="50" />
              </td>
              <td>{index + 1}</td>
              <td>{profile.displayName}</td>
              <td>{profile.id}</td>
              <td>
                <Link href={`/profile/${profile.id}`}>View Profile</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
