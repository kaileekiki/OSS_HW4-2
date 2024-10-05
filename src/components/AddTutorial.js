import React, { useState } from "react";
import TutorialDataService from "../services/TutorialService";

const AddPerson = () => {
  const initialPersonState = {
    id: null,
    name: "",
    job: "",
    jobDescription: "",
    gender: false,
    height: 0,
    weight: 0,
    age: 0,
  };
  const [person, setPerson] = useState(initialPersonState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPerson({ ...person, [name]: value });
  };

  const savePerson = () => {
    const data = {
      name: person.name,
      job: person.job,
      jobDescription: person.jobDescription,
      gender: person.gender,
      height: person.height,
      weight: person.weight,
      age: person.age,
    };

    TutorialDataService.create(data)
      .then(response => {
        setPerson({
          ...response.data,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newPerson = () => {
    setPerson(initialPersonState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newPerson}>
            Add
          </button>
        </div>
      ) : (
        <div>
          {["name", "job", "jobDescription", "height", "weight", "age"].map(field => (
            <div key={field} className="form-group">
              <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === "height" || field === "weight" || field === "age" ? "number" : "text"}
                className="form-control"
                id={field}
                required
                value={person[field]}
                onChange={handleInputChange}
                name={field}
              />
            </div>
          ))}
          <button onClick={savePerson} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPerson;
