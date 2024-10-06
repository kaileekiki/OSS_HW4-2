import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";
import { useHistory } from "react-router-dom";

const Tutorial = (props) => {
  const history = useHistory(); 
  const initialTutorialState = {
    id: null,
    name: "",
    job: "",
    gender: 0,
    height: "",
    weight: "",
    age: "",
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const getTutorial = (id) => {
    TutorialDataService.get(id)
      .then((response) => {
        setCurrentTutorial(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTutorial(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updatePublished = (status) => {
    const data = {
      ...currentTutorial,
      published: status,
    };

    TutorialDataService.update(currentTutorial.id, data)
      .then((response) => {
        setCurrentTutorial({ ...currentTutorial, published: status });
        console.log(response.data);
        setMessage("The status was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateTutorial = () => {
    TutorialDataService.update(currentTutorial.id, currentTutorial)
      .then((response) => {
        console.log(response.data);
        setMessage("The person was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    TutorialDataService.remove(currentTutorial.id)
      .then((response) => {
        console.log(response.data);
        history.push("/people"); 
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Edit Person</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentTutorial.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="job">Job</label>
              <input
                type="text"
                className="form-control"
                id="job"
                name="job"
                value={currentTutorial.job}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                className="form-control"
                id="gender"
                name="gender"
                value={currentTutorial.gender}
                onChange={(e) =>
                  setCurrentTutorial({
                    ...currentTutorial,
                    gender: parseInt(e.target.value),
                  })
                }
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
                name="height"
                value={currentTutorial.height}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="weight">Weight</label>
              <input
                type="number"
                className="form-control"
                id="weight"
                name="weight"
                value={currentTutorial.weight}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                className="form-control"
                id="age"
                name="age"
                value={currentTutorial.age}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button
            className="badge badge-primary mr-2"
            onClick={() => updatePublished(!currentTutorial.published)}
          >
            {currentTutorial.published ? "Unpublish" : "Publish"}
          </button>

          <button className="badge badge-danger mr-2" onClick={deleteTutorial}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTutorial}
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

export default Tutorial;
