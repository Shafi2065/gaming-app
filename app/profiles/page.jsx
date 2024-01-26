"use client";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { ButtonGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import React from "react";
import createProfile from "./userProfiles";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./profile.css";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function userProfile() {
  const [displayName, setDisplayName] = useState("");
  const [platform, setPlatform] = useState("");
  const [playTimes, setPlayTimes] = useState("");
  const [checkedTags, setCheckedTags] = useState([]);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProfile(displayName, platform, playTimes, checkedTags);

      Swal.fire({
        title: "Profile Successfully Created",
        text: "redirecting to your profile",
        icon: "success",
      });

      setTimeout(() => {
        Swal.close();
        router.push("/");
      }, 2000);
    } catch (error) {
      console.log("Error creating profile", error, error.code);
    }
  };

  const tags = [
    { name: "Parent", value: "Parent" },
    { name: "Student", value: "student" },
    { name: "Casual Player", value: "Casual Player" },
    { name: "Competitive Player", value: "Competitive Player" },
  ];

  const handleTagChange = (tag) => {
    const isChecked = checkedTags.includes(tag);
    if (isChecked) {
      setCheckedTags(checkedTags.filter((checkedTag) => checkedTag !== tag));
    } else {
      setCheckedTags([...checkedTags, tag]);
    }
  };
  return (
    <div className="FormDiv">
      <fieldset>
        <legend>Create a Profile</legend>
        <Form onSubmit={handleSubmit} id="Form">
          <p>Enter a display name: </p>
          <Row>
            <Col>
              <Form.Control
                aria-describedby="displayHelp"
                placeholder="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <Form.Text id="displayHelp">
                Your display name will be used across the website, different
                from username which is only used for logging back into the
                website.
              </Form.Text>
            </Col>
          </Row>

          <p>What platforms do you play on?</p>
          <Row>
            <Col>
              <Form.Select
                className="mb-2"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                <option>Open this menu</option>
                <option>Playstation</option>
                <option>PC</option>
                <option>XBOX</option>
                <option>Nintendo</option>
              </Form.Select>
            </Col>
          </Row>

          <p>When do you usually play?</p>
          <Row>
            <Col>
              <Form.Select
                className="mb-3"
                value={playTimes}
                onChange={(e) => setPlayTimes(e.target.value)}
              >
                <option>Open this menu</option>
                <option>Mornings</option>
                <option>Afternoons</option>
                <option>Evenings</option>
                <option>Nights</option>
              </Form.Select>
            </Col>
          </Row>
          <p>Select all tags that apply: </p>
          <Row>
            <Col>
              <ButtonGroup className="mb-2">
                {tags.map((tag, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`tags-${idx}`}
                    type="checkbox"
                    variant="secondary"
                    name="tags"
                    value={tag.value}
                    checked={checkedTags.includes(tag.value)}
                    onChange={() => handleTagChange(tag.value)}
                  >
                    {tag.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Col>
          </Row>
          <Button type="submit">Submit</Button>
        </Form>
      </fieldset>
    </div>
  );
}
