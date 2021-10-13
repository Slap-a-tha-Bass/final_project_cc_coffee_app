import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import RootLayout from './components/RootLayout';
import Home from './views/Home';
import Login from './views/Login';
import Profile from './views/Profile';
import Register from './views/Register';

const App = (props: AppProps) => {

	return (
		<RootLayout>
			<BrowserRouter>
				<NavBar />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/register">
						<Register />
					</Route>
					<PrivateRoute exact path="/profile">
						<Profile />
					</PrivateRoute>
				</Switch>
			</BrowserRouter>
		</RootLayout>
	);
};

interface AppProps { }

export default App;
