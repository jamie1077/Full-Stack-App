import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateCourse({ context }) {
  //states
  const navigate = useNavigate();
  const { id } = useParams();

  const [course, setCourse] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState("");

  /** on page load get course details
   * if data doesnt exist send user to /notfound
   * else if 500 is returned send user to /error
   * else if user is owner set course states
   * else user dont have persmission send to /forbidden
   */

  useEffect(() => {
    context.data.getCourse(id).then((data) => {
      if (data === 404) {
        navigate("/notfound");
      } else if (data === 500) {
        navigate("/error");
      } else if (data.userId === context.authenticatedUser.id) {
        console.log(data);
        setCourse(data);
        setTitle(data.title);
        setDescription(data.description);
        setEstimatedTime(data.estimatedTime);
        setMaterialsNeeded(data.materialsNeeded);
      } else {
        navigate("/forbidden");
      }
    });
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //update any course data
  const handleUpdate = (e) => {
    e.preventDefault();

    const body = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };
    context.data
      .updateCourse(
        id,
        body,
        context.authenticatedUser.emailAddress,
        context.authenticatedUser.password
      )
      /**if array returns display errors
       * else if 500 is returned send user to /error
       * else send user to home /
       */
      .then((res) => {
        if (res.length) {
          setErrors(res);
        } else if (res === 500) {
          navigate("/error");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  };

  //handle changes to course data fields
  const handleChange = (e) => {
    e.preventDefault();

    const name = e.target.name;
    const value = e.target.value;

    if (name === "courseTitle") {
      setTitle(value);
    } else if (name === "courseDescription") {
      setDescription(value);
    } else if (name === "estimatedTime") {
      setEstimatedTime(value);
    } else if (name === "materialsNeeded") {
      // console.log(value)
      setMaterialsNeeded(value);
    } else {
      return;
    }
  };

  // cancel button
  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/courses/${id}`);
  };

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
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
        <form onSubmit={handleUpdate}>
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
                By {course.firstName} {course.lastName}
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
            Update Course
          </button>
          <button className="button button-secondary" onChange={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
}