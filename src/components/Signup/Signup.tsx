import { auth } from "@/utils/firebaseConfig";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconKey, IconUserShield } from "@tabler/icons-react";
import { ChangeEvent, MouseEvent, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

const Signup = () => {
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSignUpData({ ...signUpData, [event.target.name]: event.target.value });
  };

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  if (user) {
    notifications.show({
      message: "Account created successfully. Please login to continue",
    });
  }

  if (error) {
    notifications.show({
      title: error?.name,
      message: error?.message,
    });
  }

  const handleCreateUser = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (signUpData?.password === signUpData?.confirmPassword) {
      createUserWithEmailAndPassword(signUpData?.email, signUpData?.password);
    } else {
      notifications.show({
        message: "Password Mismatch! 🤥",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <TextInput
        label="Email"
        name="email"
        icon={<IconUserShield />}
        value={signUpData?.email}
        onChange={inputHandler}
      />
      <PasswordInput
        label="Password"
        name="password"
        icon={<IconKey />}
        value={signUpData?.password}
        onChange={inputHandler}
      />
      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        icon={<IconKey />}
        value={signUpData?.confirmPassword}
        onChange={inputHandler}
      />
      <div className="flex justify-center items-center">
        <Button onClick={handleCreateUser} loading={loading}>
          Login
        </Button>
      </div>
    </div>
  );
};
export default Signup;
