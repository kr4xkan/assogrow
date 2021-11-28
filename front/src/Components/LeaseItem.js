import React from 'react';
import '../assets/SearchItem.css';

const StockItem = ({ data }) => {
	return (
		<div className="item stock">
			<div>
				<p className="surname">{data.dossier.nom}</p>
				<p className="desc">Baguette</p>
				<p className="phone">{data.date}</p>
			</div>
		</div>
	);
};

export default StockItem;