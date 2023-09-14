import { Counter } from "./components/Counter";
import { Party } from "./components/Party";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/party',
    element: <Party />
  }
];

export default AppRoutes;
