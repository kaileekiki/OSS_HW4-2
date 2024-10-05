import React, { useState, useEffect, useCallback } from "react";
import TutorialDataService from "../services/TutorialService";

const Person = props => {
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
  const [currentPerson, setCurrentPerson] = useState(initialPersonState);
  const [message, setMessage] = useState("");

  const getPerson = useCallback(id => {
    TutorialDataService.get(id)
      .then(response => {
        setCurrentPerson(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    getPerson(props.match.params.id);
  }, [props.match.params.id, getPerson]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentPerson({ ...currentPerson, [name]: value });
  };

  const updatePerson = () => {
    TutorialDataService.update(currentPerson.id, currentPerson)
      .then(response => {
        console.log(response.data);
        setMessage("The person was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deletePerson = () => {
    TutorialDataService.remove(currentPerson.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/people");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentPerson ? (
        <div className="edit-form">
          <h4>Person</h4>
          <form>
            {["name", "job", "jobDescription", "height", "weight", "age"].map(field => (
              <div key={field} className="form-group">
                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type={field === "height" || field === "weight" || field === "age" ? "number" : "text"}
                  className="form-control"
                  id={field}
                  name={field}
                  value={currentPerson[field]}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </form>

          <button className="badge badge-danger mr-2" onClick={deletePerson}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updatePerson}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Person...</p>
        </div>
      )}
    </div>
  );
};

export default Person;
