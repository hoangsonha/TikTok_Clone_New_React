import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import styles from './Search.module.scss';
import Border from '../Border';
import Account from '../Account';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Search() {
    const [hideTippy, setHideTippy] = useState(true);

    const [textSearch, setTextSearch] = useState('');

    const [hideLoading, setHideLoading] = useState(false);

    const [hideClear, setHideClear] = useState(false);

    const accounts = [
        {
            fullName: 'HoangSonHa',
            avatar: 'https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/29e55b45480b1d7fa3e24883ba0cfd6e.jpeg?lk3s=a5d48078&nonce=92050&refresh_token=74c57b53809bcd120a6a8c6399ee7584&x-expires=1723208400&x-signature=67YZJPbBMfOo7he%2BZOSXRB1B55w%3D&shp=a5d48078&shcp=b59d6b55',
            nickName: 'hoangsonha',
        },
        {
            fullName: 'VuNgocQuynh',
            avatar: 'https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/29e55b45480b1d7fa3e24883ba0cfd6e.jpeg?lk3s=a5d48078&nonce=92050&refresh_token=74c57b53809bcd120a6a8c6399ee7584&x-expires=1723208400&x-signature=67YZJPbBMfOo7he%2BZOSXRB1B55w%3D&shp=a5d48078&shcp=b59d6b55',
            nickName: 'vungocquynh',
        },
        {
            fullName: 'NguyenThiKimNgan',
            avatar: 'https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/29e55b45480b1d7fa3e24883ba0cfd6e.jpeg?lk3s=a5d48078&nonce=92050&refresh_token=74c57b53809bcd120a6a8c6399ee7584&x-expires=1723208400&x-signature=67YZJPbBMfOo7he%2BZOSXRB1B55w%3D&shp=a5d48078&shcp=b59d6b55',
            nickName: 'nguyenthikimngan',
        },
    ];

    const renderBySearch = (attrs) => (
        <div tabIndex="-1" {...attrs}>
            <Border>
                <div className={cx('wrapper')}>
                    <h4 className={cx('header')}>Accounts</h4>

                    {accounts.map((account, index) => {
                        return <Account key={index} data={account} />;
                    })}
                </div>
            </Border>
        </div>
    );

    const handleOnClickOutside = () => {
        setHideTippy(false);
    };

    const handleTextSearch = (e) => {
        setTextSearch(e.target.value);
        setHideClear(true);
    };

    const handleClearTextSearch = () => {
        setTextSearch('');
        setHideLoading(false);
    };

    return (
        <div>
            <Tippy
                interactive
                placement="bottom"
                visible={hideTippy}
                render={renderBySearch}
                onClickOutside={handleOnClickOutside}
            >
                <div className={cx('search')}>
                    <input
                        type="text"
                        value={textSearch}
                        onChange={handleTextSearch}
                        placeholder="Search"
                        spellCheck={false}
                        onFocus={() => setHideTippy(true)}
                    />
                    {hideClear && (
                        <button className={cx('clear')} onClick={handleClearTextSearch}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {hideLoading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    <FontAwesomeIcon className={cx('btn')} icon={faMagnifyingGlass} />
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
