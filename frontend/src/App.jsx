import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [allUser, setAllUser] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3310/api/users")
      .then((res) => setAllUser(res.data))
      .catch((err) => console.error(err));
  }, [success]);

  const [user, setUser] = useState({
    name: "anthony",
    email: "anthony@gorski.fr",
    password: "azertyuiop",
  });

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
    // setUser({ ...user, "firstname": "diogo" });
    // setUser({ ...user, "email": "diogo@wcs.fr" });
    // setUser({ ...user, "password": "azerty" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3310/api/users", user)
      .then(() => setSuccess(!success))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div>
        <ul>
          {allUser.map((uniqueUser) => (
            <li key={uniqueUser.id}>
              {uniqueUser.name} | {uniqueUser.email}
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          value={user.name}
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
        />{" "}
        <br />
        <label htmlFor="email">email</label>
        <input
          value={user.email}
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
        />{" "}
        <br />
        <label htmlFor="password">password</label>
        <input
          value={user.password}
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />{" "}
        <br />
        <button type="submit">Envoyer</button>
      </form>
    </>
  );
}

export default App;
