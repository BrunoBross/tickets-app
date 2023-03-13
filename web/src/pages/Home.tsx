import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { Logout } = useAuth();
  return (
    <div>
      <h1>Home page</h1>
      <button onClick={Logout}>Logout</button>
    </div>
  );
}
