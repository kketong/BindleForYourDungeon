import { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";

import Accordion from "react-bootstrap/Accordion";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

import { getFeats } from "../../../apis/api";
import { FeatAccordionItem } from "../feats/FeatAccordionItem";
import Pagination from '../../Pagination';

function AddFeatsModal({
	character,
	addFeat,
	handleClose,
	...props
}) {
	const [feats, setFeats] = useState([]);
	const pageSize = 7;
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		getFeats().then(setFeats);
	}, []);
	
	return (
		<Modal {...props}>
			<Modal.Header closeButton>
				<Modal.Title>Feats</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{feats.length < 1 ?
					<Spinner className="align-center" animation="border" />
					:
					<Accordion>
						{feats.slice((currentPage - 1) * pageSize, currentPage * pageSize)
							.map(feat => 
								<FeatAccordionItem
									key={feat.id}
									character={character}
									feat={feat}
									addFeat={addFeat}
								/>
							)}
					</Accordion>
				}
			</Modal.Body>
			<Modal.Footer>
				{feats.length > pageSize &&
					<Pagination
						itemsCount={feats.length}
						itemsPerPage={pageSize}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						alwaysShown={false} />
				}
			</Modal.Footer>
		</Modal>
	);
}

AddFeatsModal.propTypes = {};

export default AddFeatsModal;
