import React from 'react';
import '../assets/List.css';

const ListPage = ({ data, Component, title }) => {
	return (
		<div className="container">
			<h1>{title}</h1>
			<div className="list">
				{
					[...data].reverse().map((d, i) => (
						<Component key={i} data={d} />
					))
				}
			</div>
		</div>
	);
};

export default ListPage;