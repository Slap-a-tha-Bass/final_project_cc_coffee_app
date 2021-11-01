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
import Github from './views/social_media/Github';
import EditOrder from './views/EditOrder';
import Payment from './views/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Receipts from './views/Receipts';


const stripe = loadStripe('pk_test_51JWlwbFmDISVkVU8c8Pfwiku0g2eXRukfDfdjNyW8336baPHPUwsYg4nm2kuUr4WzzXAgQEVr2k9VDTFN6HtaSHa00PBWeP8Nc');
const App = (props: AppProps) => {

	return (
		<RootLayout>
			<BrowserRouter>
				<NavBar />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<PrivateRoute exact path="/placeorder">
						<PlaceOrder />
					</PrivateRoute>
					<PrivateRoute exact path="/orders">
						<Orders />
					</PrivateRoute>
					<Route exact path="/orders/:id">
						<ViewOrder />
					</Route>
					<Route exact path="/orders/:id/payment">
						<Elements stripe={stripe}>
							<Payment />
						</Elements>
					</Route>
					<Route exact path="/edit/:id">
						<EditOrder />
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/register">
						<Register />
					</Route>
					<Route exact path="/receipts">
						<Receipts />
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
					<Route exact path="/github">
						<Github />
					</Route>
				</Switch>
			</BrowserRouter>
		</RootLayout>
	);
};

interface AppProps { }

export default App;
