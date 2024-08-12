import classNames from 'classnames/bind';

import styles from './Navigation.module.scss';

const cx = classNames.bind(styles);

function Navigation({ children }) {
    return <nav className={cx('wrapper')}>{children}</nav>;
}

export default Navigation;
