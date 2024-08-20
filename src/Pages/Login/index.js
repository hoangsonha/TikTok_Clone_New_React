import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
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
import TitleMenu from '~/components/TitleMenu';
import Button from '~/components/Button';
import { useDispatch } from 'react-redux';
import { actionLogin } from '~/redux/actions/actionLogin';
import { LoginAPI } from '~/serviceApi/loginApi';
import { RegisterAPI } from '~/serviceApi/createApi';

const cx = classNames.bind(styles);

function Login() {
    const registerMethod = [
        {
            icon: ProfileIconNavigation,
            title: 'Use phone or email',
            children: {
                data: [
                    {
                        type: 'Email',
                        title: 'Sign up with Email',
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
            icon: LineIconLogin,
            title: 'Continue with Line',
        },
        {
            icon: KakaoTalkIconLogin,
            title: 'Continue with KakaoTalk',
        },
    ];

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
                        title: 'Log in with Email',
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

    const [registerMethods, setRegisterMethods] = useState([{ data: registerMethod }]);

    const [showPass, setShowPass] = useState('password');

    const [changeForm, setChangeForm] = useState(false); // false la login, true la register

    const currentLoginMethod = loginMethods[loginMethods.length - 1]; // phan tu so 0 la nguyen cai loginMethod

    const currentRegisterMethod = registerMethods[registerMethods.length - 1];

    // khi đăng nhập r thì k thể vào trang login nữa

    // useEffect(() => {
    //     const userLogin = JSON.parse(localStorage.getItem('userLogin'));
    //     if (userLogin) {
    //         navigate('/');
    //     }
    // }, []);

    const dispatch = useDispatch();

    const handleLogin = () => {
        const loginRequest = {
            email,
            password,
        };
        try {
            const loginAPI = async () => {
                const response = await LoginAPI(loginRequest);

                if (response && response.code === 'Success') {
                    // show error
                    dispatch(actionLogin(response.data));
                    navigate('/');
                } else if (response && response.code === 'Failed') {
                    // show error
                }
            };

            loginAPI();
        } catch (error) {
            console.log('error ne : ', error.message);
        }
    };

    const handleRegister = () => {
        const registerRequest = {
            email,
            password,
        };

        const registerAPI = async () => {
            const response = await RegisterAPI(registerRequest);

            if (response.code && response.code === 'Success') {
                // show Error
                setDisplayNone(false); // tra form-login về như cũ
                setChangeForm(false); // dang ki thanh cong chuyen ve login
                navigate('/login');
            } else if (response.code && response.code === 'Failed') {
                // show Error
            }
        };
        registerAPI();
    };

    const handleClose = () => {
        setClose(true);
        navigate('/');
    };

    const handleOnBack = () => {
        setDisplayNone(false);
        if (!changeForm) setLoginMethods((prev) => prev.slice(0, prev.length - 1));
        else setRegisterMethods((prev) => prev.slice(0, prev.length - 1));
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
                        {!changeForm ? (
                            <>
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
                            </>
                        ) : (
                            <>
                                {registerMethods.length > 1 ? (
                                    <TitleMenu
                                        title="Sign up"
                                        onBack={handleOnBack}
                                        classTitle={cx('header')}
                                        classBtn={cx('btn-back')}
                                    />
                                ) : (
                                    <h1 className={cx('title')}>Sign up to Tiktok</h1>
                                )}
                            </>
                        )}
                        <div className={cx('login', { displayNone: displayNone })}>
                            {!changeForm ? (
                                <>
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
                                                                {log.icon && (
                                                                    <IconLogin className={cx('login-method-icon')} />
                                                                )}{' '}
                                                            </span>
                                                            <p className={cx('login-method-title')}>{log.title}</p>
                                                        </>
                                                    </div>
                                                )}
                                            </>
                                        );
                                    })}
                                </>
                            ) : (
                                <>
                                    {currentRegisterMethod.data.map((reg, index) => {
                                        var IconRegister = null;

                                        if (reg.icon) IconRegister = reg.icon;

                                        const isParent = !!reg.children;

                                        return (
                                            <>
                                                {registerMethods.length > 1 ? (
                                                    <div className={cx('form-login')}>
                                                        <div className={cx('form-login-title')}>{reg.title}</div>
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
                                                        <div>
                                                            <Button
                                                                disabled={!email || !password}
                                                                btnPrimary
                                                                classNames={cx('btn-login')}
                                                                onClick={handleRegister}
                                                            >
                                                                Sign up
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
                                                                setRegisterMethods((prev) => [...prev, reg.children]);
                                                            }
                                                        }}
                                                    >
                                                        <>
                                                            <span>
                                                                {reg.icon && (
                                                                    <IconRegister className={cx('login-method-icon')} />
                                                                )}{' '}
                                                            </span>
                                                            <p className={cx('login-method-title')}>{reg.title}</p>
                                                        </>
                                                    </div>
                                                )}
                                            </>
                                        );
                                    })}
                                </>
                            )}
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
                            {!changeForm ? (
                                <>
                                    <p>
                                        Don't have an account?{' '}
                                        <span className={cx('register-btn')} onClick={() => setChangeForm(true)}>
                                            Sign up
                                        </span>
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p>
                                        Already have account?{' '}
                                        <span className={cx('register-btn')} onClick={() => setChangeForm(false)}>
                                            Sign in
                                        </span>
                                    </p>
                                </>
                            )}
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
