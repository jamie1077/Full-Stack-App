import React from "react";
import { Routes, Route } from "react-router-dom";

//components
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import withContext from "./Context";
import PrivateRoute from "./PrivateRoute";


//components with context
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);


const App = () => {
  return (
    <>
      <HeaderWithContext />

      <main>
        <Routes>
           {/*  Navigates to the course creation page - Route is private and requires authentication. */}
          <Route element={<PrivateRoute />}>
            <Route path="/courses/create" element={<CreateCourseWithContext />} />
            <Route path="/courses/:id/update" element={<UpdateCourseWithContext />} />
          </Route>

          <Route path="/" element={<CoursesWithContext />} />
          <Route path="/courses/:id" element={<CourseDetailWithContext />} />
          <Route path="/signup" element={<UserSignUpWithContext />} />
          <Route path="/signin" element={<UserSignInWithContext />} />
          <Route path="/signout" element={<UserSignOutWithContext />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
