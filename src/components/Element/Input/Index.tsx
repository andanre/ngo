import Input from "./Input";
import React from "react";
import Label from "./Label";

// Define an interface for the props
interface InputFormProps {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: string;
}

const InputForm: React.FC<InputFormProps> = (props) => {
    const {label, name, type, placeholder} = props;
    return (
        <div className="form_element1">
            <Label htmlFor={name}>{label}</Label>
            <Input name={type} type={type} placeholder={placeholder}/>
        </div>
    );
};

export default InputForm;