import classNames from 'classnames/bind';

import styles from './EditAccount.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { IconEditAvatar } from '~/components/Icon/icons';
import Button from '~/components/Button';
import { actionUpdate } from '~/redux/actions/actionLogin';
import { updateAccountLogin } from '~/serviceApi/updateApi';

const cx = classNames.bind(styles);

const emptyFunction = () => {};

function EditAccount({ onShowEditForm = emptyFunction }) {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.authReducer.user);

    const [nickName, setNickName] = useState(user.nickName);

    const [fullName, setFullName] = useState(user.fullName);

    const [contact, setContact] = useState(user.contact);

    const [avatar, setAvatar] = useState(user.avatar);

    const [previewAvatar, setPreviewAvatar] = useState();

    const [countChar, setCountChar] = useState(user.contact.length);

    const [errorCountChar, setErrorCountChar] = useState(false);

    const [showFrom, setShowForm] = useState(false);

    const handleNickName = (e) => {
        setNickName(e.target.value);
    };

    const handleFullName = (e) => {
        setFullName(e.target.value);
    };

    const handleContact = (e) => {
        setContact(e.target.value);
        setCountChar(e.target.value.length);
        if (e.target.value.length > 80) setErrorCountChar(true);
        else setErrorCountChar(false);
    };

    const handleAvatar = (e) => {
        const file = e.target.files[0];
        setPreviewAvatar(URL.createObjectURL(file));

        setAvatar(file);
    };

    const handleClose = () => {
        setShowForm(true);
        onShowEditForm(showFrom);
    };

    const handleChangeAvatar = () => {
        document.getElementById('fileInput').click();
    };

    const handleApiEditAccount = () => {
        const formData = new FormData();
        formData.append('id', user.id);
        formData.append('fullName', fullName);
        formData.append('nickName', nickName);
        formData.append('contact', contact);
        formData.append('password', null);
        formData.append('newPassword', null);
        formData.append('avatar', avatar);

        const apiEdit = async () => {
            const response = await updateAccountLogin(formData);

            if (response.code === 'Success') {
                dispatch(actionUpdate(response.data));
            }
        };
        apiEdit();
    };

    return (
        <>
            {!showFrom && (
                <div className={cx('test')}>
                    <div className={cx('test5')}>
                        <div className={cx('wrapper')}>
                            <div className={cx('header')}>
                                <h3 className={cx('header-title')}>Edit profile</h3>
                                <FontAwesomeIcon className={cx('close')} icon={faXmark} onClick={handleClose} />
                            </div>
                            <div className={cx('body')}>
                                <div className={cx('body-avatar')}>
                                    <span className={cx('body-avatar-title')}>Profile photo</span>
                                    <div className={cx('body-avatar-title-edit')}>
                                        <img
                                            className={cx('body-avatar-avatar')}
                                            src={previewAvatar ? previewAvatar : avatar}
                                        />
                                        <span onClick={handleChangeAvatar}>
                                            <IconEditAvatar className={cx('body-avatar-icon-edit')} />
                                        </span>
                                        <input
                                            id="fileInput"
                                            type="file"
                                            style={{ display: 'none' }}
                                            accept="image/*"
                                            onChange={handleAvatar}
                                        />
                                    </div>
                                </div>
                                <div className={cx('body-nick-name')}>
                                    <span className={cx('body-nick-name-title')}>Username</span>
                                    <input
                                        className={cx('body-nick-name-input')}
                                        value={nickName}
                                        spellCheck={false}
                                        placeholder="Nick name"
                                        onChange={handleNickName}
                                    />
                                    <span className={cx('body-nick-name-policy-1')}>
                                        www.tiktok.com/@user9u6x48oot1
                                    </span>
                                    <span className={cx('body-nick-name-policy-2')}>
                                        Usernames can only contain letters, numbers, underscores, and periods. Changing
                                        your username will also change your profile link.
                                    </span>
                                </div>
                                <div className={cx('body-full-name')}>
                                    <span className={cx('body-full-name-title')}>Name</span>
                                    <input
                                        className={cx('body-full-name-input')}
                                        value={fullName}
                                        spellCheck={false}
                                        placeholder="Full name"
                                        onChange={handleFullName}
                                    />
                                    <span className={cx('body-full-name-policy')}>
                                        Your nickname can only be changed once every 7 days.
                                    </span>
                                </div>
                                <div className={cx('body-contact')}>
                                    <span className={cx('body-contact-title')}>Bio</span>
                                    <textarea
                                        className={cx('body-contact-input')}
                                        value={contact}
                                        spellCheck={false}
                                        placeholder="Bio"
                                        onChange={handleContact}
                                    />
                                    <span className={cx('body-contact-policy')}>
                                        <span className={cx({ 'body-contact-policy-count': errorCountChar })}>
                                            {countChar}
                                        </span>
                                        /80
                                    </span>
                                </div>
                            </div>
                            <div className={cx('btn')}>
                                <Button
                                    btnOutline
                                    onClick={handleClose}
                                    classNames={cx('btn-cancel')}
                                    classNameTitle={cx('btn-cancel-title')}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    disabled={errorCountChar}
                                    btnPrimary
                                    classNames={cx('btn-save')}
                                    classNameTitle={cx('btn-save-title')}
                                    onClick={handleApiEditAccount}
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default EditAccount;
