import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import styles from './Profile.module.scss';
import Button from '~/components/Button';
import {
    IconAccountPrivate,
    IconEditProfile,
    IconNavigationPrivate,
    IconShareProfile,
    IconViewProfile,
} from '~/components/Icon/icons';
import Video from '~/components/Video';
import EditAccount from '~/layouts/components/EditAccount';
import { apiAllVideoById } from '~/serviceApi/getAll';

const cx = classNames.bind(styles);

function Profile() {
    const user = useSelector((state) => state.authReducer.user);

    const localtion = useLocation();

    const { nickname } = useParams();

    const [isCurrent, setIsCurrent] = useState(user.nickName === nickname.replace('@', ''));

    const [otherUser, setOtherUser] = useState(!isCurrent ? localtion.state.acc : null);

    const apiVideosById = async (id) => {
        const response = await apiAllVideoById(id);
        setVideos(response);
    };

    const apiReportsById = async (id) => {
        const response = await apiAllVideoById(id);
        setVideos(response);
    };

    const apiFavoritesById = async (id) => {
        const response = await apiAllVideoById(user.id);
        setVideos(response);
    };

    const apiLikedById = async (id) => {
        const response = await apiAllVideoById(id);
        setVideos(response);
    };

    const menuNav = [
        {
            icon: null,
            title: 'Videos',
            apiCall: apiVideosById,
            border: true,
        },
        {
            icon: null,
            title: 'Reports',
            apiCall: apiReportsById,
            border: false,
        },
        {
            icon: <IconNavigationPrivate />,
            title: 'Favorites',
            apiCall: apiFavoritesById,
            border: false,
        },
        {
            icon: <IconNavigationPrivate />,
            title: 'Liked',
            apiCall: apiLikedById,
            border: false,
        },
    ];

    const menuNavOtherAccount = [
        {
            icon: null,
            title: 'Videos',
            apiCall: apiVideosById,
            border: true,
        },
        {
            icon: null,
            title: 'Reports',
            apiCall: apiReportsById,
            border: false,
        },
        {
            icon: <IconNavigationPrivate />,
            title: 'Liked',
            apiCall: apiLikedById,
            border: false,
        },
    ];

    const menuTime = [
        {
            title: 'Latest',
            apiCall: apiVideosById,
        },
        {
            title: 'Popular',
            apiCall: apiVideosById,
        },
        {
            title: 'Oldest',
            apiCall: apiVideosById,
        },
    ];

    // video, favorite, ...

    const [api, setApi] = useState({
        icon: null,
        title: 'Videos',
        apiCall: apiVideosById,
    });

    // oderer, latest

    const [apiTime, setApiTime] = useState({
        title: 'Lastest',
        apiCall: apiVideosById,
    });

    const [videos, setVideos] = useState([]);

    const [cssBorder, setCssBorder] = useState(isCurrent ? menuNav : menuNavOtherAccount);

    const [showEdit, setShowEdit] = useState(false);

    const check = () => {
        const isCurrentUser = user.nickName === nickname.replace('@', '');
        if (!isCurrentUser) {
            setOtherUser(localtion && localtion.state.acc);
            setIsCurrent(false);
        } else {
            setIsCurrent(true);
        }
        // console.log('isCurrentUser', isCurrent + ' | nickname ', nickname.replace('@', ''));
    };

    useEffect(() => {
        check();
    }, [nickname, otherUser, isCurrent]);

    useEffect(() => {
        api.apiCall(isCurrent ? user.id : otherUser.id);
    }, [api, nickname, otherUser, isCurrent]);

    const handleCallApi = (menu) => {
        setApi(menu);

        cssBorder.map((me) => {
            if (menu === me) me.border = true;
            else me.border = false;
            return me;
        });
    };

    const handleCallApiByTime = (time) => {
        setApiTime(time);
    };

    const handleEditAccount = () => {
        setShowEdit(true);
    };

    const handleShowEditForm = (e) => {
        setShowEdit(e);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('info')}>
                    {isCurrent ? (
                        <img className={cx('avatar')} src={user.avatar} alt="No" />
                    ) : (
                        <img className={cx('avatar')} src={otherUser.avatar} alt="No" />
                    )}
                    <div className={cx('info-detail')}>
                        <h1 className={cx('nick-name')}>
                            {isCurrent ? (
                                <>
                                    {user.nickName}{' '}
                                    <span>
                                        <IconAccountPrivate className={cx('icon-private')} />
                                    </span>
                                </>
                            ) : (
                                <>{otherUser.nickName} </>
                            )}
                        </h1>

                        {isCurrent ? (
                            <div className={cx('full-name')}>{user.fullName}</div>
                        ) : (
                            <div className={cx('full-name')}>{otherUser.fullName}</div>
                        )}

                        {isCurrent ? (
                            <Button
                                btnOutline
                                classNames={cx('btn-edit')}
                                classNameTitle={cx('header-title-edit')}
                                onClick={handleEditAccount}
                            >
                                <IconEditProfile className={cx('edit-icon')} />
                                Edit profile
                            </Button>
                        ) : (
                            <Button
                                btnPrimary
                                classNames={cx('btn-follow')}
                                classNameTitle={cx('header-title-follow')}
                                onClick={handleEditAccount}
                            >
                                Follow
                            </Button>
                        )}
                    </div>
                </div>
                <div className={cx('count')}>
                    <span className={cx('count-title')}>
                        <span className={cx('count-number')}>12</span>Following
                    </span>
                    <span className={cx('count-title')}>
                        <span className={cx('count-number')}>{isCurrent ? user.followed : otherUser.followed}</span>
                        Followers
                    </span>
                    <span className={cx('count-title')}>
                        <span className={cx('count-number')}>{isCurrent ? user.liked : otherUser.liked}</span>Likes
                    </span>
                </div>
                <h2 className={cx('contact')}>
                    {isCurrent
                        ? user.contact
                            ? user.contact
                            : 'No bio yet.'
                        : otherUser.contact
                        ? otherUser.contact
                        : 'No bio yet.'}
                </h2>
                <IconShareProfile className={cx('icon-share')} />
            </div>

            <div className={cx('body')}>
                <div className={cx('body-header')}>
                    <div className={cx('body-header-nav')}>
                        {cssBorder.map((menu, index) => {
                            return (
                                <p
                                    key={index}
                                    className={cx('body-header-nav-item', { 'border-hover': menu.border })}
                                    onClick={() => handleCallApi(menu)}
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
                                <p
                                    key={index}
                                    className={cx('body-header-title-item')}
                                    onClick={() => handleCallApiByTime(time)}
                                >
                                    {<span className={cx('body-header-title-title')}>{time.title}</span>}
                                </p>
                            );
                        })}
                    </div>
                </div>
                <div className={cx('body-video')}>
                    {videos ? (
                        <>
                            {videos.map((vid, index) => {
                                return <Video data={vid} key={index} />;
                            })}
                        </>
                    ) : (
                        <div className={cx('body-video-no-video')}>
                            <IconViewProfile className={cx('body-video-no-video-icon')} />
                            <span className={cx('body-video-no-video-title')}>No videos</span>
                        </div>
                    )}
                </div>
            </div>
            {showEdit && <EditAccount onShowEditForm={handleShowEditForm} />}
        </div>
    );
}

export default Profile;
