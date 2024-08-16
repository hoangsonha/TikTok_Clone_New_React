import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import styles from './Sidebar.module.scss';
import Navigation from '~/layouts/components/Sidebar/Navigation';
import NavigationItem from '~/layouts/components/Sidebar/Navigation/NavigationItem';
import Button from '~/components/Button';
import SuggestedAccounts from '~/components/SuggestAccounts';

const cx = classNames.bind(styles);

function Sidebar({ data }) {
    const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);

    return (
        <aside className={cx('wrapper')}>
            <Navigation>
                {data &&
                    data.map((nav, index) => {
                        const Icon = nav.icon;

                        const ActiveIcon = nav.activeIcon;

                        {
                            /* const Icon = Fragment;
                        if (nav.icon !== null) {
                            Icon = nav.icon;
                        }
                        const ActiveIcon = Fragment;
                        if (nav.activeIcon !== null) {
                            Icon = nav.activeIcon;
                        } */
                        }
                        return (
                            <NavigationItem
                                key={index}
                                title={nav.title}
                                icon={<Icon />}
                                activeIcon={<ActiveIcon />}
                                to={nav.to}
                                avatar={nav.avatar}
                            ></NavigationItem>
                        );
                    })}
            </Navigation>
            {isAuthenticated ? (
                <SuggestedAccounts label="Suggested accounts" />
            ) : (
                <div className={cx('body')}>
                    <h5 className={cx('text')}>Log in to follow creators, like videos, and view comments.</h5>
                    <Button btnOutline classNames={cx('btn')} to="/login">
                        Log in
                    </Button>
                </div>
            )}

            <div className={cx('footer')}>
                <a className={cx('link')} href="#">
                    <img
                        className={cx('img-reward')}
                        src="https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/tiktok/webapp/main/webapp-desktop/8152caf0c8e8bc67ae0d.png"
                        alt="Tiktok Reward"
                    />
                    <div className={cx('img-title')}>Create TikTok effects, get a reward</div>
                </a>

                <div className={cx('info')}>
                    <h4 className={cx('info-title')}>Company</h4>
                    {/* <div className={cx('info-company-item')}>
                        <a>About</a>
                        <a>Newsroom</a>
                        <a>Contact</a>
                        <a>Careers</a>
                    </div> */}
                    <h4 className={cx('info-title')}>Program</h4>
                    {/* <div>
                        <a>TikTok for Good</a>
                        <a>Advertise</a>
                        <a>TikTok LIVE Creator Networks</a>
                        <a>Developers</a>
                        <a>Transparency</a>
                        <a>TikTok Rewards</a>
                        <a>TikTok Embeds</a>
                    </div> */}
                    <h4 className={cx('info-title')}>Terms & Policies</h4>
                    {/* <div>
                        <a>TikTok for Good</a>
                        <a>Advertise</a>
                        <a>TikTok LIVE Creator Networks</a>
                        <a>Developers</a>
                        <a>Transparency</a>
                        <a>TikTok Rewards</a>
                        <a>TikTok Embeds</a>
                    </div> */}
                    <span className={cx('copyright')}>
                        <span className={cx('copyright-icon')}>©</span> 2024 TikTok
                    </span>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
