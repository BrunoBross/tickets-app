import { AuthContextInterface } from "../../../contexts/AuthContext";
import exampleImg from "../../../assets/example.jpg";
import { useState } from "react";

import "./login.css";

interface LoginProps {
  auth: AuthContextInterface;
}

export default function Login(props: LoginProps) {
  const {
    auth: { Login, error },
  } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOrganizerLogin = async () => {
    await Login(email, password);
  };

  return (
    <div className="background">
      <div className="container">
        <div className="left-box">
          <img src={exampleImg} alt="" />
        </div>
        <div className="right-box">
          <div className="form">
            <h1>Entrar</h1>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" onClick={handleOrganizerLogin}>
              Entrar
            </button>
            {error}
          </div>
        </div>
      </div>
    </div>
  );
}
