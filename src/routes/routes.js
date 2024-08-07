import { config } from '~/config';
import DefaultLayout from '~/layouts/DefaultLayout/DefaultLayout';
import Explore from '~/Pages/Explore';
import Following from '~/Pages/Following';
import Home from '~/Pages/Home';
import Live from '~/Pages/Live';

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
];

const privatePage = [];

export { publicPage, privatePage };
