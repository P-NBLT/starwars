import React from "react";
import { onAuthSubmit } from "../../../utils/events";
import AuthForm from "./AuthForm";
import { Auth } from "../../../utils/types";
import Card from "../../atoms/card/Card";
import Typography from "../../atoms/typography/Typography";
import styles from "./AuthCard.module.css";
import { text } from "../../../utils/data";

type Props = {
  getSignupCard: () => void;
};

const LoginCard: React.FC<Props> = ({ getSignupCard }) => {
  return (
    <Card>
      <div className={styles.textContainer}>
        <Typography type={"title"} options={["bold"]}>
          {text.login.title}
        </Typography>
        <Typography type="subtitle" options={["bold"]}>
          {text.login.info}
        </Typography>
      </div>
      <AuthForm onSubmit={onAuthSubmit} type={Auth.LOGIN}>
        <div className={styles.bottomText}>
          <Typography>{text.login.bottomPart1} </Typography>
          <Typography
            onClick={() => {
              getSignupCard();
            }}
            className={styles.switchToSignup}
          >
            {text.login.bottomPart2}
          </Typography>
        </div>
      </AuthForm>
    </Card>
  );
};

export default LoginCard;
