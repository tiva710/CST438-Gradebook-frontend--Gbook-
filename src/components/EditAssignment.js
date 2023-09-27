import React, { useState } from 'react';
import {SERVER_URL} from '.../constants';
import {Link} from 'react-router-dom';

function EditAssignment(props) { 
  console.log("here");
  const [assignment, setAssignment] = useState({});
  const [message, setMessage] = useState('');
  const [assignmentName, setAssignmentName] = useState('');
  const [courseId, setCourseId] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() =>{
    fetchAssignment();
  }, []);

  const fetchAssignment = () => {
    fetch(`${SERVER_URL}/assignment/${assignmentId}`)
    .then((response) => response.json())
    .then((data) => {
      setAssignment(data);
      setAssignmentName(data.name);
      setCourseId(data.courseId);
      setDueDate(data.dueDate);
    })
    .catch((err) => console.error(err));
    

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //what if they don't fill in all fields? 

    const assignmentData = {
      name: assignmentName, 
      courseId: courseId, 
      dueDate: dueDate,
    };

    fetch(`${SERVER_URL}/assignment/${assignmentId}`, {
      method: 'PUT', 
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(assignmentData),
    })
    .then((res) => {
      if(res.ok){
        setMessage('Assignment Updated Succesfully');
      }else{
        setMessage('Update Error ' + res.status);
        console.err("Error updating assingment = " + res.status);
      }
    })
    .catch(err => {
      setMessage("Exception. " + err);
      console.err("Update Assignment Exception = " + err);
    });
  }

  return (
      <div>
        <h3> Edit Assignment </h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="assignmentName">Assignment Name: </label>
            <input
              type = "text"
              id = "assignmentName"
              value = {assignmentName}
              onChange={(e) => setAssignmentName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor = "courseId"> Course ID: </label>
            <input
              type = "number"
              id = "courseId"
              value = {courseId}
              onChange={(e) => setCourseId(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="dueDate">Due Date: </label>
            <input
              type = "date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div>
            <button type = "submit">Update Assignment</button>
          </div>
        </form>
        <div> <p>{message}</p></div>
      </div>
  ); 
}

export default EditAssignment;