import React, { useContext, useState } from 'react';
import '../assets/List.css';
import axios from "axios";

import config from '../config';
import AuthContext from '../AuthContext';

const ListPage = ({ data, Component, title }) => {
	return (
		<div className="container">
			<h1>{title}</h1>
			<div className="list">
				{
					data.map((d) => (
						<Component data={d} />
					))
				}
			</div>
		</div>
	);
};

export default ListPage;