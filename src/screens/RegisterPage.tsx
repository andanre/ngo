import "./style.css";
import AuthLayout from "../components/Layout/AuthLayout";
import { FormRegister } from "../components/Fragment/FormRegister";
import { Link } from "react-router-dom";


const RegisterPage = () => {

  return (
    <div className="Login_awal">
      <AuthLayout title="Register">
        <FormRegister />
        <p className="signup">Have an account?
          <Link to="/login" className="signupclick">
            Login
          </Link>
        </p>
      </AuthLayout>
    </div>

  );

};

export default RegisterPage;
