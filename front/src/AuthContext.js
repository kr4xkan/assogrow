import React, { useState } from 'react';

export const initialValue = {
	isLoggedIn: false,
	name: "",
	email: "",
	token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYTFlZjNkNmQwYmY3ZmQ2NDA1ZThiMCIsImlhdCI6MTYzODAwMjUxOCwiZXhwIjoxNjM4MTUzNzE4fQ.866wMkX7GqC9J1QVKI0258RVPJ--hj4_Z2CyWJL8RCs"
};

const AuthContext = React.createContext(initialValue);

export const AuthProvider = ({ children }) => {
	const [state,setState] = useState(initialValue);

	const login = (user) => {
		setState({
			token: user.accessToken,
			name: user.name,
			email: user.email,
			isLoggedIn: true
		});
		localStorage.setItem('token', user.accessToken);
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