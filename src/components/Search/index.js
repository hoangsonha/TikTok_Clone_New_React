import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';

import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    return (
        <div className={cx('search')}>
            <input type="text" placeholder="Search" spellCheck={false} />
            <button className={cx('clear')}>
                <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
            <FontAwesomeIcon className={cx('btn')} icon={faMagnifyingGlass} />
        </div>
    );
}

export default Search;
