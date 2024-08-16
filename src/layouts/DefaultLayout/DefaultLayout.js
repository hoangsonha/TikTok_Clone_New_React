import classNames from 'classnames/bind';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styles from './DefaultLayout.module.scss';
import {
    HomeActiveIconNavigation,
    ExploreIconNavigation,
    FollowingIconNavigation,
    LiveIconNavigation,
    ProfileIconNavigation,
    HomeIconNavigation,
    ExploreActiveIconNavigation,
    FollowingActiveIconNavigation,
    LiveActiveIconNavigation,
    ProfileActiveIconNavigation,
    FriendIconNavigation,
    FriendActiveIconNavigation,
} from '~/components/Icon/icons';
import { config } from '~/config';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);

    const user = useSelector((state) => state.authReducer.user);

    const navigations = [
        {
            title: 'For You',
            icon: HomeIconNavigation,
            activeIcon: HomeActiveIconNavigation,
            to: config.routes.home,
        },
        {
            title: 'Explore',
            icon: ExploreIconNavigation,
            activeIcon: ExploreActiveIconNavigation,
            to: config.routes.explore,
        },
        {
            title: 'Following',
            icon: FollowingIconNavigation,
            activeIcon: FollowingActiveIconNavigation,
            to: config.routes.following,
        },
        {
            title: 'LIVE',
            icon: LiveIconNavigation,
            activeIcon: LiveActiveIconNavigation,
            to: config.routes.live,
        },
        {
            title: 'Profile',
            icon: ProfileIconNavigation,
            activeIcon: ProfileActiveIconNavigation,
            to: config.routes.profile,
        },
    ];

    const navigationsAuth = [
        {
            title: 'For You',
            icon: HomeIconNavigation,
            activeIcon: HomeActiveIconNavigation,
            to: config.routes.home,
        },
        {
            title: 'Explore',
            icon: ExploreIconNavigation,
            activeIcon: ExploreActiveIconNavigation,
            to: config.routes.explore,
        },
        {
            title: 'Following',
            icon: FollowingIconNavigation,
            activeIcon: FollowingActiveIconNavigation,
            to: config.routes.following,
        },
        {
            title: 'Friends',
            icon: FriendIconNavigation,
            activeIcon: FriendActiveIconNavigation,
            to: config.routes.friend,
        },
        {
            title: 'LIVE',
            icon: LiveIconNavigation,
            activeIcon: LiveActiveIconNavigation,
            to: config.routes.live,
        },
        {
            title: 'Profile',
            icon: ProfileIconNavigation,
            activeIcon: ProfileActiveIconNavigation,
            to: `/@${user.nickName}`,
            avatar: true,
        },
    ];

    return (
        <>
            <div className={cx('wrapper')}>
                <Header />
                <div className={cx('content')}>
                    {isAuthenticated ? <Sidebar data={navigationsAuth} /> : <Sidebar data={navigations} />}
                    {children}
                </div>
            </div>
        </>
    );
}

export default DefaultLayout;
