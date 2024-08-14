import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import styles from './Login.module.scss';
import {
    AppleIconLogin,
    FacebookIconLogin,
    GoogleLoginIcon,
    KakaoTalkIconLogin,
    LineIconLogin,
    ProfileIconNavigation,
    QRIconLogin,
    TwitterIconLogin,
} from '~/components/Icon/icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Login() {
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [close, setClose] = useState(false);

    const navigate = useNavigate();

    const handleLogin = () => {};

    const loginMethod = [
        {
            icon: QRIconLogin,
            title: 'Use QR code',
        },
        {
            icon: ProfileIconNavigation,
            title: 'Use phone / email / username',
            children: [
                {
                    type: 'Phone',
                },
                {
                    type: 'Email',
                },
            ],
        },
        {
            icon: FacebookIconLogin,
            title: 'Continue with Facebook',
        },
        {
            icon: GoogleLoginIcon,
            title: 'Continue with Google',
        },
        {
            icon: TwitterIconLogin,
            title: 'Continue with Twitter',
        },
        {
            icon: LineIconLogin,
            title: 'Continue with Line',
        },
        {
            icon: KakaoTalkIconLogin,
            title: 'Continue with KakaoTalk',
        },
        {
            icon: AppleIconLogin,
            title: 'Continue with Apple',
        },
    ];

    const handleClose = () => {
        setClose(true);
        navigate('/');
    };

    return (
        <>
            {' '}
            {!close && (
                <div className={cx('wrapper')}>
                    <div className={cx('content')}>
                        <FontAwesomeIcon className={cx('close')} icon={faXmark} onClick={handleClose} />
                        <h1 className={cx('title')}>Log in to Tiktok</h1>
                        <div className={cx('login')}>
                            {loginMethod.map((log, index) => {
                                var IconLogin = log.icon;
                                return (
                                    <div className={cx('login-method')} key={index}>
                                        <span>{<IconLogin className={cx('login-method-icon')} />}</span>
                                        <p className={cx('login-method-title')}>{log.title}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={cx('terms')}>
                            <p className={cx('term-policy')}>
                                By continuing with an account located in{' '}
                                <Link className={cx('term-policy-location')} href="#">
                                    Vietnam
                                </Link>
                                , you agree to our{' '}
                                <Link className={cx('term-policy-service')} href="#">
                                    Terms of Service
                                </Link>{' '}
                                and acknowledge that you have read our{' '}
                                <Link className={cx('term-policy-policy')} href="#">
                                    Privacy Policy
                                </Link>
                            </p>
                        </div>
                        <div className={cx('register')}>
                            <p>
                                Don't have an account?{' '}
                                <Link to="/register" className={cx('register-btn')}>
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Login;
