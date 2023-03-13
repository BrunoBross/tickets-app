import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const { Login } = useAuth();
  return (
    <div className="container">
      <h1>Login</h1>
      <button onClick={Login}>Logar</button>
    </div>
  );
}
