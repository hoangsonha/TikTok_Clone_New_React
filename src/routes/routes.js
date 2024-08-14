import { config } from '~/config';
import Explore from '~/Pages/Explore';
import Following from '~/Pages/Following';
import Home from '~/Pages/Home';
import Live from '~/Pages/Live';
import Login from '~/Pages/Login';
import Profile from '~/Pages/Profile';

const publicPage = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.live,
        component: Live,
    },
    {
        path: config.routes.following,
        component: Following,
    },
    {
        path: config.routes.explore,
        component: Explore,
    },
    {
        path: config.routes.profile,
        component: Profile,
    },
    {
        path: config.routes.login,
        component: Login,
    },
];

const privatePage = [];

export { publicPage, privatePage };
