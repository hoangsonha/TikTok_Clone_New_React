import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';

import styles from './Home.module.scss';
import { CommentIcon, LikeIcon, MenuVideoIcon, SaveIcon, ShareIcon, TickFollowIcon } from '~/components/Icon/icons';
import Border from '~/components/Border';
import Button from '~/components/Button';
import { apiAllUser, apiAllVideo } from '~/serviceApi/getAll';
import { config } from '~/config';

const cx = classNames.bind(styles);

function Home() {
    const navigate = useNavigate();

    const [videos, setVideos] = useState([]);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const apiVideos = async () => {
            const result = await apiAllVideo();
            setVideos(result);
        };
        apiVideos();
    }, []);

    useEffect(() => {
        const apiUsers = async () => {
            const result = await apiAllUser();
            setUsers(result);
        };
        apiUsers();
    }, []);

    const handlePlay = (e) => {
        e.target.play();
    };

    const handleStop = (e) => {
        e.target.pause();
    };

    const userHaveVideo = (idAccount) => {
        const result = users.find((us) => {
            return us.id === idAccount;
        });
        return result;
    };

    const handleGoProfile = (acc) => {
        navigate(config.routes.profile.replace(':nickname', `@${acc && acc.nickName}`), { state: { acc: acc } });
    };

    return (
        <div className={cx('wrapper')}>
            {videos &&
                videos.map((video, index) => {
                    var acc = userHaveVideo(video.idAccount);

                    return (
                        <div className={cx('content')} key={index}>
                            <div className={cx('video')}>
                                <div className={cx('video-items')}>
                                    <video className={cx('video-item')} src={video.srcVideo} controls />
                                    {/* <div className={cx('control-video')}>
                                        <div className={cx('control-video-pause')}>!!</div>
                                        <div className={cx('control-video-start')}>{'>'}</div>
                                    </div> */}
                                </div>
                                <div className={cx('video-info')}>
                                    <div className={cx('image')}>
                                        <div>
                                            <Tippy
                                                interactive
                                                placement="bottom-start"
                                                offset={[-8, 25]}
                                                delay={[500, 800]}
                                                render={(attrs) => (
                                                    <div className="box" tabIndex="-1" {...attrs}>
                                                        <Border>
                                                            <div className={cx('tippy')}>
                                                                <div className={cx('tippy-avatar')}>
                                                                    {acc && (
                                                                        <img
                                                                            className={cx('tippy-avatar-detail')}
                                                                            src={acc.avatar}
                                                                            alt="No"
                                                                            onClick={() => handleGoProfile(acc)}
                                                                        />
                                                                    )}
                                                                    <Button btnOutline classNames={cx('btnFollow')}>
                                                                        Follow
                                                                    </Button>
                                                                </div>
                                                                <div className={cx('tippy-info')}>
                                                                    <h4
                                                                        className={cx('tippy-info-nickname')}
                                                                        onClick={() => handleGoProfile(acc)}
                                                                    >
                                                                        {acc && acc.nickName}
                                                                    </h4>
                                                                    <h5
                                                                        className={cx('tippy-info-fullname')}
                                                                        onClick={() => handleGoProfile(acc)}
                                                                    >
                                                                        {acc && acc.fullName}
                                                                    </h5>
                                                                    <div className={cx('tippy-info-count')}>
                                                                        <p>
                                                                            <span
                                                                                className={cx(
                                                                                    'tippy-info-count-follower',
                                                                                )}
                                                                            >
                                                                                {acc && acc.followed}
                                                                            </span>
                                                                            Followers
                                                                        </p>
                                                                        <p>
                                                                            <span
                                                                                className={cx('tippy-info-count-like')}
                                                                            >
                                                                                {acc && acc.liked}
                                                                            </span>
                                                                            Likes
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className={cx('tippy-contact')}>
                                                                    <p className={cx('tippy-contact-show')}>
                                                                        {acc && acc.contact}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </Border>
                                                    </div>
                                                )}
                                            >
                                                {acc && <img className={cx('avatar')} src={acc.avatar} alt="No" />}
                                            </Tippy>
                                        </div>
                                        <div className={cx('tick-follow')}>
                                            <TickFollowIcon />
                                        </div>
                                    </div>
                                    <div className={cx('like')}>
                                        <span className={cx('like-icons')}>
                                            <LikeIcon className={cx('like-icon')} />
                                        </span>

                                        <span className={cx('like-count')}>{video.liked}</span>
                                    </div>
                                    <div className={cx('comment')}>
                                        <span className={cx('comment-icons')}>
                                            <CommentIcon className={cx('comment-icon')} />
                                        </span>

                                        <span className={cx('comment-count')}>{video.commented}</span>
                                    </div>
                                    <div className={cx('save')}>
                                        <span className={cx('save-icons')}>
                                            <SaveIcon className={cx('save-icon')} />
                                        </span>
                                        <span className={cx('save-count')}>19.7K</span>
                                    </div>
                                    <div className={cx('share')}>
                                        <span className={cx('share-icons')}>
                                            <ShareIcon className={cx('share-icon')} />
                                        </span>
                                        <span className={cx('share-count')}>{video.shared}</span>
                                    </div>
                                    <div className={cx('menu')}>
                                        <span className={cx('menu-icons')}>
                                            <MenuVideoIcon className={cx('menu-icon')} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

export default Home;
