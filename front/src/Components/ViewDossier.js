import "../assets/ViewDossier.css";
import config from "../config";
import axios from "axios";

const ViewDossier = ({ dossier, close }) => {

	function mark(st) {
		const token = localStorage.getItem('token');
		axios.put(config.api_url + '/dossier/mark', {
			status: st,
			id: dossier._id
		}, {
			headers: {
				'Authorization': 'Bearer ' + token
			}
		}).then(() => {
			close();
		}).catch(err => console.error(err))
	}

	return (
		<div className="modaldos">
			<div className="inner">
				<h1>{dossier.nom}</h1>

				<iframe title="pdf" src={config.api_url + '/' + dossier.pdf} />

				<div>
					<button onClick={() => mark(2)}>ACCEPTER</button>
					<button onClick={() => mark(1)}>REFUSER</button>
				</div>

				<button onClick={close}>X</button>
			</div>
		</div>
	);
};

export default ViewDossier;
