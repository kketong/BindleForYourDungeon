import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export const ToastContext = React.createContext([]);

export default function ToastContextWrapper({ children }) {
	const [toasts, setToastData] = React.useState([]);

	function pushToast(newToast) {
		setToastData((prev) => [...prev, newToast]);
	}

	React.useEffect(() => {
		if (toasts.length > 0) {
			const timer = setTimeout(
				() => setToastData(toasts.slice(1)),
				4000
			);
			return () => clearTimeout(timer);
		}
	}, [toasts]);

	return (
		<ToastContext.Provider value={pushToast}>
			{(toasts.length > 0) &&
				<ToastContainer position='bottom-end'>
					{toasts.map((toast, index) => (
							<Toast
								animation
								bg={toast.variant.toLowerCase()}
								key={`toast-${index}`}
							>
								<Toast.Header>
									<strong className="me-auto">{toast.header}</strong>
								</Toast.Header>
								<Toast.Body>{toast.message}</Toast.Body>
							</Toast>
					))}
				</ToastContainer>}
			{children}
		</ToastContext.Provider>
	);
}

export function useToastContext() {
	return React.useContext(ToastContext);
}