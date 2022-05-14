import React from "react";
import { APP_NAME } from "configs/AppConfig";
// import firebase from "firebase/app";
// import "firebase/auth";
// import {
//   signIn,
//   signInWithGoogle,
//   signInWithFacebook,
// } from "redux/actions/Auth";
// import { connect } from "react-redux";
// import { auth } from "auth/FirebaseAuth";

// let user = firebase.auth().currentUser;
// let email;
// firebase.auth().onAuthStateChanged(function (user) {
//   if (user) {
//     return (email = user.uid);
//   } else {
//   }
// });

const Footer = () => {
  // console.log("reasdaasddsdsux", props);
  // console.log("footser", localStorage.getItem("auth_organization"));
  // useEffect(() => {}, []);
  return (
    <footer className="footer">
      <span>
        {/* <p> I'm the current user: {props.auth.token} </p> */}
        Copyright &copy; {`${new Date().getFullYear()}`}{" "}
        <span className="text-gray font-weight-semibold">{`${APP_NAME}`}</span>{" "}
        All rights reserved.
      </span>
      <div>
        <a className="text-gray" href="/#" onClick={(e) => e.preventDefault()}>
          Term & Conditions
        </a>
        <span className="mx-2 text-muted"> | </span>
        <a className="text-gray" href="/#" onClick={(e) => e.preventDefault()}>
          Privacy & Policy
        </a>
      </div>
    </footer>
  );
};
// const mapStateToProps = ({ auth }) => {
//   return { auth };
// };

// const mapDispatchToProps = {
//   signIn,
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Footer);
export default Footer;
