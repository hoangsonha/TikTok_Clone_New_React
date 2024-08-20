import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import styles from './Profile.module.scss';
import Button from '~/components/Button';
import { IconAccountPrivate, IconEditProfile, IconNavigationPrivate, IconShareProfile } from '~/components/Icon/icons';
import Video from '~/components/Video';
import EditAccount from '~/layouts/components/EditAccount';
import { apiAllVideoById, getAccountByNickName } from '~/serviceApi/getAll';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Profile() {
    const user = useSelector((state) => state.authReducer.user);

    const [otherUser, setOtherUser] = useState();

    const { nickname } = useParams();

    const [isCurrent, setIsCurrent] = useState(true);

    const [loading, setLoading] = useState(false);

    const check = () => {
        const isCurrentUser = user.nickName === nickname.replace('@', '');
        if (!isCurrentUser) {
            setIsCurrent(false);
        } else {
            setIsCurrent(true);
        }
        console.log('isCurrentUser', isCurrent + ' | nickname ', nickname.replace('@', ''));
    };

    check();

    useEffect(() => {
        if (isCurrent) {
            return;
        } else {
            const apiGetAccountByNickName = async () => {
                setLoading(true);
                const result = await getAccountByNickName(nickname.replace('@', ''));

                setOtherUser(result);
            };
            apiGetAccountByNickName();
            setLoading(false);
        }
    }, [nickname]);

    console.log(otherUser);

    const apiVideosById = async () => {
        const response = await apiAllVideoById(user.id);
        setVideos(response);
    };

    const apiReportsById = async () => {
        const response = await apiAllVideoById(user.id);
        setVideos(response);
    };

    const apiFavoritesById = async () => {
        const response = await apiAllVideoById(user.id);
        setVideos(response);
    };

    const apiLikedById = async () => {
        const response = await apiAllVideoById(user.id);
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

    const [api, setApi] = useState({
        icon: null,
        title: 'Videos',
        apiCall: apiVideosById,
    });

    const [apiTime, setApiTime] = useState({
        title: 'Lastest',
        apiCall: apiVideosById,
    });

    const [videos, setVideos] = useState([]);

    const [cssBorder, setCssBorder] = useState(menuNav);

    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        api.apiCall();
    }, [api]);

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
                            {isCurrent ? <>{user.nickName} </> : <>{otherUser.nickName} </>}

                            <span>
                                <IconAccountPrivate className={cx('icon-private')} />
                            </span>
                        </h1>

                        <div className={cx('full-name')}>{user.fullName}</div>

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
                                btnOutline
                                classNames={cx('btn-edit')}
                                classNameTitle={cx('header-title-edit')}
                                onClick={handleEditAccount}
                            >
                                <IconEditProfile className={cx('edit-icon')} />
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
                        <span className={cx('count-number')}>{user.followed}</span>Followers
                    </span>
                    <span className={cx('count-title')}>
                        <span className={cx('count-number')}>{user.liked}</span>Likes
                    </span>
                </div>
                <h2 className={cx('contact')}>{user.contact}</h2>
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
                    {videos &&
                        videos.map((vid, index) => {
                            return <Video data={vid} key={index} />;
                        })}
                </div>
            </div>
            {showEdit && <EditAccount onShowEditForm={handleShowEditForm} />}
        </div>
    );
}

export default Profile;
