import React, { useState, useEffect } from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';


function AddAssignment(props) { 
  const [assignmentName, setAssignmentName] = useState('');
  const [courseId, setCourseId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('');

  // const path = window.location.pathname;  

  useEffect(() =>{
    saveAssignment();
    }, []);

    // const saveAssignment = ( ) => {
    //   setMessage('');
    //   console.log("saveAssignment ");
    //   fetch(`${SERVER_URL}/assignment`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //       setAssignment(data);
    //       setAssignmentName(data.name);
    //       setCourseId(data.courseId);
    //       setDueDate(data.dueDate);
    //   })
    //   .catch(err => {
    //     setMessage("Exception. " + err);
    //     console.error("fetch assignment error " + err);
    //   })
    // }

    const saveAssignment = ( ) => {
      setMessage('');
      console.log("Assignment.save");
      if(!assignmentName || !courseId || !dueDate){
        setMessage("Please fill in all fields");
        return; 
      }

      const assignmentData = {
        name: assignmentName, 
        courseId: courseId,
        dueDate: dueDate
      };

      fetch(`${SERVER_URL}/assignment` , 
        {
          method: 'POST', 
          headers:{'Content-Type': 'application/json', }, 
          body: JSON.stringify(assignmentData),
  
        })
        .then(res => {
          if(res.ok){
            setMessage("Assignment Saved");
            setAssignmentName('');
            setCourseId('');
            setDueDate('');
          }else{
            setMessage("Save error. " + res.status);
            console.error("Error saving assignment = " + res.status);
          }
        })
          .catch(err => {
            setMessage("Exception. " + err);
            console.error("Save Assignment Exception = " + err);
          });
    };

    const headers = ['Name', 'Course_id', 'Date'];

  return (
      <div>
        <h3>Add Assignment</h3>
        <form onSubmit={saveAssignment}> 
          <div>
            <label htmlFor="assignmentName"> Assignment Name: </label>
            <input
              type="text"
              id="assignmentName"
              // value={assignmentName}
              onChange={(e) => setAssignmentName(e.target.value)}
              required
              />
          </div>
          <div>
            <label htmlFor="courseId">Course ID: </label>
            <input 
              type = "number"
              id = "courseId"
              // value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            />
          </div>
          <div> 
            <label htmlFor="dueDate"> Due Date: </label>
            <input
              type = "date"
              id="dueDate"
              // value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <div>
            <button type = "submit">Add Assignment</button>
          </div>
        </form>
        <div>
          <p>{message}</p>
        </div>
        
      </div>
  ); 
}
export default AddAssignment;