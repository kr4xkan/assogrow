import React from 'react';
import '../assets/SearchItem.css';

const DossierItem = ({ data, onClick }) => {

	let status = "NON TRAITE";
	if (data.status === 1) {
		status = "REFUSE";
	} else if (data.status === 2) {
		status = "ACCEPTE";
	}
	return (
		<div className="item dossier" onClick={onClick}>
			<div>
				<p className="surname">{data.nom} {data.prenom}</p>
				<p className="phone">{data.telephone}</p>
				<p className="status">{status}</p>
			</div>
		</div>
	);
};

export default DossierItem;