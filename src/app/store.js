import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../containers/Auth/AuthSlice";
import registrationReducer from "../containers/Registration/RegistrationSlice";
import lecturerRegistrationReducer from "../containers/LecturerRegistration/LecturerRegistrationSlice";
import coursesReducer from "../containers/Course/CourseSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    registration: registrationReducer,
    courses: coursesReducer,
    lecturerRegistration: lecturerRegistrationReducer,
  },
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV === "development",
});
