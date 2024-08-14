import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';

import styles from './Home.module.scss';
import { CommentIcon, LikeIcon, MenuVideoIcon, SaveIcon, ShareIcon, TickFollowIcon } from '~/components/Icon/icons';
import { get } from '~/utils/request';
import Border from '~/components/Border';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function Home() {
    const [videos, setVideos] = useState([]);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const apiVideo = async () => {
            const responseVideo = await get('/video/getAll');
            setVideos(responseVideo.data);
        };

        apiVideo();
    }, []);

    useEffect(() => {
        get('/getAll')
            .then((res) => setUsers(res.data))
            .catch((error) => {});
    }, []);

    return (
        <div className={cx('wrapper')}>
            {videos.map((video, index) => {
                var acc = users.find((user) => {
                    return user.id === video.idAccount;
                });

                return (
                    <div className={cx('content')} key={index}>
                        <div className={cx('video')}>
                            <div className={cx('video-items')}>
                                <video className={cx('video-item')} src={video.srcVideo} controls />
                            </div>
                            <div className={cx('video-info')}>
                                <div className={cx('image')}>
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
                                                            <img
                                                                className={cx('tippy-avatar-detail')}
                                                                src={acc.avatar}
                                                                alt="No"
                                                            />
                                                            <Button btnOutline classNames={cx('btnFollow')}>
                                                                Follow
                                                            </Button>
                                                        </div>
                                                        <div className={cx('tippy-info')}>
                                                            <h4 className={cx('tippy-info-nickname')}>
                                                                {acc.nickName}
                                                            </h4>
                                                            <h5 className={cx('tippy-info-fullname')}>
                                                                {acc.fullName}
                                                            </h5>
                                                            <div className={cx('tippy-info-count')}>
                                                                <p>
                                                                    <span className={cx('tippy-info-count-follower')}>
                                                                        {acc.followed}
                                                                    </span>
                                                                    Followers
                                                                </p>
                                                                <p>
                                                                    <span className={cx('tippy-info-count-like')}>
                                                                        {acc.liked}
                                                                    </span>
                                                                    Likes
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className={cx('tippy-contact')}>
                                                            <p className={cx('tippy-contact-show')}>{acc.contact}</p>
                                                        </div>
                                                    </div>
                                                </Border>
                                            </div>
                                        )}
                                    >
                                        <img className={cx('avatar')} src={acc.avatar} alt="No" />
                                    </Tippy>
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
