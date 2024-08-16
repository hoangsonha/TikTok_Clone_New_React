import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import { useSelector } from 'react-redux';
import Button from '~/components/Button';
import { IconEditProfile } from '~/components/Icon/icons';

const cx = classNames.bind(styles);

function Profile() {
    const user = useSelector((state) => state.authReducer.user);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('info')}>
                    <img className={cx('avatar')} src={user.avatar} alt="No" />
                    <div className={cx('info-detail')}>
                        <h1 className={cx('nick-name')}>{user.nickName}</h1>
                        <div className={cx('full-name')}>{user.fullName}</div>
                        <Button btnOutline classNames={cx('btn-edit')} classNameTitle={cx('header-title-edit')}>
                            <IconEditProfile className={cx('edit-icon')} />
                            Edit profile
                        </Button>
                    </div>
                </div>
                <div>
                    <span>
                        <span>12</span>Following
                    </span>
                    <span>
                        <span>{user.followed}</span>Followers
                    </span>
                    <span>
                        <span>{user.liked}</span>Likes
                    </span>
                </div>
                <div>{user.contact}</div>
            </div>
        </div>
    );
}

export default Profile;
