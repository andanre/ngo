import "../components/style.css";
import AuthLayout from "../components/Layout/AuthLayout";
import { FormLogin } from "../components/Fragment/FormLogin";
import { Link } from "react-router-dom";


const LoginPage = () => {

    return (
        <div className="Login_awal">
            <AuthLayout title="Login">
                <FormLogin />
                <p className="signup">Don't have an account? 
                    <Link to="/register" className="signupclick">
                         Sign Up
                    </Link>
                </p>
            </AuthLayout>
        </div>

    );

};

export default LoginPage;
