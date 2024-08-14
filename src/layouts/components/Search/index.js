import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import styles from './Search.module.scss';
import Border from '~/components/Border';
import Account from '~/components/Account';
import { useEffect, useState } from 'react';
import { get } from '~/utils/request';
import { useDebounce } from '~/hook';
import axios from 'axios';

const cx = classNames.bind(styles);

function Search() {
    const [hideTippy, setHideTippy] = useState(false);

    const [textSearch, setTextSearch] = useState('');

    const [hideLoading, setHideLoading] = useState(false);

    const [result, setResult] = useState([]);

    const debounce = useDebounce(textSearch, 500);

    useEffect(() => {
        if (!debounce.trim()) {
            setResult([]);
            return;
        }

        setHideLoading(true);

        // get('/users/search', {
        //     params: {
        //         q: textSearch,
        //         type: 'less',
        //     },
        // })
        //     .then((response) => {
        //         setResult(response.data);
        //     })
        //     .catch(() => {});

        const requestAPI = async () => {
            try {
                const res = await get('/search', {
                    params: {
                        fullName: debounce,
                        nickName: debounce,
                    },
                });
                setHideLoading(false);
                setResult(res.data);
            } catch (error) {
                console.log('error ne', error);
            }
        };
        requestAPI();
    }, [debounce]);

    const renderBySearch = (attrs) => (
        <div tabIndex="-1" {...attrs}>
            <Border>
                {debounce && result && (
                    <div className={cx('wrapper')}>
                        <h4 className={cx('header')}>Accounts</h4>

                        {result.map((account, index) => {
                            return <Account key={index} data={account} />;
                        })}
                    </div>
                )}
            </Border>
        </div>
    );

    const handleOnClickOutside = () => {
        setHideTippy(false);
    };

    const handleTextSearch = (e) => {
        setTextSearch(e.target.value);
    };

    const handleClearTextSearch = () => {
        setTextSearch('');
        setHideLoading(false);
        setResult([]);
    };

    return (
        <div>
            <Tippy
                interactive
                placement="bottom"
                visible={result && textSearch && hideTippy}
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
                    {!hideLoading && textSearch && (
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
