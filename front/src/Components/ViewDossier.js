import "../assets/ViewDossier.css";
import { Document } from "react-pdf";
import config from "../config";

const ViewDossier = ({ dossier, close }) => {

	return (
		<div className="modaldos">
			<div className="inner">
				<h1>{dossier.nom}</h1>

				<iframe title="pdf" src={config.api_url + '/' + dossier.pdf} />

				<div>
					<button>ACCEPTER</button>
					<button>REFUSER</button>
				</div>

				<button onClick={close}>X</button>
			</div>
		</div>
	);
};

export default ViewDossier;
