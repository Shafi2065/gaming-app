"use client";
import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToggleButtonGroup, ToggleButton, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useEffect } from "react";
import createProfile from "./userProfiles";
import { useState } from "react";
import "./profile.css";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { ProfileStepper } from "@/components/Stepper";
import Image from "react-bootstrap/Image";

export default function userProfile() {
  const [displayName, setDisplayName] = useState("");
  const [platform, setPlatform] = useState("");
  const [playTimes, setPlayTimes] = useState("");
  const [Tags, setTags] = useState("");
  const [gameImages, setGameImages] = useState();
  const [activeImage, setActiveImage] = useState(null);

  const router = useRouter();
  const [formStarted, setFormStarted] = useState(false);

  const [error, setError] = useState(null);

  const Playstation = "Playstation";
  const Nintendo = "Nintendo";
  const PC = "PC";

  const Morning = "Morning";
  const Afternoon = "Afternoon";
  const Evenings = "Evenings";
  const LateNight = "LateNight";

  const Parent = "Parent";
  const Student = "Student";
  const CasualPlayer = "Casual Player";
  const CompetitivePlayer = "Competitve Player";

  const [value, setValue] = useState([Playstation, PC, Nintendo]);
  const [PlayTimesvalue, setPlayTimesValue] = useState([
    Morning,
    Afternoon,
    Evenings,
    LateNight,
  ]);
  const [tagsValue, setTagsValue] = useState([
    Parent,
    Student,
    CasualPlayer,
    CompetitivePlayer,
  ]);

  // ToDo Sets a variable to the questions array that holds
  // the questions and is assigned the hook that holds the index of the questions
  const questions = [
    {
      label: "Enter a display name:",
      value: displayName,
      setter: setDisplayName,
    },
    {
      label: "What platforms do you play on? Select multiple if they apply:",
      value: platform,
      setter: setPlatform,
    },
    {
      label: "When do you usually play? Select multiple if they apply:",
      value: playTimes,
      setter: setPlayTimes,
    },
    {
      label: "Select all tags that apply: Select multiple if they apply:",
      value: Tags,
      setter: setTags,
    },
    {
      label: "Select the game you want to find a team for:",
      value: gameImages,
      setter: setGameImages,
    },
    {
      buttons: <></>,
    },
  ];
  const [questionIndex, setQuestionIndex] = useState(0);

  const currentQuestion = questions[questionIndex];

  const handleNext = () => {
    setQuestionIndex((questionIndex) => questionIndex + 1);
  };
  const handlePrevious = () => {
    setQuestionIndex((questionIndex) => questionIndex - 1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!displayName || !platform || !playTimes || !Tags || !gameImages) {
        throw new Error("Error Creating Profile");
      }

      await createProfile(displayName, platform, playTimes, Tags, gameImages);

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

      setError("Error Creating Profile: empty fields are not allowed");
    }
  };

  const handleChange = (val) => {
    setValue(val);
    setPlatform(val);
  };
  const handlePlayChange = (PlayTimesvalue) => {
    setPlayTimesValue(PlayTimesvalue);
    setPlayTimes(PlayTimesvalue);
  };
  const handleTagChange = (tagsValue) => {
    setTagsValue(tagsValue);
    setTags(tagsValue);
  };

  useEffect(() => {
    setTimeout(() => {
      setFormStarted(true);
    }, 100);
  }, []);

  return (
    <>
      <ProfileStepper registrationCompleted={true}/>
      <div className="FormDiv">
        <fieldset>
          <legend>Create a Profile</legend>
          <Form
            onSubmit={handleSubmit}
            id="Form"
          >
            {questionIndex === 0 && (
              <>
                <p>{currentQuestion.label}</p>
                <Row>
                  <Col>
                    <Form.Control
                      aria-describedby="displayHelp"
                      placeholder="Display Name"
                      value={displayName}
                      onChange={(e) => {
                        setDisplayName(e.target.value);
                      }}
                    />
                    <Form.Text id="displayHelp">
                      Your display name will be used across the website,
                      different from username which is only used for logging
                      back into the website.
                    </Form.Text>
                  </Col>
                </Row>
                <Button onClick={handleNext}>Next</Button>
              </>
            )}
            {questionIndex === 1 && (
              <>
                <p>{currentQuestion.label}</p>
                <Row>
                  <Col>
                    <ToggleButtonGroup
                      type="checkbox"
                      value={platform}
                      onChange={handleChange}
                      aria-required
                    >
                      <ToggleButton id="tbg-btn-1" value={Playstation}>
                        Playstation
                      </ToggleButton>
                      <ToggleButton id="tbg-btn-2" value={Nintendo}>
                        Nintendo
                      </ToggleButton>
                      <ToggleButton id="tbg-btn-3" value={PC}>
                        PC
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Col>
                </Row>
                <Button className="Primary-button" onClick={handlePrevious}>
                  Previous
                </Button>
                <Button className="Primary-button" onClick={handleNext}>
                  Submit
                </Button>
              </>
            )}
            {questionIndex === 2 && (
              <>
                <p>{currentQuestion.label}</p>
                <Row>
                  <Col>
                    <ToggleButtonGroup
                      type="checkbox"
                      value={playTimes}
                      onChange={handlePlayChange}
                    >
                      <ToggleButton id="tbg-btn-1" value={Morning}>
                        Mornings
                      </ToggleButton>
                      <ToggleButton id="tbg-btn-2" value={Afternoon}>
                        Afternoon
                      </ToggleButton>
                      <ToggleButton id="tbg-btn-3" value={Evenings}>
                        Evenings
                      </ToggleButton>
                      <ToggleButton id="tbg-btn-4" value={LateNight}>
                        Late Nights
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Col>
                </Row>
                <Button className="Primary-button" onClick={handlePrevious}>
                  Previous
                </Button>
                <Button onClick={handleNext}>Submit</Button>
              </>
            )}
            {questionIndex === 3 && (
              <>
                <p>{currentQuestion.label}</p>
                <Row>
                  <Col>
                    <ToggleButtonGroup
                      type="checkbox"
                      value={Tags}
                      onChange={handleTagChange}
                    >
                      <ToggleButton id="tbg-btn-1" value={Parent}>
                        Parent
                      </ToggleButton>
                      <ToggleButton id="tbg-btn-2" value={Student}>
                        Student
                      </ToggleButton>
                      <ToggleButton id="tbg-btn-3" value={CasualPlayer}>
                        Casual Player
                      </ToggleButton>
                      <ToggleButton id="tbg-btn-4" value={CompetitivePlayer}>
                        Competitive Player
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Col>
                </Row>
                <Button className="Primary-button" onClick={handlePrevious}>
                  Previous
                </Button>
                <Button onClick={handleNext}>Submit</Button>
              </>
            )}
            {questionIndex === 4 && (
              <>
              <p>{currentQuestion.label}</p>
                <div class="row-md-6" data-shuffle="item" data-groups="bag,box">
                  <Row>
                    <Col>
                      <a class="hover-move-up" href="#">
                        <Image
                          className={activeImage === "Fortnite" ? "Active" : ""}
                          src="Fortnite.jpg"
                          alt="Fortnite"
                          width="200"
                          height="150"
                          onClick={() => {
                            setActiveImage("Fortnite");
                            setGameImages("Fortnite");
                          }}
                          style={{ cursor: "pointer" }}
                        />
                        </a>
                        <h5 class="mb-0 text-lightest text-uppercase">
                          Fortnite
                        </h5>
                      <a class="hover-move-up" href="#">
                        <Image
                          className={
                            activeImage === "Apex Legends" ? "Active" : ""
                          }
                          src="Apex Legends.jpg"
                          alt="Apex Legends"
                          width="200"
                          height="150"
                          onClick={() => {
                            setActiveImage("Apex Legends");
                            setGameImages("Apex Legends");
                          }}
                          style={{ cursor: "pointer" }}
                        />
                        </a>
                        <h5 class="mb-0 text-lightest text-uppercase">
                          Apex Legends
                        </h5>
                    </Col>
                    <Col>
                      <a class="hover-move-up" href="#">
                        <Image
                          className={activeImage === "Dota 2" ? "Active" : ""}
                          src="dota 2.jpg"
                          alt="Dota 2"
                          width="200"
                          height="150"
                          onClick={() => {
                            setActiveImage("Dota 2");
                            setGameImages("Dota 2");
                          }}
                          style={{ cursor: "pointer" }}
                        />
                        </a>
                        <h5 class="mb-0 text-lightest text-uppercase">
                          Dota 2
                        </h5>
                      <a class="hover-move-up" href="#">
                        <Image
                          className={
                            activeImage === "Call of Duty: Warzone"
                              ? "Active"
                              : ""
                          }
                          src="warzone.jpg"
                          alt="Call of Duty: Warzone"
                          width="200"
                          height="150"
                          onClick={() => {
                            setActiveImage("Call of Duty: Warzone");
                            setGameImages("Call of Duty: Warzone");
                          }}
                          style={{ cursor: "pointer" }}
                        />
                      </a>
                      <span class="hover-move-up">
                        <h5 class="mb-0 text-lightest text-uppercase">
                          Call of Duty: Warzone
                        </h5>
                      </span>
                    </Col>
                  </Row>
                </div>
                <Button className="Primary-button" onClick={handlePrevious}>
                  Previous
                </Button>
                <Button onClick={handleNext}>Submit</Button>
              </>
            )}

            {questionIndex === 5 && (
              <>
                <p>Finalize your profile or go back</p>
                {error && <h3>{error}</h3>}
                <Button className="Primary-button" onClick={handlePrevious}>
                  Previous
                </Button>
                <Button type="submit">Create Profile</Button>
              </>
            )}
          </Form>
        </fieldset>
      </div>
    </>
  );
}
