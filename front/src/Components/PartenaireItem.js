import React from 'react';
import '../assets/SearchItem.css';

const PartenaireItem = ({ data }) => {
	return (
		<div className="item partenaire">
			<div>
				<p className="surname">{data.name}</p>
				<p className="phone">{data.contact}</p>
			</div>
		</div>
	);
};

export default PartenaireItem;