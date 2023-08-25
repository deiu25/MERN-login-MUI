// MainComponent.js
import { useSelector } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

import RecordList from "./components/recordList";

import { PrivateComponent } from "./components/route/ProtectedRoute";

import { Login } from "./components/user/Login";
import { Register } from "./components/user/Register";
// import { Profile } from "./components/user/Profile";
import { UpdateProfile } from "./components/user/UpdateProfile";
import { UpdatePassword } from "./components/user/UpdatePassword";
import { ForgotPassword } from "./components/user/ForgotPassword";
import { NewPassword } from "./components/user/NewPassword";
import { Header } from "./components/leyout/Header";
import { Footer } from "./components/leyout/Footer";

const MainComponent = () => {
  const { user, isAuthenticated } = useSelector(state => state.auth);

  return (
    <>
      <Header />

      <Container>
        <Routes>
          <Route exact path="/" element={<RecordList />} />
          <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<NewPassword />} />
            {/* <Route path="/me" element={<PrivateComponent element={Profile} />} /> */}
            <Route path="/me/update" element={<PrivateComponent element={UpdateProfile} />} />
            <Route path="/password/update" element={<PrivateComponent element={UpdatePassword} />} />
        </Routes>

        {!isAuthenticated || (user && user.role !== 'admin') ? <Footer /> : null}
      </Container>
    </>
  );
};

export default MainComponent;
