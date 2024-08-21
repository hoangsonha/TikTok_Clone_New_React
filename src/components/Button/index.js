import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    btnPrimary,
    btnOutline,
    btnRounded,
    btnNormal,
    disabled,
    children,
    onClick,
    classNames,
    classNameTitle,
    ...otherProps
}) {
    let Comp = 'button';

    const props = {
        onClick,
        ...otherProps,
    };

    if (disabled) {
        Object.keys(props).forEach((prop) => {
            if (prop.startsWith('on') && typeof props[prop] === 'function') {
                delete props[prop];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const className = cx('wrapper', classNames, {
        btnPrimary,
        btnOutline,
        btnRounded,
        btnNormal,
        disabled,
    });

    return (
        <Comp className={className} {...props}>
            <span className={cx('title', classNameTitle)}>{children}</span>
        </Comp>
    );
}

export default Button;
