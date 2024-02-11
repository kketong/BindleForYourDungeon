import React from 'react';

import Container from 'react-bootstrap/Container';

import NavMenu from './components/NavMenu';
import { Outlet, } from 'react-router-dom';

import ToastContextWrapper from './contexts/ToastContext';

export default function Layout() {

	return (
		<>
			<NavMenu />
			<Container>
				<ToastContextWrapper>
						<Outlet />
			</ToastContextWrapper>
			</Container>
		</>
	);
}