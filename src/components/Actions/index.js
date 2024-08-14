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
            children: {
                title: 'Language',
                data: [
                    {
                        type: 'Language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'Language',
                        code: 'vi',
                        title: 'Vietnamese',
                    },
                    {
                        type: 'Language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'Language',
                        code: 'vi',
                        title: 'Vietnamese',
                    },
                    {
                        type: 'Language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'Language',
                        code: 'vi',
                        title: 'Vietnamese',
                    },
                    {
                        type: 'Language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'Language',
                        code: 'vi',
                        title: 'Vietnamese',
                    },
                    {
                        type: 'Language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'Language',
                        code: 'vi',
                        title: 'Vietnamese',
                    },
                    {
                        type: 'Language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'Language',
                        code: 'vi',
                        title: 'Vietnamese',
                    },
                    {
                        type: 'Language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'Language',
                        code: 'vi',
                        title: 'Vietnamese',
                    },
                    {
                        type: 'Language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'Language',
                        code: 'vi',
                        title: 'Vietnamese',
                    },
                ],
            },
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

    // handle item đc chọn từ menu
    const handleGetItemMenu = (itemClicked) => {
        console.log(itemClicked);
        switch (itemClicked.type) {
            case 'Language':
                // handle change language
                break;
            default:
        }
    };

    const renderMenuItems = (attrs) => (
        <div className="wrapper" tabIndex="-1" {...attrs}>
            <Border>
                <div className={cx('wrapper')}>
                    <Menu data={menuItems} onGetItem={handleGetItemMenu} />
                </div>
            </Border>
        </div>
    );

    return (
        <div className={cx('actions')}>
            <Button btnPrimary classNames={cx('button')} to="/login">
                Log in
            </Button>
            <Tippy interactive placement="bottom-end" render={renderMenuItems} offset={[16, 0]} delay={[0, 600]}>
                <FontAwesomeIcon className={cx('icon')} icon={faEllipsisVertical} />
            </Tippy>
        </div>
    );
}

export default Actions;
