import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import styles from './Actions.module.scss';
import Button from '../Button/Button';

const cx = classNames.bind(styles);

function Actions() {
    return (
        <div className={cx('actions')}>
            <Button btnPrimary>Log in</Button>
            <FontAwesomeIcon className={cx('icon')} icon={faEllipsisVertical} />
        </div>
    );
}

export default Actions;
