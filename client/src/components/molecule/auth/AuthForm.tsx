import React, { useState } from "react";
import Input from "../../atoms/input/Input";
import { Auth, HtmlText } from "../../../utils/types";
import { useNavigate } from "react-router-dom";

type Props = {
  onSubmit: (
    email: string,
    password: string,
    type: Auth.LOGIN | Auth.REGISTER,
    username?: string
  ) => Promise<boolean>;
  usernameOption?: boolean;
  type: Auth.LOGIN | Auth.REGISTER;
  children: React.ReactNode;
};

const AuthForm: React.FC<Props> = ({
  onSubmit,
  usernameOption,
  type,
  children,
}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSubmit() {
    //@ts-ignore
    const isValid: Promise<boolean> = await onSubmit(
      email,
      password,
      type,
      usernameOption ? username : undefined
    );
    //@ts-ignore
    if (isValid) navigate("/");
  }

  return (
    <>
      {usernameOption && (
        <Input
          id={HtmlText.USERNAME}
          onChange={(e: any) => setUsername(e.target.value)}
          placeholder={HtmlText.USERNAME_PLACEHOLDER}
        />
      )}
      <Input
        id={HtmlText.EMAIL}
        onChange={(e: any) => setEmail(e.target.value)}
        placeholder={HtmlText.EMAIL_PLACEHOLDER}
      />
      <Input
        id={HtmlText.PASSWORD}
        onChange={(e: any) => setPassword(e.target.value)}
        placeholder={HtmlText.PASSWORD_PLACEHOLDER}
      />
      <Input type="submit" onClick={handleSubmit} />
      {children}
    </>
  );
};

export default AuthForm;
