import React from "react";

// Define an interface for the props
interface InputFormProps {
    name: string;
    type: string;
    placeholder: string;
}
const Input: React.FC<InputFormProps> = (props) => {
    const {type, placeholder, name} = props;
    return (
        <input
        type={type}
        className="style_label_email"
        placeholder={placeholder}
        name={name}
        />
    );
};

export default Input;