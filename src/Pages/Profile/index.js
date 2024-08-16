import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import { useSelector } from 'react-redux';
import Button from '~/components/Button';
import { IconAccountPrivate, IconEditProfile, IconNavigationPrivate } from '~/components/Icon/icons';
import Video from '~/components/Video';
import { useEffect, useState } from 'react';
import { get } from '~/utils/request';

const cx = classNames.bind(styles);

function Profile() {
    const user = useSelector((state) => state.authReducer.user);

    const menuNav = [
        {
            icon: null,
            title: 'Videos',
        },
        {
            icon: null,
            title: 'Reports',
        },
        {
            icon: <IconNavigationPrivate />,
            title: 'Favorites',
        },
        {
            icon: <IconNavigationPrivate />,
            title: 'Liked',
        },
    ];

    const menuTime = [
        {
            title: 'Lastest',
        },
        {
            title: 'Popular',
        },
        {
            title: 'Orderest',
        },
    ];

    const [api, setApi] = useState('Videos');

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const apiVideosById = async () => {
            const response = await get('/video/getAll/account', {
                params: {
                    accountID: user.id,
                },
            });
            setVideos(response.data);
        };
        apiVideosById();
    }, []);

    console.log(videos);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('info')}>
                    <img className={cx('avatar')} src={user.avatar} alt="No" />
                    <div className={cx('info-detail')}>
                        <h1 className={cx('nick-name')}>
                            {user.nickName}{' '}
                            <span>
                                <IconAccountPrivate className={cx('icon-private')} />
                            </span>
                        </h1>

                        <div className={cx('full-name')}>{user.fullName}</div>
                        <Button btnOutline classNames={cx('btn-edit')} classNameTitle={cx('header-title-edit')}>
                            <IconEditProfile className={cx('edit-icon')} />
                            Edit profile
                        </Button>
                    </div>
                </div>
                <div className={cx('count')}>
                    <span className={cx('count-title')}>
                        <span className={cx('count-number')}>12</span>Following
                    </span>
                    <span className={cx('count-title')}>
                        <span className={cx('count-number')}>{user.followed}</span>Followers
                    </span>
                    <span className={cx('count-title')}>
                        <span className={cx('count-number')}>{user.liked}</span>Likes
                    </span>
                </div>
                <h2 className={cx('contact')}>
                    {user.contact}
                    Nocontact
                </h2>
            </div>
            <div className={cx('body')}>
                <div className={cx('body-header')}>
                    <div className={cx('body-header-nav')}>
                        {menuNav.map((menu, index) => {
                            return (
                                <p
                                    key={index}
                                    className={cx('body-header-nav-item')}
                                    onClick={() => setApi(menu.title)}
                                >
                                    {menu.icon && <span className={cx('body-header-nav-icon')}>{menu.icon}</span>}
                                    <span className={cx('body-header-nav-title')}>{menu.title}</span>
                                </p>
                            );
                        })}
                    </div>
                    <div className={cx('body-header-title')}>
                        {menuTime.map((time, index) => {
                            return (
                                <p key={index} className={cx('body-header-title-item')}>
                                    {<span className={cx('body-header-title-title')}>{time.title}</span>}
                                </p>
                            );
                        })}
                    </div>
                </div>
                <div className={cx('body-video')}>
                    {videos &&
                        videos.map((vid, index) => {
                            return <Video data={vid} key={index} />;
                        })}
                </div>
            </div>
        </div>
    );
}

export default Profile;
