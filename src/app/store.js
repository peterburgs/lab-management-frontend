import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../containers/Auth/AuthSlice";
import registrationReducer from "../containers/Registration/RegistrationSlice";
import lecturerRegistrationReducer from "../containers/LecturerRegistration/LecturerRegistrationSlice";
import coursesReducer from "../containers/Course/CourseSlice";
import labsReducer from "../containers/Lab/LabSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    registration: registrationReducer,
    courses: coursesReducer,
    lecturerRegistration: lecturerRegistrationReducer,
    labs: labsReducer,
  },
  devTools: process.env.NODE_ENV === "development",
});
