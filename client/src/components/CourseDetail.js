import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

export default function CourseDetail({ context }) {
  const { id } = useParams();
  const [course, setCourse] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    context.data.getCourse(id)
      .then((response) => {
        if (response === 404) {
          navigate('/notfound')
        } else if (response === 500) {
          navigate('/error')
        } else {
          setCourse(response.course);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleDeleteCourse = (e) => {
    e.preventDefault();

    context.data.deleteCourse(
      id,
      context.authenticatedUser.emailAddress,
      context.authenticatedUser.password
    )
    .then((response) => {
      if (response === 204) {
        navigate('/');
      } else if (response === 403){
        navigate('/forbidden');
      } else {
        navigate('/error');
      }
    });
  };

  return (
    <main>
      <div className="actions--bar">
        {
          //display update and delete buttons only if the user is authenticated.
          context.authenticatedUser &&
            context.authenticatedUser.id === course.userId ? (
            <div className="wrap">
              <Link className="button" to="update">
                Update Course{" "}
              </Link>
              <button className="button" onClick={handleDeleteCourse}>
                Delete Course
              </button>
              <Link className="button button-secondary" to="/">
                Return to List
              </Link>
            </div>
          ) : (
            <div className="wrap">
              <Link className="button button-secondary" to="/">
                Return to List
              </Link>
            </div>
          )}
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>
                By{" "}
                {course.User?.firstName +
                  " " +
                  course.User?.lastName}
              </p>

              <ReactMarkdown children={course.description} />
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>
              <h3 className="course--detail--title">Materials Needed</h3>

              <ul className="course--detail--list">
                <ReactMarkdown children={course.materialsNeeded} />
              </ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}