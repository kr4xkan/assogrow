import React, { useEffect, useState } from 'react';
import '../assets/Dossier.css';
import axios from "axios";

import config from '../config';
import List from './List';
import PartenaireItem from '../Components/PartenaireItem';

const PartnerPage = () => {

	const [partenaire, setPartenaire] = useState([]);

	const [name, setnom] = useState("");
	const [contact, setcontact] = useState("");

	useEffect(() => {
		const token = localStorage.getItem('token');
		axios.get(config.api_url + '/partenaires/all', {
			headers: {
				'Authorization': 'Bearer ' + token
			}
		}).then(res => {
			setPartenaire(res.data);
		}).catch(err => console.error(err));
	}, [])

	const refresh = () => {
		console.log("yooo");
		const token = localStorage.getItem('token');
		axios.get(config.api_url + '/partenaires/all', {
			headers: {
				'Authorization': 'Bearer ' + token
			}
		}).then(res => {
			setPartenaire(res.data);
		}).catch(err => console.error(err));
	};

	const create = (e) => {
		e.preventDefault();
		const token = localStorage.getItem('token');
		const data = {
			name,
			contact
		};
		axios.post(config.api_url + '/partenaires/add', data, {
			headers: {
				'Authorization': 'Bearer ' + token
			}
		}).then((res) => {
			
			refresh();
		})
			.catch((err) => console.error(err));
	};

	return (
		<div className="container">
			<form className="formdos formpart" onSubmit={create}>
				<div className="input">
					<label htmlFor="nom">Nom</label>
					<input type="text" name="nom" value={name} onChange={(e) => setnom(e.target.value)} />
				</div>
				<div className="input">
					<label htmlFor="contact">Contact</label>
					<input type="text" name="contact" value={contact} onChange={(e) => setcontact(e.target.value)} />
				</div>
				<input className="send" type="submit" value="AJOUTER LE PARTENAIRE" />
			</form>
			<div className="list">
				<List data={partenaire} Component={PartenaireItem} />
			</div>
		</div>
	);
};

export default PartnerPage;