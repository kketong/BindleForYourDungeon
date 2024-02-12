import React from "react";
import InputGroup from "react-bootstrap/esm/InputGroup";
import Form from "react-bootstrap/esm/Form";
import { toKebabCase } from "../../helpers/stringHelper";

function InputGroupForm({
	propertyName,
	placeholderVal,
	label,
	handleChanged,
	type = "text",
	...props
}) {
	return (
		<InputGroup id={`input-group-${toKebabCase(propertyName)}`} {...props}>
			<InputGroup.Text>{label ? label : propertyName}</InputGroup.Text>
			<Form.Control
				type={type}
				id={toKebabCase(propertyName)}
				placeholder={placeholderVal}
				onChange={(e) => handleChanged(e)}
			/>
		</InputGroup>
	);
}

export default InputGroupForm;
