import "./style.css";

interface AuthLayoutProps {
title : string;
children : React.ReactNode;
}
const AuthLayout:React.FC<AuthLayoutProps> = (props) => {
    const { title} = props;
    return (
            <div className="Login_element">
               <h1 className="Login_text">{title}</h1>
               <p className="Login_text2">Selamat datang, Silakan masukan data</p>  
                {props.children}
            </div>
    );
};


export default AuthLayout;