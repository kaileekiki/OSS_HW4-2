import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";
import { useParams, useHistory } from "react-router-dom";

const EditPerson = () => {
  const { id } = useParams();
  const history = useHistory();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    TutorialDataService.get(id)
      .then((response) => {
        setPerson(response.data);
        setLoading(false); // 데이터 로드 후 로딩 해제
      })
      .catch((e) => {
        console.error(e);
        setLoading(false); // 오류가 나도 로딩 해제
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // 로딩 상태 화면
  }

  if (!person) {
    return <div>No data found</div>; // 데이터가 없을 때 화면
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };

  const updatePerson = () => {
    TutorialDataService.update(id, person)
      .then((response) => {
        console.log(response.data);
        history.push("/people");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
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
            value={person.name}
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
            value={person.job}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            className="form-control"
            id="gender"
            name="gender"
            value={person.gender ? "1" : "0"}
            onChange={(e) =>
              handleInputChange({
                target: { name: "gender", value: e.target.value === "1" },
              })
            }
          >
            <option value="1">Male</option>
            <option value="0">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="height">Height</label>
          <input
            type="number"
            className="form-control"
            id="height"
            name="height"
            value={person.height}
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
            value={person.weight}
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
            value={person.age}
            onChange={handleInputChange}
          />
        </div>
      </form>

      <button className="btn btn-success" onClick={updatePerson}>
        Update
      </button>
    </div>
  );
};

export default EditPerson;
