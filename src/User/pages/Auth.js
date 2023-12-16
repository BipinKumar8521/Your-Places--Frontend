import React, { useContext, useState } from "react";
import "./Auth.css";
import Input from "../../Shared/components/FormElements/Input";
import { useForm } from "../../Shared/hooks/form-hook";
import Button from "../../Shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_SAME,
} from "../../Shared/util/validators";
import Card from "../../Shared/components/UIElements/Card";

import { AuthContext } from "../../Shared/context/auth-context";

export default function Auth() {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const auth = useContext(AuthContext);

  const [formState, inputHandler, setForm] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = (e) => {
    e.preventDefault();
    if (
      !isLoginMode &&
      formState.inputs.password.value !== formState.inputs.confirmPassword.value
    ) {
      alert("Password does not match.");
      return;
    }
    auth.login();

    console.log(formState.inputs);
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setForm(
        {
          ...formState.inputs,
          name: undefined,
          confirmPassword: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setForm(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          confirmPassword: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <Card className="authentication">
      <h2>{isLoginMode ? "Login Required" : "Sign Up"}</h2>
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            id="name"
            element="input"
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid name."
            label="Name:"
            onInput={inputHandler}
          />
        )}
        <Input
          id="email"
          element="input"
          type="email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email."
          label="Email:"
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, at least 5 character"
          label="Password:"
          onInput={inputHandler}
        />
        {!isLoginMode && (
          <Input
            id="confirmPassword"
            element="input"
            type="password"
            validators={[VALIDATOR_SAME(formState.inputs.password.value)]}
            errorText="Password does not match."
            label="Confirm Password:"
            onInput={inputHandler}
          />
        )}
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
      </Button>
    </Card>
  );
}
