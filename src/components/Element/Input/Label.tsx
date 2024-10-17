import React from "react";

interface InputFormProps {
    htmlFor: string;
    children : string;
   
}

const Label: React.FC<InputFormProps> = (props) => {
    const {htmlFor, } = props;
    return (
        <label
            htmlFor={htmlFor}
            className="label_email_form"
            >
             {props.children}
            </label>
    );
};

export default Label;