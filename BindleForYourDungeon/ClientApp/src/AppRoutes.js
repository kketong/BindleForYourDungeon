import { Party } from "./components/Party";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/party',
    element: <Party />
  }
];

export default AppRoutes;
