import React from 'react';
import '../assets/SearchItem.css';

const StockItem = ({ data }) => {
	return (
		<div className="item stock">
			<div>
				<p className="surname">{data.item}</p>
				<p className="desc">{data.partenaire.name}</p>
				<p className="phone">{data.quantite}</p>
			</div>
		</div>
	);
};

export default StockItem;