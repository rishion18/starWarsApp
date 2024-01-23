import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./eventReducer.js";

export default configureStore({
    reducer:{
        Events: eventReducer
    }
})