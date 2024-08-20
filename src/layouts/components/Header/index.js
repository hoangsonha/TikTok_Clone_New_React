import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import styles from './Header.module.scss';
import { images } from '~/assets';
import Search from '~/layouts/components/Search';
import Action from '~/layouts/components/Action';
import ActionAuth from '~/layouts/components/ActionAuth';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Header() {
    const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);

    const nagative = useNavigate();

    const handleBackHome = () => {
        nagative('/');
    };

    return (
        <div className={cx('wrapper')}>
            <img className={cx('logo')} src={images.logo} alt="TikTok" onClick={handleBackHome} />
            <Search />
            {isAuthenticated ? <ActionAuth /> : <Action />}
        </div>
    );
}

export default Header;
