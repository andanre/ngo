
import InputForm from "../Element/Input/Index.tsx"

export const Button = () => {
    return (
        <button className="Button_login" >Register</button>
    );
}

export const FormRegister = () => {
    return (
        
        <form action="">
            <InputForm
                label="FullName"
                type="text"
                placeholder="Masukan nama anda disini"
                name="fullname" value={""} onChange={""}            />
             <InputForm
                label="Email"
                type="email"
                placeholder="Example@mail.com"
                name="email" value={""} onChange={""}            />

            <InputForm
                label="Password"
                type="password"
                placeholder="******"
                name="password" value={""} onChange={""} />

            <InputForm
                label="Confirm Password"
                type="password"
                placeholder="******"
                name="confirmPassword" value={""} onChange={""} />


            <Button />
        </form>

    );
};


