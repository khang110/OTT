import React, { useEffect } from "react";

// scss
import "./assets/scss/theme.scss";

// actions
import { useSelector, useDispatch } from "react-redux";
import { changelayoutMode } from "./redux/actions";

//Route
import Routes from "./routes";

// Import Firebase Configuration file
import { initFirebaseBackend } from "./helpers/firebase_helper";

//api config
// import config from "./config";
// import fakeBackend from "./helpers/fakeBackend";


// TODO
// fakeBackend();

// const firebaseConfig = {
//   apiKey: config.FIRE_BASE.API_KEY,
//   authDomain: config.FIRE_BASE.AUTH_DOMAIN,
//   databaseURL: config.FIRE_BASE.DATABASEURL,
//   projectId: config.FIRE_BASE.PROJECTID,
//   storageBucket: config.FIRE_BASE.STORAGEBUCKET,
//   messagingSenderId: config.FIRE_BASE.MESSAGINGSENDERID,
//   appId: config.FIRE_BASE.APPID,
//   measurementId: config.FIRE_BASE.MEASUREMENTID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyCmrehLHv3XXtDcJKzw6Q5sPVpLethy6qk",
  authDomain: "teammeating-7706e.firebaseapp.com",
  projectId: "teammeating-7706e",
  storageBucket: "teammeating-7706e.appspot.com",
  messagingSenderId: "480419074137",
  appId: "1:480419074137:web:612833a59bfcd3e1a8e148",
  measurementId: "G-FHB4986DRT"
};
// // init firebase backend
initFirebaseBackend(firebaseConfig);

const App = () => {
  const dispatch = useDispatch();

  const { layoutMode } = useSelector((state: any) => ({
    layoutMode: state.Layout.layoutMode,
  }));

  // Dark/Light Mode 
  useEffect(() => {
    var getLayoutMode = localStorage.getItem("layoutMode");
    if (getLayoutMode) {
      dispatch(changelayoutMode(getLayoutMode));
    } else {
      dispatch(changelayoutMode(layoutMode));
    }
  }, [layoutMode, dispatch]);

  return <Routes />;
};

export default App;
