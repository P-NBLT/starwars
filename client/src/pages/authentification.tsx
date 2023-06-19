import React, { useEffect, useState } from "react";
import LoginCard from "../components/molecule/auth/LoginCard";
import SignupCard from "../components/molecule/auth/SignupCard";
import { authBackgrdImg } from "../utils/data";

const Authentification: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [idx, setIdx] = useState(0);
  const [bckImage, setBckImage] = useState(
    authBackgrdImg[authBackgrdImg.length - 1]
  );

  let range = authBackgrdImg.length - 1;

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((prev) => {
        if (prev !== range) {
          return (prev += 1);
        } else return 0;
      });

      setBckImage(authBackgrdImg[idx]);
    }, 6000);

    return () => clearInterval(t);
  }, [bckImage]);

  return (
    <div
      style={{
        backgroundImage: `url(${bckImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",

        height: "100vh",
        position: "relative",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {isLogin ? (
        <LoginCard getSignupCard={() => setIsLogin(false)} />
      ) : (
        <SignupCard getLoginCard={() => setIsLogin(true)} />
      )}
    </div>
  );
};

export default Authentification;
