import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import TutorialDataService from "../services/TutorialService";
import { useTable } from "react-table";
import { useHistory } from "react-router-dom";

const PeopleList = () => {
  const [people, setPeople] = useState([]);
  const [searchName, setSearchName] = useState("");
  const peopleRef = useRef();
  const history = useHistory(); 

  peopleRef.current = people;

  const retrievePeople = useCallback(() => {
    TutorialDataService.getAll()
      .then((response) => {
        setPeople(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    retrievePeople();
  }, [retrievePeople]);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const deletePerson = useCallback((rowIndex) => {
    const id = peopleRef.current[rowIndex].id;

    TutorialDataService.remove(id)
      .then(() => {
        let newPeople = [...peopleRef.current];
        newPeople.splice(rowIndex, 1);
        setPeople(newPeople);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Job",
        accessor: "job",
      },
      {
        Header: "Gender",
        accessor: "gender",
        Cell: (props) => {
          return props.value ? "Male" : "Female";
        },
      },
      {
        Header: "Height",
        accessor: "height",
      },
      {
        Header: "Weight",
        accessor: "weight",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => history.push(`/people/${peopleRef.current[rowIdx].id}`)}> {/* useHistory로 가져온 history 사용 */}
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deletePerson(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    [deletePerson, history]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: people,
  });

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() =>
                TutorialDataService.findByName(searchName).then((response) => setPeople(response.data))
              }
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={() => TutorialDataService.removeAll().then(retrievePeople)}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default PeopleList;
