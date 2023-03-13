import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { Logout, organizer } = useAuth();
  return (
    <div>
      {organizer && (
        <>
          <h1>Nome: {organizer.name}</h1>
          <h1>Email: {organizer.email}</h1>
          <h1>Cpf: {organizer.cpf ? organizer.cpf : "Não consta"}</h1>
          <h1>Cnpj: {organizer.cnpj ? organizer.cnpj : "Não consta"}</h1>
        </>
      )}

      <button onClick={Logout}>Sair</button>
    </div>
  );
}
