import React, { useState, useEffect } from 'react';
import {SERVER_URL} from '../constants';
import EditAssignment from './EditAssignment';

function EditAssignment(props) { 
  const [message, setMessage] = useState('');
  const [assignmentName, setAssignmentName] = useState(props.assignmentName);
  const [courseId, setCourseId] = useState(props.courseId);
  const [dueDate, setDueDate] = useState(props.dueDate);

  const assignmentId = props.match.params.id;

  // let assignmentId=0;
  // const path = window.location.pathname; 
  // const s = /\d+$/.exec(path)[0];
  // assignmentId=s;

  useEffect(() =>{
    if(props.location.state){
      const {assignmentName, courseId, dueDate} = props.location.state;
      setAssignmentName(assignmentName);
      setCourseId(courseId);
      setDueDate(dueDate);
    }else{
      fetchAssignment();
    }
    }, []);

    const fetchAssignment = () => {
      fetch(`${SERVER_URL}/assignment/${assignmentId}`)
      .then((response) => response.json())
      .then((data) => {
        setAssignmentName(data.name);
        setCourseId(data.courseId);
        setDueDate(data.dueDate);
      })
      .catch((err) => console.error(err));
      

    };

    const handleUpdateAssignment = (e) =>{
      e.preventDefault();
    
 

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
          console.error("Error updating assingment = " + res.status);
        }
      })
      .catch(err => {
        setMessage("Exception. Line 54 " + err.message);
        console.error("Update Assignment Exception = " + err);
      });
  
    }
    const handleDeleteAssignment = (forceDelete) => {

      const assignmentData = {
        name: assignmentName, 
        courseId: courseId, 
        dueDate: dueDate,
      };

      if (!forceDelete) {
        const confirmed = window.confirm("This assignment has grades. Are you sure you want to delete it?");
        if (!confirmed) {
          return;
        }
      }

      const confirmed = window.confirm(
        'This assignment has grades. Are you sure you want to delete it?'
      );

 
      if(confirmed){
      setMessage('');
      console.log("Assignment.delete");
      fetch(`${SERVER_URL}/assignment/${assignmentId}/delete`, 
      {
        method: 'DELETE', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(assignmentData), 
      })
      .then(res => {
        if(res.ok || res.status === 400){
          setMessage("Assignment Deleted");
          fetchAssignment();
        }else{
          setMessage("Delete Error. " + res.status);
    
        }
      })
      .catch(err =>{
        setMessage("Exception. Line 81 " + err);
        console.error("Delete Assignment Exception = " + err);
      });

    }
  }
    return (
    <div>
      <h3> Edit Assignment </h3>
      <form onSubmit={handleUpdateAssignment}>
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
      <button onClick={handleDeleteAssignment}>Delete Assignment</button>
    </div>
  );  
}

export default EditAssignment;