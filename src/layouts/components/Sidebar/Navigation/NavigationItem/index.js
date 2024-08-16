import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

import styles from './NavigationItem.module.scss';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function NavigationItem({ title, icon, activeIcon, to, avatar }) {
    const user = useSelector((state) => state.authReducer.user);

    return (
        <NavLink to={to} className={(act) => cx('wrapper', { active: act.isActive })}>
            {avatar ? (
                <img className={cx('avatar')} src={user.avatar} alt="No"></img>
            ) : (
                <>
                    <span className={cx('icon')}>{icon}</span>
                    <span className={cx('active-icon')}>{activeIcon}</span>
                </>
            )}

            <p className={cx('title')}>{title}</p>
        </NavLink>
    );
}

export default NavigationItem;

// navlink là nó so sánh cái path ở url với cái to truyền vào, nếu giống nhau sẽ tự thêm class là active vào
// navlink nó sẽ nhận className là 1 hàm or chuỗi, nếu hàm thì nó sẽ lấy cái return (className={() => cx("")})
// sau đó css cái class active trong wrapper
