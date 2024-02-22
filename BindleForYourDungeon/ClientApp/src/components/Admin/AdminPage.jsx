import { useState } from 'react';

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Stack from "react-bootstrap/Stack";

import { getAllSpells } from "../../apis/dnd5eapi";
import { PostDnD5ESpell, postFeat, postWeapon } from "../../apis/api";
import { getOpen5eFeats, getOpen5eWeapons } from "../../apis/open5eapi";
import { useToastContext } from "../../contexts/ToastContext";

export default function AdminPage() {
	const showToast = useToastContext();
	const [loading, setLoading] = useState(false);

	async function loadDnD5eSpells() {
		setLoading(true);
		const spells = await getAllSpells();
		const errors = [];
		for (const spell of spells) {
			try {
				await PostDnD5ESpell(spell);
			} catch (error) {
				errors.push(spell.name);
			}
		}
		setLoading(false);
		if (errors.length > 0) {
			showToast({
				variant: "danger",
				header: `Load dnd5e spells`,
				message: `The following spells failed: ${errors.join(', ')}`,
			});
		}
		else {
			showToast({
				variant: "success",
				header: `Load dnd5e spells`,
				message: "Success!",
			});
		}
	}

	async function loadOpen5eFeats() {
		setLoading(true);
		const response = await getOpen5eFeats();
		const errors = [];
		for (const feat of response.results) {
			try {
				postFeat(feat);
			} catch (error) {
				errors.push(feat.name);
			}
		}
		setLoading(false);
		if (errors.length > 0) {
			showToast({
				variant: "danger",
				header: `Load open5e feats`,
				message: `The following feats failed: ${errors.join(', ')}`,
			});
		}
		else {
			showToast({
				variant: "success",
				header: `Load open5e feats`,
				message: "Success!",
			});
		}
	}

	async function loadOpen5eWeapons() {
		setLoading(true);
		const response = await getOpen5eWeapons();
		const errors = [];
		for (const weapon of response.results) {
			const cost = weapon.cost.includes("sp") ? parseInt(weapon.cost.trimEnd(" sp")) * 10 : parseInt(weapon.cost.trimEnd(" gp")) * 100;
			const weight = parseFloat(weapon.weight.trimEnd(" lb."));
			const parsedWeapon = {
				...weapon,
				cost: cost,
				damageDice: weapon.damage_dice,
				damageType: weapon.damage_type,
				weight: weight
			};
			try {
				postWeapon(parsedWeapon);
			} catch (error) {
				errors.push(weapon.name);
			}
		}
		setLoading(false);
		if (errors.length > 0) {
			showToast({
				variant: "danger",
				header: `Load open5e weapons`,
				message: `The following weapons failed: ${errors.join(', ')}`,
			});
		}
		else {
			showToast({
				variant: "success",
				header: `Load open5e weapons`,
				message: "Success!",
			});
		}
	}
	
	return (
		<>
			<Stack>
				<Button onClick={loadDnD5eSpells}>Load spells from dnd5e</Button>
				<Button onClick={loadOpen5eFeats}>Load feats from open5e</Button>
				<Button onClick={loadOpen5eWeapons}>Load weapons from open5e</Button>
				{loading &&
					<Spinner />
				}
			</Stack>
		</>
	);
}
