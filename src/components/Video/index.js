import classNames from 'classnames/bind';

import styles from './Video.module.scss';
import { IconShowViewVideo } from '../Icon/icons';

const cx = classNames.bind(styles);

function Video({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('video')}>
                <video className={cx('srcVideo')} src={data.srcVideo} />
                <div className={cx('icon')}>
                    <IconShowViewVideo />
                    <span className={cx('count')}>{data.liked}</span>
                </div>
            </div>
            <div className={cx('title')}>{data.title}</div>
        </div>
    );
}

export default Video;
