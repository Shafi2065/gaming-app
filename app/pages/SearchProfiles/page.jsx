"use client";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import GetAllProfiles from "../../GetFiles/getAllProfiles";
import Link from "next/link";
import ColourNav from "@/components/Nav";

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
      <ColourNav />
      <h1>Profile Search</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>#</th>
            <th>Display Name</th>
            <th>Document ID</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile, index) => (
            <tr key={profile.id}>
              <td>
               <img src={profile.imageUrl} alt="Profile Image" width="50" height="50" />
              </td>
              <td>{index + 1}</td>
              <td> 
              <Link href={`profiles?docId=/${profile.id}`}>{profile.displayName}</Link>
                </td>
              <td>{profile.id}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
