import classNames from 'classnames/bind';

import styles from './TitleMenu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function TitleMenu({ title, onBack, classWrapper, classBtn, classTitle }) {
    const classWrappers = cx('wrapper', classWrapper);
    const classBtns = cx('back-btn', classBtn);
    const classTitles = cx('title', classTitle);

    return (
        <div className={classWrappers}>
            <button className={classBtns} onClick={onBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <h4 className={classTitles}>{title}</h4>
        </div>
    );
}

export default TitleMenu;

// onBack là quay trở lại khi bấm vô languages

// dùng mảng, tức là khi bấm vào menu 1 cấp nó hiện ra cấp 2, cấp 3, ...,
// thì luôn hiện ra cấp cuối cùng, mỗi khi back lại thì trừ 1 cấp
