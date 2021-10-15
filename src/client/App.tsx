import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import RootLayout from './components/RootLayout';
import Facebook from './views/social_media/Facebook';
import Home from './views/Home';
import Instagram from './views/social_media/Instagram';
import Login from './views/Login';
import Orders from './views/Orders';
import PlaceOrder from './views/PlaceOrder';
import Profile from './views/Profile';
import Register from './views/Register';
import ViewOrder from './views/ViewOrder';
import Twitter from './views/social_media/Twitter';
import HomeBar from './views/HomeBar';


const App = (props: AppProps) => {

	return (
		<RootLayout>
			<BrowserRouter>
				<NavBar />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/homebar">
						<HomeBar />
					</Route>
					<Route exact path="/placeorder">
						<PlaceOrder />
					</Route>
					<Route exact path="/orders">
						<Orders />
					</Route>
					<Route exact path="/orders/:id">
						<ViewOrder />
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
					<Route exact path="/facebook">
						<Facebook />
					</Route>
					<Route exact path="/instagram">
						<Instagram />
					</Route>
					<Route exact path="/twitter">
						<Twitter />
					</Route>
				</Switch>
			</BrowserRouter>
		</RootLayout>
	);
};

interface AppProps { }

export default App;
