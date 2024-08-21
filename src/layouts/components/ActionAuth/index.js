import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import Tippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';

import styles from './ActionAuth.module.scss';
import Button from '~/components/Button';
import {
    IconCreateorTools,
    IconFeedbackHelp,
    IconGetCoins,
    IconLanguage,
    IconLogout,
    IconSettings,
    IconTheme,
    IconViewProfile,
    InboxIconAuth,
    MessageIconAuth,
    TickFollowIcon,
} from '~/components/Icon/icons';
import Border from '~/components/Border';
import Menu from '~/components/Menu';
import { actionLogout } from '~/redux/actions/actionLogin';
import { useState } from 'react';
import { config } from '~/config';

const cx = classNames.bind(styles);

function ActionAuth() {
    const menuItems = [
        {
            type: 'Menu',
            icon: IconViewProfile,
            title: 'View profile',
        },
        {
            type: 'Menu',
            icon: IconGetCoins,
            title: 'Get Coins',
        },
        {
            type: 'Menu',
            icon: IconCreateorTools,
            title: 'Creator tools',
        },
        {
            type: 'Menu',
            icon: IconSettings,
            title: 'Settings',
        },
        {
            type: 'Menu',
            icon: IconLanguage,
            title: 'English',
            children: {
                title: 'Language',
                data: [
                    {
                        type: 'Language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'Language',
                        code: 'vi',
                        title: 'Vietnamese',
                    },
                    {
                        type: 'Language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'Language',
                        code: 'vi',
                        title: 'Vietnamese',
                    },
                    {
                        type: 'Language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'Language',
                        code: 'vi',
                        title: 'Vietnamese',
                    },
                    {
                        type: 'Language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'Language',
                        code: 'vi',
                        title: 'Vietnamese',
                    },
                    {
                        type: 'Language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'Language',
                        code: 'vi',
                        title: 'Vietnamese',
                    },
                    {
                        type: 'Language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'Language',
                        code: 'vi',
                        title: 'Vietnamese',
                    },
                    {
                        type: 'Language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'Language',
                        code: 'vi',
                        title: 'Vietnamese',
                    },
                    {
                        type: 'Language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'Language',
                        code: 'vi',
                        title: 'Vietnamese',
                    },
                ],
            },
        },
        {
            type: 'Menu',
            icon: IconFeedbackHelp,
            title: 'Feedback and help',
        },
        {
            type: 'Menu',
            icon: IconTheme,
            title: 'Dark mode',
        },
        {
            type: 'Menu',
            icon: IconLogout,
            title: 'Log out',
            separate: true,
        },
    ];

    const user = useSelector((state) => state.authReducer.user);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [visible, setVisible] = useState(false);

    // handle item đc chọn từ menu
    const handleGetItemMenu = (itemClicked) => {
        switch (itemClicked.type) {
            case 'Language':
                // handle change language
                break;

            case 'Menu':
                if (itemClicked.title === 'Log out') {
                    dispatch(actionLogout());
                    navigate('/');
                    break;
                }
                if (itemClicked.title === 'View profile') {
                    navigate(config.routes.profile.replace(':nickname', `@${user && user.nickName}`));
                    setVisible(false);
                }

            default:
                break;
        }
    };

    const renderMenuItems = (attrs) => (
        <div className="wrapper" tabIndex="-1" {...attrs}>
            <Border>
                <div className={cx('wrapper-menu-item')}>
                    <Menu data={menuItems} onGetItem={handleGetItemMenu} />
                </div>
            </Border>
        </div>
    );

    return (
        <div className={cx('wrapper')}>
            <Button btnOutline classNames={cx('btn-upload')} classNameTitle={cx('btn-upload-title')} to={'/upload'}>
                <TickFollowIcon className={cx('btn-upload-icon')} />
                Upload
            </Button>
            <Tippy delay={[0, 50]} content="Messages" placement="bottom">
                <span className={cx('message')}>
                    <MessageIconAuth className={cx('message-icon')} />
                </span>
            </Tippy>
            <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                <span className={cx('inbox')}>
                    <InboxIconAuth className={cx('inbox-icon')} />
                </span>
            </Tippy>
            <span className={cx('inbox-count')}>43</span>
            <Tippy interactive render={renderMenuItems} offset={[14, 11]} placement="bottom-end" delay={[0, 600]}>
                {user && user.avatar && <img className={cx('user-avatar')} src={user.avatar} alt="No" />}
            </Tippy>
        </div>
    );
}

export default ActionAuth;
