import React, { useEffect, useState } from 'react';
import '../assets/Dossier.css';
import axios from "axios";

import config from '../config';
import List from './List';
import DossierItem from '../Components/DossierItem';
import ViewDossier from '../Components/ViewDossier';

const DossierPage = () => {

	const [dossiers, setDossiers] = useState([]);

	const [nom, setnom] = useState("");
	const [prenom, setprenom] = useState("");
	const [telephone, settelephone] = useState("");
	const [file, setFile] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem('token');
		axios.get(config.api_url + '/dossier/all', {
			headers: {
				'Authorization': 'Bearer ' + token
			}
		}).then(res => {
			setDossiers(res.data);
		}).catch(err => console.error(err));
	}, [])

	const refresh = () => {
		console.log("yooo");
		const token = localStorage.getItem('token');
		axios.get(config.api_url + '/dossier/all', {
			headers: {
				'Authorization': 'Bearer ' + token
			}
		}).then(res => {
			setDossiers(res.data);
		}).catch(err => console.error(err));
	};

	const fileUpload = (id) => {
		const formData = new FormData();
		formData.append('file', file);
		axios.post(config.api_url + '/dossier/upload/' + id, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then((res) => {
			setFile(null);
			setnom("")
			setprenom("")
			settelephone("")
			refresh()
		}).catch((err) => console.error(err));
	};

	const create = (e) => {
		e.preventDefault();
		const token = localStorage.getItem('token');
		if (nom === "" || prenom === "" || telephone === "" || file === null) return;
		const data = {
			nom,
			prenom,
			telephone
		};
		axios.post(config.api_url + '/dossier/new', data, {
			headers: {
				'Authorization': 'Bearer ' + token
			}
		}).then((res) => fileUpload(res.data))
			.catch((err) => console.error(err));
	};

	return (
		<React.Fragment>
			<div className="container">
				<form className="formdos" onSubmit={create}>
					<div className="input">
						<label htmlFor="nom">Nom</label>
						<input type="text" name="nom" value={nom} onChange={(e) => setnom(e.target.value)} />
					</div>
					<div className="input">
						<label htmlFor="prenom">Prenom</label>
						<input type="text" name="prenom" value={prenom} onChange={(e) => setprenom(e.target.value)} />
					</div>
					<div className="input">
						<label htmlFor="telephone">Telephone</label>
						<input type="text" name="telephone" value={telephone} onChange={(e) => settelephone(e.target.value)} />
					</div>
					<label htmlFor="upload" className={file != null && "valid"}>{file != null ? file.name : "AJOUTER UN PDF"}</label>
					<input type="file" id="upload" onChange={(e) => setFile(e.target.files[0])} />
					<input className="send" type="submit" value="CREER" />
				</form>
				<div className="list">
					<List data={dossiers} Component={DossierItem} />
				</div>
			</div>
			<ViewDossier dossier={{name: "test", pdf: "http://localhost:3000/uploads/1638035178353-42308.pdf"}} />
		</React.Fragment>
	);
};

export default DossierPage;