import useStore from "@/store/useStore";
import { auth } from "@/utils/firebaseConfig";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconKey, IconUserShield } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

const Login = () => {
  const router = useRouter();
  const { setEmail } = useStore((state) => state);

  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });
  
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  if (user) {
    setEmail(logInData?.email)
    notifications.show({
      message: "Login success",
    });
    router.push("/dashboard");
  }

  if (error) {
    notifications.show({
      title: error?.name,
      message: error?.message,
    });
  }


  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setLogInData({ ...logInData, [event.target.name]: event.target.value });
  };

  const loginHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(logInData?.email, logInData?.password);
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <TextInput
        label="Email"
        name="email"
        icon={<IconUserShield />}
        value={logInData?.email}
        onChange={inputHandler}
      />
      <PasswordInput
        label="Password"
        name="password"
        icon={<IconKey />}
        value={logInData?.password}
        onChange={inputHandler}
      />
      <div className="flex justify-center items-center">
        <Button onClick={loginHandler} loading={loading}>
          Login
        </Button>
      </div>
    </div>
  );
};
export default Login;
