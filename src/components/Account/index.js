import classNames from 'classnames/bind';

import styles from './Account.module.scss';

const cx = classNames.bind(styles);

function Account({ data }) {
    return (
        <div className={cx('wrapper')}>
            {data.avatar && <img className={cx('avatar')} src={data.avatar} alt={data.fullName} />}
            <div className={cx('body')}>
                <h5 className={cx('nickname')}>{data.nickname}</h5>
                <h5 className={cx('fullname')}>{data.full_name}</h5>
            </div>
        </div>
    );
}

export default Account;
