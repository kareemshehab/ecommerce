import CommonForm from "@/components/common/form";
import { LoginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  email: "",
  password: "",
};
const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast(data?.payload?.message);
      } else {
        toast(data?.payload?.message);
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to Your Account
        </h1>
        <p>
          Don't have an account?{" "}
          <Link
            className="font-medium ms-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>{" "}
        </p>
      </div>
      <CommonForm
        formControls={LoginFormControls}
        buttonText={"Sigh Up"}
        onSubmit={onSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default AuthLogin;
