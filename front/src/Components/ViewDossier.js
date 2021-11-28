import "../assets/ViewDossier.css";
import { Document } from "react-pdf";

const ViewDossier = ({ dossier }) => {

	return (
		<div className="modaldos">
			<div className="inner">
				<h1>{dossier.name}</h1>

				<iframe title="pdf" src={dossier.pdf} />

				<div>
					<button>ACCEPTER</button>
					<button>REFUSER</button>
				</div>
			</div>
		</div>
	);
};

export default ViewDossier;
