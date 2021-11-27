import React from 'react';
import '../assets/SearchItem.css';

const SearchItem = ({product}) => {
  return (
    <div className="item">
		<img src="https://via.placeholder.com/128/0000FF" alt="banana" />
		<div>
			<p className="name">{product.name}</p>
			<p className="desc">{product.desc}</p>
			<p className="price">{product.price}€</p>
			<p className="owner">{product.owner.username}</p>
		</div>
    </div>
  );
};

export default SearchItem;