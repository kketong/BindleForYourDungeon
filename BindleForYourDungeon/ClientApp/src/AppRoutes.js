import { Characters } from "./components/Characters/Characters";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/Characters',
    element: <Characters />
  }
];

export default AppRoutes;
