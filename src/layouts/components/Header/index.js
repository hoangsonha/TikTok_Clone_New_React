import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import { images } from '~/assets';
import Search from '~/components/Search';
import Actions from '~/components/Actions';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img src={images.logo} alt="TikTok" />
            </div>
            <div className={cx('content')}>
                <Search />
                <Actions />
            </div>
        </div>
    );
}

export default Header;
