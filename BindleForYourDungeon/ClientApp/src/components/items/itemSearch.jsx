import React, { useEffect, useMemo, useState } from "react";
import Form from "react-bootstrap/Form";
import FormSelect from "react-bootstrap/esm/FormSelect";
import {
  getAllEquipment,
  getAllEquipmentCategories,
} from "../../apis/dnd5eapi";

function ItemSearch({ isExternalSearch, ...props }) {
  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [itemTypes, setItemTypes] = useState([]);
  const [items, setItems] = useState([]);

  async function getTypeFilters() {
    if (isExternalSearch) {
      const result = await getAllEquipmentCategories();
      return result;
    } else {
      return ["Weapons"];
    }
  }

  const visibleItems = useMemo(() => {
    if (nameFilter === "") {
      return items;
    }
    return items.filter((item) =>
      item.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }, [items, nameFilter]);

  useEffect(() => {
    getTypeFilters().then(setItemTypes);
  }, []);

  useEffect(() => {
    async function getItemsFromDnd5E() {
      return await getAllEquipment(typeFilter);
    }

    if (isExternalSearch) {
      if (typeFilter !== "") {
          getItemsFromDnd5E().then((items) => {
              const type = typeFilter.trim("/api/equipment-categories/");
              switch (type) {
                  case "armor": 
                      let armors = [];
                      items.map((armor) => {
                          armors.push({armor.})
                      }
                      break;
                  default:
                      break;
              }
          });
      }
    } else {
      setItems([]);
    }
  }, [isExternalSearch, typeFilter]);

  function handleTypeFilterChange(event) {
    setTypeFilter(event.target.value);
  }

  return (
    <>
      <Form>
        <FormSelect onChange={handleTypeFilterChange}>
          {itemTypes.map((value) => (
            <option key={`type-filter-${value.name}`} value={value.url}>
              {value.name}
            </option>
          ))}
        </FormSelect>
      </Form>
      <ul>
        {visibleItems.map((item) => 
          <li>{item.name}</li>
        )}
      </ul>
    </>
  );
}

export default ItemSearch;
