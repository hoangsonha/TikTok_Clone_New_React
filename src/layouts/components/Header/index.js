import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import { images } from '~/assets';
import Search from '~/components/Search';
import Actions from '~/components/Actions';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('logo')} src={images.logo} alt="TikTok" />
            <Search />
            <Actions />
        </div>
    );
}

export default Header;
