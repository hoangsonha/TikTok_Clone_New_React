import classNames from 'classnames/bind';

import styles from './Border.module.scss';

const cx = classNames.bind(styles);

function Border({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default Border;
