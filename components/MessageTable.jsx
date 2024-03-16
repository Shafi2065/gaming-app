import React, { useState } from "react";
import Table from "react-bootstrap/Table";

export default function MessageTable() {
  const [selectedOption, setSelectedOption] = useState("friendRequests");

  return (
    <div>
      <div>
        <button onClick={() => setSelectedOption("friendRequests")}>
          Friend Requests
        </button>
        <button onClick={() => setSelectedOption("messages")}>Messages</button>
      </div>

      {selectedOption === "friendRequests" && (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Display Name</th>
              <th>Profile Link</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      )}

      {selectedOption === "messages" && (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Display Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Larry the Bird</td>
            </tr>
          </tbody>
        </Table>
      )}
    </div>
  );
}
