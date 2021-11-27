import React, { useContext, useEffect, useState } from 'react';
import '../assets/Dossier.css';
import axios from "axios";

import config from '../config';
import AuthContext from '../AuthContext';
import List from './List';
import DossierItem from '../Components/DossierItem';

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

	const fileUpload = (id) => {
		const formData = new FormData();
		formData.append('file', file);
		axios.post(config.api_url + '/dossier/upload/' + id, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then((res) => console.log(res))
		.catch((err) => console.error(err));
	};

	const create = (e) => {
		e.preventDefault();
		const token = localStorage.getItem('token');
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
				<label for="upload">AJOUTER UN PDF</label>
				<input type="file" id="upload" onChange={(e) => setFile(e.target.files[0])} />
				<input className="send" type="submit" value="CREER" />
			</form>
			<div className="list">
				<List data={dossiers} Component={DossierItem} />
			</div>
		</div>
	);
};

export default DossierPage;