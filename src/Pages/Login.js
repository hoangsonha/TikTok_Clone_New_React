import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './Login.module.scss';
import {
    AppleIconLogin,
    FacebookIconLogin,
    GoogleLoginIcon,
    HidePasswordIcon,
    KakaoTalkIconLogin,
    LineIconLogin,
    ProfileIconNavigation,
    QRIconLogin,
    ShowPasswordIcon,
    TwitterIconLogin,
} from '~/components/Icon/icons';
import TitleMenu from '~/components/Actions/TitleMenu';
import Button from '~/components/Button/Button';
import { post } from '~/utils/request';

const cx = classNames.bind(styles);

function Login() {
    const loginMethod = [
        {
            icon: QRIconLogin,
            title: 'Use QR code',
        },
        {
            icon: ProfileIconNavigation,
            title: 'Use phone / email / username',
            children: {
                data: [
                    {
                        type: 'Email',
                        title: 'Login with Email',
                    },
                ],
            },
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

    const navigate = useNavigate();

    const [displayNone, setDisplayNone] = useState(false);

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [close, setClose] = useState(false);

    const [loginMethods, setLoginMethods] = useState([{ data: loginMethod }]);

    const [showPass, setShowPass] = useState('password');

    const [showError, setShowError] = useState('');

    const currentLoginMethod = loginMethods[loginMethods.length - 1]; // phan tu so 0 la nguyen cai loginMethod

    // khi đăng nhập r thì k thể vào trang login nữa

    useEffect(() => {
        const userLogin = JSON.parse(localStorage.getItem('userLogin'));
        if (userLogin) {
            navigate('/');
        }
    }, []);

    const handleLogin = () => {
        const loginRequest = {
            email,
            password,
        };
        try {
            const loginAPI = async () => {
                const response = await post('/login', loginRequest);

                if (response.code && response.code === 'Success') {
                    setShowError(response.message);
                    localStorage.setItem('userLogin', JSON.stringify(response.data));
                    navigate('/');
                } else if (response.code && response.code === 'Failed') {
                    setShowError(response.message);
                }
            };

            loginAPI();
        } catch (error) {
            console.log('error ne : ', error.message);
        }
    };

    const handleClose = () => {
        setClose(true);
        navigate('/');
    };

    const handleOnBack = () => {
        setDisplayNone(false);
        setLoginMethods((prev) => prev.slice(0, prev.length - 1));
    };

    const handleShowPassword = () => {
        setShowPass('text');
    };

    const handleHidePassword = () => {
        setShowPass('password');
    };

    const handleInputEmail = (e) => {
        const value = e.target.value;

        if (value.startsWith(' ')) {
            return;
        } else {
            setEmail(e.target.value);
        }
    };

    const handleInputPasword = (e) => {
        const value = e.target.value;

        if (value.startsWith(' ')) {
            return;
        } else {
            setPassword(e.target.value);
        }
    };

    return (
        <>
            {!close && (
                <div className={cx('wrapper')}>
                    <div className={cx('content')}>
                        <FontAwesomeIcon className={cx('close')} icon={faXmark} onClick={handleClose} />
                        {loginMethods.length > 1 ? (
                            <TitleMenu
                                title="Log in"
                                onBack={handleOnBack}
                                classTitle={cx('header')}
                                classBtn={cx('btn-back')}
                            />
                        ) : (
                            <h1 className={cx('title')}>Log in to Tiktok</h1>
                        )}
                        {showError && <h1>{showError}</h1>}
                        <div className={cx('login', { displayNone: displayNone })}>
                            {currentLoginMethod.data.map((log, index) => {
                                var IconLogin = null;

                                if (log.icon) IconLogin = log.icon;

                                const isParent = !!log.children;

                                return (
                                    <>
                                        {loginMethods.length > 1 ? (
                                            <div className={cx('form-login')}>
                                                <div className={cx('form-login-title')}>{log.title}</div>
                                                <input
                                                    className={cx('email-input')}
                                                    type="email"
                                                    value={email}
                                                    onChange={handleInputEmail}
                                                    placeholder="Email"
                                                    spellCheck={false}
                                                />
                                                <input
                                                    className={cx('password-input')}
                                                    type={showPass}
                                                    value={password}
                                                    onChange={handleInputPasword}
                                                    placeholder="Password"
                                                    spellCheck={false}
                                                />
                                                {showPass === 'password' && (
                                                    <div onClick={handleShowPassword}>
                                                        <ShowPasswordIcon className={cx('show-password')} />
                                                    </div>
                                                )}
                                                {showPass === 'text' && (
                                                    <div onClick={handleHidePassword}>
                                                        <HidePasswordIcon className={cx('hide-password')} />
                                                    </div>
                                                )}
                                                <Link className={cx('forgot-password')} to="/forgotPass">
                                                    Forgot password?
                                                </Link>
                                                <div>
                                                    <Button
                                                        disabled={!email || !password}
                                                        btnPrimary
                                                        classNames={cx('btn-login')}
                                                        onClick={handleLogin}
                                                    >
                                                        Log in
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                className={cx('login-method')}
                                                key={index}
                                                onClick={() => {
                                                    if (isParent) {
                                                        setDisplayNone(true);
                                                        setLoginMethods((prev) => [...prev, log.children]);
                                                    }
                                                }}
                                            >
                                                <>
                                                    <span>
                                                        {log.icon && <IconLogin className={cx('login-method-icon')} />}{' '}
                                                    </span>
                                                    <p className={cx('login-method-title')}>{log.title}</p>
                                                </>
                                            </div>
                                        )}
                                    </>
                                );
                            })}
                        </div>

                        {loginMethods.length > 1 ? (
                            <div></div>
                        ) : (
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
                        )}

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

// const Test = (props) => {
//      const { show, otherProps1, otherProp2, ...} = props
//}
