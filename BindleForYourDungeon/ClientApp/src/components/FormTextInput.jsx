import React from "react";
import InputGroup from "react-bootstrap/esm/InputGroup";
import Form from "react-bootstrap/esm/Form";
import { toKebabCase } from "../helpers/stringHelper";

function FormTextInput({
  propertyName,
  placeholderVal,
  handleChanged,
  ...props
}) {
  return (
    <InputGroup id={`input-group-${toKebabCase(propertyName)}`} {...props}>
      <InputGroup.Text>{propertyName}</InputGroup.Text>
      <Form.Control
        type="text"
        id={toKebabCase(propertyName)}
        placeholder={placeholderVal}
        onChange={handleChanged}
      />
    </InputGroup>
  );
}

export default FormTextInput;
