import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import '../assets/Result.css';
import AuthContext from '../AuthContext';
import SearchItem from "../Components/SearchItem";
import config from '../config';

const ResultPage = () => {
	const { token } = useContext(AuthContext);
	const [data, setData] = useState([]);

	useEffect(() => {
		axios.get(config.api_url + '/product/all', {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		}).then((res) => {
			setData(res.data);
		})
	}, []);

	return (
		<div className="container">
		{
			data.map((product) => (
				<SearchItem product={product} />
			))
		}
		</div>
	);
};

export default ResultPage;