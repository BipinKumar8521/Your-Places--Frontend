import React from "react";
import "./NewPlace.css";
import Input from "../../Shared/components/FormElements/Input";

export default function NewPlace() {
  return (
    <form className="place-form">
      <Input element="input" type="text" label="Title" />
    </form>
  );
}
