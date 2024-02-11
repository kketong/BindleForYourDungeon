import {useState} from 'react';

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Stack from "react-bootstrap/Stack";

import { getAllSpells } from "../../apis/dnd5eapi";
import { PostDnD5ESpell, postFeat } from "../../apis/api";
import { getAllFeats } from "../../apis/open5eapi";
import { useToastContext } from "../../contexts/ToastContext";

export default function AdminPage() {
  const showToast = useToastContext();
  const [loading, setLoading] = useState(false);

  async function postSpells() {
    setLoading(true);
    const spells = await getAllSpells();
    for (const spell of spells) {
      try {
        await PostDnD5ESpell(spell);
      } catch (error) {
        console.log(error);
        showToast({
          variant: "danger",
          header: `Add spell '${spell.name}' failed with error ${error}.`,
          message: error.message,
        });
      }
    }    
    setLoading(false);
    showToast({
      variant: "success",
      header: `Load spells`,
      message: "Success!",
    });
  }

  async function postFeats() {
    setLoading(true);
    const response = await getAllFeats();
    for (const feat of response.results) {
      try {
        postFeat(feat);
      } catch (error) {
        console.log(error);
        showToast({
          variant: "danger",
          header: `Add feat '${feat.name}' failed`,
          message: error.message,
        });
      }
    }
    setLoading(false);
    showToast({
      variant: "success",
      header: `Load feats`,
      message: "Success!",
    });
  }

  return (
    <>
      <Stack>
        <Button onClick={postSpells}>Load spells from dnd5e</Button>
        <Button onClick={postFeats}>Load feats from open5e</Button>
        {loading && 
          <Spinner />
        }
      </Stack>
    </>
  );
}
