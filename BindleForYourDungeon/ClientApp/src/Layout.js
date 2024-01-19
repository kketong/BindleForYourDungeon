import NavMenu from './components/NavMenu';
import { Outlet, } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export default function Layout() {
	return (
		<div>
			<NavMenu />
			<Container>
				<Outlet />
			</Container>
		</div>
	);
}