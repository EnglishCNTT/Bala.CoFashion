import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/apiCalls";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://i.pinimg.com/736x/93/db/b4/93dbb416b9ed038550c596f871cb0177.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 40px;
  background-color: white;
  opacity: 0.92;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: black;
  color: white;
  cursor: pointer;
  margin-bottom: 12px;
`;

const Error = styled.span`
  color: red;
`;

// ...
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    register(dispatch, { username, email, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Confirm password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPassword !== password && (
            <Error>Password and confirm password do not match.</Error>
          )}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick} disabled={isFetching}>
            CREATE
          </Button>
          {error && <Error>Something went wrong...</Error>}
        </Form>
        <Agreement>
          Already have an account?
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "bold",
            }}
          >
            {" "}
            LOGIN HERE
          </Link>
        </Agreement>
      </Wrapper>
    </Container>
  );
};

export default Register;
