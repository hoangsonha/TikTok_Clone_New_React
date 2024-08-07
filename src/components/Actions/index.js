import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import styles from './Actions.module.scss';
import Button from '../Button/Button';
import { IconLanguage, IconCreateorTools, IconFeedbackHelp, IconTheme } from '~/components/Icon/icons';
import Menu from './Menu';
import Border from '../Border';

const cx = classNames.bind(styles);

function Actions() {
    const menuItems = [
        {
            icon: <IconCreateorTools />,
            title: 'Creator tools',
        },
        {
            icon: <IconLanguage />,
            title: 'English',
        },

        {
            icon: <IconFeedbackHelp />,
            title: 'Feedback and help',
        },
        {
            icon: <IconTheme />,
            title: 'Dark mode',
        },
    ];

    const renderMenuItems = (attrs) => (
        <div className="wrapper" tabIndex="-1" {...attrs}>
            <Border>
                <div className={cx('wrapper')}>
                    {menuItems.map((menuItem, index) => {
                        return <Menu key={index} data={menuItem} />;
                    })}
                </div>
            </Border>
        </div>
    );

    return (
        <div className={cx('actions')}>
            <Button btnPrimary>Log in</Button>
            <Tippy interactive placement="bottom-end" render={renderMenuItems} offset={[16, 0]}>
                <FontAwesomeIcon className={cx('icon')} icon={faEllipsisVertical} />
            </Tippy>
        </div>
    );
}

export default Actions;
