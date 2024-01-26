import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState
} from 'react';
import { Toast } from 'react-bootstrap';

const ToastContext = createContext();

export default ToastContext;
export function ToastContextProvider({ children }) {
	const [toasts, setToasts] = useState([]);

	useEffect(() => {
		if (toasts.length > 0) {
			const timer = setTimeout(
				() => setToasts => toasts.slice(1),
				3000
			);
			return () => clearTimeout(timer);
		}
	}, [toasts]);

	const addToast = useCallback(
		function (toast) {
			setToasts((toasts) => [...toasts, toast]);
		},
		[setToasts]
	);

	return (
		<ToastContext.Provider value={addToast}>
			{toasts.map((toast) =>
				<Toast variant={toast.variant}>
					<Toast.Header>
						{/*<img*/}
						{/*    src="holder.js/20x20?text=%20"*/}
						{/*    className="rounded me-2"*/}
						{/*    alt=""*/}
						{/*/>*/}
						<strong className="me-auto">{toast.header}</strong>
					</Toast.Header>
					<Toast.Body>{toast.message}</Toast.Body>
				</Toast>
			)}
			{children}
		</ToastContext.Provider>
	);
}
export function useToastDispatch() {
	return useContext(ToastContext);
}