//think again before you do it
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function  CreateCourse({ context }) {

  const navigate = useNavigate();


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);
  
/** setting values for each part 
 * title, description , estimated time, materialsNeeded
 */
 

  const handleChange = (event) => {
    event.preventDefault();

    const name = event.target.name;
    const value = event.target.value;

    if (name === "courseTitle") {
      setTitle(value);
    } else if (name === "courseDescription") {
      setDescription(value);
    } else if (name === "estimatedTime") {
      setEstimatedTime(value);
    } else if (name === "materialsNeeded") {
      setMaterialsNeeded(value);
    } else {
      return;
    }
  };


  /** after submiting form , send a POST request to API
   * if array is returned, display errors
   * if 500 is returned , send user to /error
   * else send user to home '/'
   */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      userId: context.authenticatedUser.id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };
    // console.log(context.authenticatedUser.emailAddress)
    // console.log(context.authenticatedUser.password)
    // console.log(body);

    await context.data
      .createCourse(
        body,
        context.authenticatedUser.emailAddress,
        context.authenticatedUser.password
      )
      .then((res) => {
        // errors from response
        if (res.length) {
          setErrors(res);
        } else if (res === 500) {
          navigate('/error')
        } else {
          navigate('/')
        }
      });
  };
  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        {errors && errors.length ? (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                value={title}
                onChange={handleChange}
              />

              <p>
                By {context.authenticatedUser.firstName}{" "}
                {context.authenticatedUser.lastName}{" "}
              </p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                value={description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={estimatedTime}
                onChange={handleChange}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                value={materialsNeeded}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <button className="button" type="submit">
            Create Course
          </button>
          <Link className="button button-secondary" to="/">
            {" "}
            Cancel
          </Link>
        </form>
      </div>
    </main>
  );
}