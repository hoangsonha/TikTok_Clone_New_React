import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import styles from './Account.module.scss';
import { config } from '~/config';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    const navigate = useNavigate();

    const handleGoProfile = () => {
        navigate(config.routes.profile.replace(':nickname', `@${data && data.nickName}`), { state: { acc: data } });
    };

    return (
        <div>
            <div className={cx('account-item')} onClick={handleGoProfile}>
                <img className={cx('avatar')} src={data.avatar} alt="No" />
                <div className={cx('item-info')}>
                    <p className={cx('nickname')}>
                        <strong>{data.nickName}</strong>
                        <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                    </p>
                    <p className={cx('name')}>{data.fullName}</p>
                </div>
            </div>
        </div>
    );
}

export default AccountItem;
