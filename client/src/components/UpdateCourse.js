import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateCourse({ context }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [course, setCourse] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    context.data.getCourse(id)
      .then((response) => {
        if (response === 404) {
          navigate("/notfound");
        } else if (response === 500) {
          navigate("/error");
        } else if (response.course.userId === context.authenticatedUser.id) {
          setCourse(response.course);
          setTitle(response.course.title);
          setDescription(response.course.description);
          setEstimatedTime(response.course.estimatedTime);
          setMaterialsNeeded(response.course.materialsNeeded);
        } else {
          navigate("/forbidden");
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Event Handlers  
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };
 
    context.data.updateCourse(
      id,
      body,
      context.authenticatedUser.emailAddress,
      context.authenticatedUser.password
    ).then((response) => {
      if (response.length) {
        setErrors(response);
      } else if (response === 500) {
        navigate("/error");
      } else {
        navigate("/");
      }
    })
    .catch((err) => {
      console.log(err);
      navigate("/");
    });
  }

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/courses/${id}`);
  }


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
        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                value={title || ''}
                onChange={e => setTitle(e.target.value)}
              />

              <p>
                By {course.firstName} {course.lastName}
              </p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                value={description || ''}
                onChange={e => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={estimatedTime || ''}
                onChange={e => setEstimatedTime(e.target.value)}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                value={materialsNeeded || ''}
                onChange={e => setMaterialsNeeded(e.target.value)}
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