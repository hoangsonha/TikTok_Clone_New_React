import classNames from 'classnames/bind';
import { useEffect, useMemo, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';

import styles from './Home.module.scss';
import { CommentIcon, LikeIcon, MenuVideoIcon, SaveIcon, ShareIcon, TickFollowIcon } from '~/components/Icon/icons';
import Border from '~/components/Border';
import Button from '~/components/Button';
import { apiAllUser, apiAllVideo } from '~/serviceApi/getAll';
import { config } from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Home() {
    const navigate = useNavigate();

    const [videos, setVideos] = useState([]);

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const apiAll = async () => {
            const resultVideo = await apiAllVideo();
            setVideos(resultVideo);

            const resultUser = await apiAllUser();
            setUsers(resultUser);
        };
        apiAll();
        setLoading(false);
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

    // useMemo to remind the result of function videoByAccount and when the dependencies change, meno will handle logic again
    // (to avoid the re-render when user click to other Comp but click back to this Comp so the Comp will re-render again and will call useEffect again)

    const videoByAccount = useMemo(() => {
        // map to video and find user that are the same id

        return videos.map((video) => {
            const account = users.find((user) => user.id === video.idAccount) || {};
            return {
                account: { ...account },
                ...video,
            };
        });
    }, [videos, users, loading]);

    if (loading) {
        return (
            <div className={cx('loading')}>
                <FontAwesomeIcon icon={faSpinner} className={cx('loading-icon')} />
            </div>
        );
    }

    return (
        <div className={cx('wrapper')}>
            {videoByAccount &&
                videoByAccount.map((video, index) => {
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
                                                                    {videoByAccount[index].account && (
                                                                        <img
                                                                            className={cx('tippy-avatar-detail')}
                                                                            src={videoByAccount[index].account.avatar}
                                                                            alt="No"
                                                                            onClick={() =>
                                                                                handleGoProfile(
                                                                                    videoByAccount[index].account,
                                                                                )
                                                                            }
                                                                        />
                                                                    )}
                                                                    <Button btnOutline classNames={cx('btnFollow')}>
                                                                        Follow
                                                                    </Button>
                                                                </div>
                                                                <div className={cx('tippy-info')}>
                                                                    <h4
                                                                        className={cx('tippy-info-nickname')}
                                                                        onClick={() =>
                                                                            handleGoProfile(
                                                                                videoByAccount[index].account,
                                                                            )
                                                                        }
                                                                    >
                                                                        {videoByAccount[index].account &&
                                                                            videoByAccount[index].account.nickName}
                                                                    </h4>
                                                                    <h5
                                                                        className={cx('tippy-info-fullname')}
                                                                        onClick={() =>
                                                                            handleGoProfile(
                                                                                videoByAccount[index].account,
                                                                            )
                                                                        }
                                                                    >
                                                                        {videoByAccount[index].account &&
                                                                            videoByAccount[index].account.fullName}
                                                                    </h5>
                                                                    <div className={cx('tippy-info-count')}>
                                                                        <p>
                                                                            <span
                                                                                className={cx(
                                                                                    'tippy-info-count-follower',
                                                                                )}
                                                                            >
                                                                                {videoByAccount[index].account &&
                                                                                    videoByAccount[index].account
                                                                                        .followed}
                                                                            </span>
                                                                            Followers
                                                                        </p>
                                                                        <p>
                                                                            <span
                                                                                className={cx('tippy-info-count-like')}
                                                                            >
                                                                                {videoByAccount[index].account &&
                                                                                    videoByAccount[index].account.liked}
                                                                            </span>
                                                                            Likes
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className={cx('tippy-contact')}>
                                                                    <p className={cx('tippy-contact-show')}>
                                                                        {videoByAccount[index].account &&
                                                                            videoByAccount[index].account.contact}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </Border>
                                                    </div>
                                                )}
                                            >
                                                {videoByAccount[index].account && (
                                                    <img
                                                        className={cx('avatar')}
                                                        src={videoByAccount[index].account.avatar}
                                                        alt="No"
                                                    />
                                                )}
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
