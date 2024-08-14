import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import { CommentIcon, LikeIcon, MenuVideoIcon, SaveIcon, ShareIcon, TickFollowIcon } from '~/components/Icon/icons';

const cx = classNames.bind(styles);

function Home({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('video')}>
                    <div className={cx('video-item')}></div>
                    <div className={cx('video-info')}>
                        <div className={cx('image')}>
                            <img
                                className={cx('avatar')}
                                src="https://firebasestorage.googleapis.com/v0/b/swp391-f046d.appspot.com/o/Tiktok_BE%2F85cfd2ba-4b1d-4558-8f16-0c5f20b7e698.png?alt=media"
                                alt="Name"
                            />
                            <div className={cx('tick-follow')}>
                                <TickFollowIcon />
                            </div>
                        </div>
                        <div className={cx('like')}>
                            <span className={cx('like-icons')}>
                                <LikeIcon className={cx('like-icon')} />
                            </span>

                            <span className={cx('like-count')}>472K</span>
                        </div>
                        <div className={cx('comment')}>
                            <span className={cx('comment-icons')}>
                                <CommentIcon className={cx('comment-icon')} />
                            </span>

                            <span className={cx('comment-count')}>1886</span>
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
                            <span className={cx('share-count')}>6539</span>
                        </div>
                        <div className={cx('menu')}>
                            <span className={cx('menu-icons')}>
                                <MenuVideoIcon className={cx('menu-icon')} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
