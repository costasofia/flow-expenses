import { useState } from "react";
import axios from "axios";
import "./login.css";
import Input from "../../components/input/input";
import { IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
function Login() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [valid, setValid] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const submit = (e: any) => {
    e.preventDefault();
    let isValid: boolean = true;
    let validationErrors: { [key: string]: string } = {};

    if (formData.email.trim() === "" || !formData.email) {
      isValid = false;
      validationErrors.email = "O email é obrigatório";
    } else if (
      !/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(formData.email)
    ) {
      isValid = false;
      validationErrors.email = "O email não é valido";
    }

    if (formData.password.trim() === "" || !formData.password) {
      isValid = false;
      validationErrors.password = "A password é obrigatória";
    } else if (formData.password.length < 6) {
      isValid = false;
      validationErrors.password = "A password tem menos de 6 caracteres";
    }
    setErrors(validationErrors);
    setValid(isValid);

    if (!isValid) {
      return;
    }

    axios
      .get("http://localhost:3000/users")
      .then((result) => {
        console.log(result.data[0].password);
        const users = result.data;
        let userFounded = false;
        for (let user of users) {
          console.log("ola");
          if (user.email === formData.email) {
            userFounded = true;
            console.log("user encontrado");
            if (user.password.toString() === formData.password) {
              alert("Login feito com sucesso");
              localStorage.setItem("idUser", user.id);
              navigate("/home");
              return;
            } else {
              validationErrors.password = "Password não encontrada";
              setErrors(validationErrors);
              setValid(false);
            }
          }
        }
        if (!userFounded) {
          validationErrors.email = "Email errado";
        }
        setErrors(validationErrors);
        setValid(false);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-login">
      <form onSubmit={submit} className="form-login">
        <div className="icon-login">
          <IoPersonOutline size={48} />
        </div>
        <h1 className="title-login">FlowExpenses</h1>
        <Input
          label="Email:"
          type="email"
          name="email"
          autoComplete="false"
          onChange={handleChangeInput}
          value={formData.email}
        />
        {errors.email && <span>{errors.email}</span>}
        <Input
          label="Password:"
          type="password"
          name="password"
          autoComplete="false"
          onChange={handleChangeInput}
          value={formData.password}
        />
        {errors.password && <span>{errors.password}</span>}
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
export default Login;
