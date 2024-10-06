import React, { useState } from "react";
import TutorialDataService from "../services/TutorialService";
import { useHistory } from "react-router-dom";

const AddTutorial = () => {
  const history = useHistory();
  const initialTutorialState = {
    id: null,
    name: "",
    job: "",
    jobDescription: "",
    gender: 0,
    height: "",
    weight: "",
    age: "",
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    const data = {
      name: tutorial.name,
      job: tutorial.job,
      jobDescription: tutorial.jobDescription,
      gender: tutorial.gender,
      height: tutorial.height,
      weight: tutorial.weight,
      age: tutorial.age,
    };

    TutorialDataService.create(data)
      .then((response) => {
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add more
          </button>
          <button className="btn btn-primary" onClick={() => history.push("/")}>
            Go Back to List
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={tutorial.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="job">Job</label>
            <input
              type="text"
              className="form-control"
              id="job"
              required
              value={tutorial.job}
              onChange={handleInputChange}
              name="job"
            />
          </div>


          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              className="form-control"
              id="gender"
              value={tutorial.gender}
              onChange={(e) => setTutorial({ ...tutorial, gender: parseInt(e.target.value) })}
              name="gender"
            >
              <option value={0}>Female</option>
              <option value={1}>Male</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="height">Height</label>
            <input
              type="number"
              className="form-control"
              id="height"
              required
              value={tutorial.height}
              onChange={handleInputChange}
              name="height"
            />
          </div>

          <div className="form-group">
            <label htmlFor="weight">Weight</label>
            <input
              type="number"
              className="form-control"
              id="weight"
              required
              value={tutorial.weight}
              onChange={handleInputChange}
              name="weight"
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              className="form-control"
              id="age"
              required
              value={tutorial.age}
              onChange={handleInputChange}
              name="age"
            />
          </div>

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;
