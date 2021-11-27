import React from 'react';

export const initialValue = {
	isLoggedIn: false,
	name: "",
	email: "",
	address: ""
};

const AuthContext = React.createContext(initialValue);

export default AuthContext;