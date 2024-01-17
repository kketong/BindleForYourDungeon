
import Characters from "./components/Characters/Characters";
import CharacterDetails from "./components/Characters/CharacterDetails";
import { Home } from "./components/Home";
import withRouter from "./WithRouter";
//const CharacterRouter = () => {
//    const { characterId } = useParams();

//    // Check if the query parameter exists
//    if (characterId) {
//        // Render ComponentTwo if the query parameter exists
//        return <CharacterDetails />;
//    } else {
//        // Render ComponentOne if the query parameter doesn't exist
//        return <Characters />;
//    }
//};

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        index: false,
        path: '/Characters',
        exact: true,
        nestedPaths: [
            {
                index: true,
                path: '*',
                element: <Characters />,
            },
            {
                path: '/details/:characterId',
                element: withRouter(<CharacterDetails />),
            },
        ],
    },
];

export default AppRoutes;
