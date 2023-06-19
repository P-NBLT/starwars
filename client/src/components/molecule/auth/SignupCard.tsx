import React from "react";
import styles from "./AuthCard.module.css";
import { onAuthSubmit } from "../../../utils/events";
import AuthForm from "./AuthForm";
import { Auth } from "../../../utils/types";
import Card from "../../atoms/card/Card";
import { text } from "../../../utils/data";
import Typography from "../../atoms/typography/Typography";

type Props = {
  getLoginCard: () => void;
};

const SignupCard: React.FC<Props> = ({ getLoginCard }) => {
  return (
    <Card>
      <div className={styles.textContainer}>
        <Typography type={"title"} options={["bold"]}>
          {text.signup.title}
        </Typography>
        <Typography type="subtitle">{text.signup.info}</Typography>
      </div>
      <AuthForm
        onSubmit={onAuthSubmit}
        usernameOption={true}
        type={Auth.REGISTER}
      >
        <div>
          <p onClick={() => getLoginCard()}>{text.signup.bottomPart}</p>
        </div>
      </AuthForm>
    </Card>
  );
};

export default SignupCard;
