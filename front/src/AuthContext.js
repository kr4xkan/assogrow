import React, { useState } from 'react';

export const initialValue = {
	isLoggedIn: false,
	name: "",
	email: "",
	address: ""
};

const AuthContext = React.createContext(initialValue);

export const AuthProvider = ({ children }) => {
	const [state,setState] = useState(initialValue);

	const login = (user) => {
		setState({
			address: user.address,
			name: user.name,
			email: user.email,
			isLoggedIn: true
		});
	}

	return (
		<AuthContext.Provider value={{
			...state,
			login
		}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext;