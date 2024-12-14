import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/auth";
import styled from "styled-components";
import { loginUser } from "../api/authApi";
import { toast } from "sonner";

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [laoding, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const data = await loginUser({ email, password });

      setToken(data.access_token);
      navigate("/players");
      setLoading(false);
      toast.success("Login successfull");
    } catch {
      setLoading(false);
      setError("Invalid credentials.");
    }
  };

  return (
    <PageContainer>
      <ImageSection>
        <Image
          src="https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Login"
        />
      </ImageSection>

      <FormSection>
        <FormContainer onSubmit={handleSubmit}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
          <Input name="email" placeholder="email" required />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <Button type="submit">{laoding ? "Loading..." : "Login"}</Button>

          {error && <ErrorText>{error}</ErrorText>}

          <LinksContainer>
            <a href="/forgot-password" style={{ color: "#007bff" }}>
              Forgot Password?
            </a>
            <a href="/signup" style={{ color: "#007bff" }}>
              Sign Up
            </a>
          </LinksContainer>

          <p>email:john@mail.com</p>
          <p> pass:changeme</p>
        </FormContainer>
      </FormSection>
    </PageContainer>
  );
};

export default LoginPage;

const PageContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: white;
`;

const ImageSection = styled.div`
  flex: 7;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa; /* Light grey background */
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FormSection = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.form`
  background: white;
  padding: 30px;
  width: 80%;
  max-width: 400px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;

const Input = styled.input`
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline-color: #6099d5;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;

  a {
    text-decoration: none;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorText = styled.p`
  color: red;
  text-align: center;
  margin-top: 10px;
`;
