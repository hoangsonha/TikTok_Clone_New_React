import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './Account';
import { useEffect, useState } from 'react';
import { apiAllUser } from '~/serviceApi/getAll';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const apiUser = async () => {
            const result = await apiAllUser();
            setUsers(result);
        };
        apiUser();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {users &&
                users.map((user) => {
                    return <AccountItem key={user.id} data={user} />;
                })}
            <p className={cx('more-btn')}>See more</p>
        </div>
    );
}

export default SuggestedAccounts;
