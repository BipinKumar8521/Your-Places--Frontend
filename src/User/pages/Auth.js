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
import LoadingSpinner from "../../Shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../Shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import ImageUpload from "../../Shared/components/FormElements/ImageUpload";

export default function Auth() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

  const authSubmitHandler = async (e) => {
    e.preventDefault();

    if (
      !isLoginMode &&
      formState.inputs.password.value !== formState.inputs.confirmPassword.value
    ) {
      alert("Password does not match.");
      return;
    }
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          "POST",
          {
            "Content-Type": "application/json",
          },
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          })
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);

        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/signup",
          "POST",
          {},
          formData
        );
        auth.login(responseData.useId, responseData.token);
      } catch (err) {}
    }
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setForm(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
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
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
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
          {!isLoginMode && (
            <ImageUpload
              id="image"
              center
              onInput={inputHandler}
              errorText="Please provide an image."
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
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 character"
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
    </React.Fragment>
  );
}
