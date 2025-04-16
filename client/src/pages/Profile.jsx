import React, { useEffect } from "react";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Logout from "./Logout";

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);
  return (
    <Container>
      <Title>Profile page</Title>
      <Logout />
    </Container>
  );
};

export default Profile;
