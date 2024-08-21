import classNames from 'classnames/bind';

import styles from './YesNo.module.scss';
import Button from '../Button';

const cx = classNames.bind(styles);

function YesNo({ title, message, yesTitle, noTitle, onClickCancel, onClickPost }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-title')}>{title}</div>
                <div className={cx('header-message')}>{message}</div>
            </div>
            <div className={cx('btn')}>
                <Button
                    btnNormal
                    classNames={cx('btn-cancel')}
                    classNameTitle={cx('btn-cancel-title')}
                    onClick={onClickCancel}
                >
                    {noTitle}
                </Button>
                <Button btnPrimary classNames={cx('btn-post')} onClick={onClickPost}>
                    {yesTitle}
                </Button>
            </div>
        </div>
    );
}

export default YesNo;
