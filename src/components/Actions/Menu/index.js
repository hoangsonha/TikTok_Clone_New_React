import classNames from 'classnames/bind';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Menu({ data }) {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('icon')}>{data.icon}</span>
            <h4 className={cx('title')}>{data.title}</h4>
        </div>
    );
}

export default Menu;
