import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './Menu.module.scss';
import TitleMenu from '~/components/TitleMenu';

const cx = classNames.bind(styles);

const emptyFunction = () => {};

function Menu({ data, onGetItem = emptyFunction }) {
    const [subMenuItem, setSubMenuItem] = useState([{ data: data }]);

    const currentMenuItem = subMenuItem[subMenuItem.length - 1];

    return (
        <div>
            {subMenuItem.length > 1 && (
                <TitleMenu
                    title="Language"
                    onBack={() => {
                        setSubMenuItem((prev) => prev.slice(0, prev.length - 1));
                    }}
                />
            )}
            {currentMenuItem.data.map((curItem, index) => {
                const isParent = !!curItem.children;

                let Icon = curItem.icon;

                return (
                    <div
                        className={cx('wrapper', { separate: curItem.separate })}
                        key={index}
                        onClick={() => {
                            if (isParent) {
                                setSubMenuItem((prev) => [...prev, curItem.children]);
                            } else {
                                onGetItem(curItem);
                            }
                        }}
                    >
                        {curItem.icon && <Icon className={cx('icon')} />}
                        <h4 className={cx('title')}>{curItem.title}</h4>
                    </div>
                );
            })}
        </div>
    );
}

export default Menu;

// để lấy ra trang nhất luôn là phần tử cuối mảng

// currentMenuItem là phần tử cuỗi cùng trong mảng để in ra

// kiểm tra xem cái nào là cha, nếu có children thì là object và k có thì underfine,
// đc convert thành boolean

// khi đã tìm ra thằng con phải push vào mảng và bảo toàn các phần tử cũ thì ms quay lại đc

// có từ 2 cái item trong mảng thì mới hiện cái title là Language

// nếu k có truyền props thì sẽ undefined và bị lỗi, nên gán bằng 1 function trống
