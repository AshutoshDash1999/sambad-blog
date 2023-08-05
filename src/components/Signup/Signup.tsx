import { Button, PasswordInput, TextInput } from "@mantine/core";
import { IconKey, IconUserShield } from "@tabler/icons-react";

const Signup = () => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <TextInput label="Email" icon={<IconUserShield />} />
      <PasswordInput label="Password" icon={<IconKey />} />
      <PasswordInput label="Confirm Password" icon={<IconKey />} />
      <div className="flex justify-center items-center">
        <Button>Login</Button>
      </div>
    </div>
  );
};
export default Signup;
