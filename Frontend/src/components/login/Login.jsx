import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config/urlConfig";

export default function Login() {

  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    fetch(`${BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    })
      .then((res) => {
        const token = res.headers.get('token');
        if (token) {
          localStorage.setItem('token', token);
        }
        return res.json();
      })
      .then((result) => {
        dispatch({ type: "setUser", payload: result.data.foundUser });
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };


  return (
    <>
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={loginUser}>
          <label htmlFor="email">E-mail:</label>
          <br />
          <input type="email" id="email" name="email"></input>
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input type="password" id="password" name="password"></input>
          <br />
          <button>Login</button> 
        </form>
      </div>
    </>
  );
}

