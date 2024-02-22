import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import AddItemModal from "./addItemModal";

export function Inventory(items) {
	const [showAddItemModal, setShowAddItemModal] = useState(false);

	function toggleShowAddItemModal() {
		setShowAddItemModal(!showAddItemModal);
	}

	return (
		<>
			<Button onClick={toggleShowAddItemModal}>Add item</Button>
			{showAddItemModal &&
				<AddItemModal
					show={showAddItemModal}
				onHide={toggleShowAddItemModal}
				/>
			}
		</>
	);
}
