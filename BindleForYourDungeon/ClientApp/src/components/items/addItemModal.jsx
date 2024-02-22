import { useState } from "react";
import Modal from "react-bootstrap/esm/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CustomItemForm from "./customItemForm";
import ItemSearch from "./itemSearch";

function AddItemModal({ ...props }) {
  const [key, setKey] = useState("custom");
  const [itemToAdd, setItemToAdd] = useState({});

  return (
    <Modal {...props}>
      <Modal.Header closeButton>Add an item</Modal.Header>
      <Modal.Body>
        <Tabs
          id="item-type-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="custom" title="Add a custom item">
            <CustomItemForm setItemToAdd={setItemToAdd} />
          </Tab>
          <Tab eventKey="dnd5e" title="Dnd5e Items">
            <ItemSearch isExternalSearch={true} setItemToAdd={setItemToAdd} />
          </Tab>
          <Tab eventKey="search" title="Item Search">
            <ItemSearch isExternalSearch={false} setItemToAdd={setItemToAdd} />
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}

export default AddItemModal;
