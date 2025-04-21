import { ChangeEvent, useEffect, useState } from "react";
import { getData, createUser } from "./api";
import { UserDto } from "@shared/types";
import { USERS } from "./api/constants";

function App() {
  const [users, setUsers] = useState<UserDto[]>();
  const [newUser, setNewUser] = useState<UserDto>({ email: "", name: "" });

  useEffect(() => {
    getData<UserDto[]>(USERS).then(setUsers);
  }, []);

  const handleSetVal =
    (key: "name" | "email") =>
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setNewUser((prev) => ({ ...prev, [key]: value }));
    };

  const handleSend = () => {
    createUser(newUser);
  };

  return (
    <div>
      <h1>Create user</h1>
      <form>
        <input type="text" onChange={handleSetVal("name")} />
        <input type="text" onChange={handleSetVal("email")} />
        <button onClick={handleSend}>send</button>
      </form>
      <h1>All users</h1>
      <div>
        {users?.map(({ email, name }, ind) => (
          <div key={ind}>
            <p>{email}</p>
            <p>{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
