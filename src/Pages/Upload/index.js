import classNames from 'classnames/bind';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';

import styles from './Upload.module.scss';
import Button from '~/components/Button';
import { IconUploadVideo, TickPrivateWhoWatchVideo } from '~/components/Icon/icons';
import Border from '~/components/Border';
import { PostVideo } from '~/serviceApi/createApi';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Upload() {
    const privateWatch = [
        {
            title: 'Only you',
        },
        {
            title: 'Friends',
            message: 'Followers you follow back',
        },
        {
            title: 'Followers',
        },
    ];

    const policy = [
        {
            icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNSAyNCIgZmlsbD0ibm9uZSIKICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTggOS42MDQ4OUwyMi41OTE1IDYuNDYzNDVDMjMuMTg4OSA2LjA1NDc2IDIzLjk5OTggNi40ODI0OCAyMy45OTk4IDcuMjA2MjNWMTYuNzkzNkMyMy45OTk4IDE3LjUxNzQgMjMuMTg4OSAxNy45NDUxIDIyLjU5MTUgMTcuNTM2NEwxOC4wMDAyIDE0LjM5NUwxOC4wMDAxIDEyLjAwMDNMMjEuOTk5NSAxNC43MDg1VjkuMjkxOTlMMTguMDAwMSAxMi4wMDAzTDE4IDkuNjA0ODlaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjMyIi8+CiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xIDYuNUMxIDQuODQzMTUgMi4zNDMxNSAzLjUgNCAzLjVIMTVDMTYuNjU2OSAzLjUgMTggNC44NDMxNSAxOCA2LjVWMTcuNUMxOCAxOS4xNTY5IDE2LjY1NjkgMjAuNSAxNSAyMC41SDRDMi4zNDMxNSAyMC41IDEgMTkuMTU2OSAxIDE3LjVWNi41Wk00IDUuNUgxNUMxNS41NTIzIDUuNSAxNiA1Ljk0NzcyIDE2IDYuNVYxNy41QzE2IDE4LjA1MjMgMTUuNTUyMyAxOC41IDE1IDE4LjVINEMzLjQ0NzcyIDE4LjUgMyAxOC4wNTIzIDMgMTcuNVY2LjVDMyA1Ljk0NzcyIDMuNDQ3NzIgNS41IDQgNS41WiIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC4zMiIvPgo8L3N2Zz4K',
            title: 'Size and duration',
            mwssage: 'Maximum size: 10 GB, video duration: 60 minutes.',
        },
        {
            icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNSAyNCIgZmlsbD0ibm9uZSIKICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Ik02IDRDNS43MjM4NiA0IDUuNSA0LjIyMzg2IDUuNSA0LjVWMTkuNUM1LjUgMTkuNzc2MSA1LjcyMzg2IDIwIDYgMjBIMTlDMTkuMjc2MSAyMCAxOS41IDE5Ljc3NjEgMTkuNSAxOS41VjEwSDE0QzEzLjQ0NzcgMTAgMTMgOS41NTIyOCAxMyA5VjRINlpNMTUgNS4yODM5OFY4SDE3Ljk0MjNMMTUgNS4yODM5OFpNMy41IDQuNUMzLjUgMy4xMTkyOSA0LjYxOTI5IDIgNiAySDE0QzE0LjI1MTQgMiAxNC40OTM2IDIuMDk0NjggMTQuNjc4MyAyLjI2NTJMMjEuMTc4MyA4LjI2NTJDMjEuMzgzNCA4LjQ1NDUgMjEuNSA4LjcyMDkgMjEuNSA5VjE5LjVDMjEuNSAyMC44ODA3IDIwLjM4MDcgMjIgMTkgMjJINkM0LjYxOTI5IDIyIDMuNSAyMC44ODA3IDMuNSAxOS41VjQuNVoiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuMzIiLz4KICA8cGF0aCBkPSJNMTQuNzgyNiAxMy40NDM2QzE1LjA3MjUgMTMuNjExIDE1LjA3MjUgMTQuMDI5MyAxNC43ODI2IDE0LjE5NjdMMTAuNjUyMiAxNi41ODE0QzEwLjM2MjMgMTYuNzQ4NyAxMCAxNi41Mzk1IDEwIDE2LjIwNDhWMTEuNDM1NEMxMCAxMS4xMDA3IDEwLjM2MjMgMTAuODkxNiAxMC42NTIyIDExLjA1ODlMMTQuNzgyNiAxMy40NDM2WiIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC4zMiIvPgo8L3N2Zz4K',
            title: 'File formats',
            mwssage: 'Recommended: “.mp4”. Other major formats are supported.',
        },
        {
            icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNSAyNCIgZmlsbD0ibm9uZSIKICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Ik00IDJDMi42MTkyOSAyIDEuNSAzLjExOTI5IDEuNSA0LjVWMTkuNUMxLjUgMjAuODgwNyAyLjYxOTI5IDIyIDQgMjJIMjFDMjIuMzgwNyAyMiAyMy41IDIwLjg4MDcgMjMuNSAxOS41VjQuNUMyMy41IDMuMTE5MjkgMjIuMzgwNyAyIDIxIDJINFpNMy41IDQuNUMzLjUgNC4yMjM4NiAzLjcyMzg2IDQgNCA0SDIxQzIxLjI3NjEgNCAyMS41IDQuMjIzODYgMjEuNSA0LjVWMTkuNUMyMS41IDE5Ljc3NjEgMjEuMjc2MSAyMCAyMSAyMEg0QzMuNzIzODYgMjAgMy41IDE5Ljc3NjEgMy41IDE5LjVWNC41WiIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC4zMiIvPgogIDxwYXRoIGQ9Ik02LjcwMDk0IDE1LjA5NzdDNi4yMjQzNyAxNS4wOTc3IDUuOTQzMTIgMTQuNzkzIDUuOTQzMTIgMTQuNDI1OEM1Ljk0MzEyIDE0LjIyNjYgNS45OSAxNC4wNzQyIDYuMDgzNzUgMTMuOTA2Mkw3Ljg4ODQ0IDEwLjY0NDVWMTAuNjEzM0g1Ljc3MTI1QzUuMzk2MjUgMTAuNjEzMyA1LjEyNjcyIDEwLjM1OTQgNS4xMjY3MiA5Ljk4NDM4QzUuMTI2NzIgOS42MDkzOCA1LjM5NjI1IDkuMzYzMjggNS43NzEyNSA5LjM2MzI4SDguNTc1OTRDOS4xMTEwOSA5LjM2MzI4IDkuNTM2ODcgOS42OTUzMSA5LjUzNjg3IDEwLjIzMDVDOS41MzY4NyAxMC41MTk1IDkuNDQ3MDMgMTAuNzg1MiA5LjI0MzkxIDExLjE3MTlMNy40MzkyMiAxNC42MDk0QzcuMjUxNzIgMTQuOTY4OCA3LjA1NjQxIDE1LjA5NzcgNi43MDA5NCAxNS4wOTc3Wk0xMC42NDA2IDE1QzEwLjEwMTYgMTUgOS44NjcxOSAxNC42OTkyIDkuODY3MTkgMTQuMjg1MkM5Ljg2NzE5IDEzLjk4MDUgMTAuMDA3OCAxMy43NDYxIDEwLjMyMDMgMTMuNDg0NEwxMS44NzExIDEyLjE1NjJDMTIuNTAzOSAxMS42MTMzIDEyLjY4MzYgMTEuMzY3MiAxMi42ODM2IDExLjAzMTJDMTIuNjgzNiAxMC42NzU4IDEyLjQxMDIgMTAuNDI5NyAxMi4wMDc4IDEwLjQyOTdDMTEuNzEwOSAxMC40Mjk3IDExLjUwNzggMTAuNTY2NCAxMS4yOTY5IDEwLjg3MTFDMTEuMDc4MSAxMS4xOTE0IDEwLjg3ODkgMTEuMzA4NiAxMC41NjI1IDExLjMwODZDMTAuMTQwNiAxMS4zMDg2IDkuODgyODEgMTEuMDYyNSA5Ljg4MjgxIDEwLjY2NDFDOS44ODI4MSAxMC41MzUyIDkuOTA2MjUgMTAuNDE0MSA5Ljk1NzAzIDEwLjI5NjlDMTAuMjUzOSA5LjYyNSAxMS4wNDY5IDkuMjA3MDMgMTIuMDMxMiA5LjIwNzAzQzEzLjQwMjMgOS4yMDcwMyAxNC4yNzczIDkuODk4NDQgMTQuMjc3MyAxMC45MjE5QzE0LjI3NzMgMTEuNjc5NyAxMy44ODY3IDEyLjA3NDIgMTMuMDExNyAxMi44MzJMMTEuOTg0NCAxMy43MTg4VjEzLjc1SDEzLjc3MzRDMTQuMTg3NSAxMy43NSAxNC40MjE5IDEzLjk5NjEgMTQuNDIxOSAxNC4zNzVDMTQuNDIxOSAxNC43NDYxIDE0LjE4NzUgMTUgMTMuNzczNCAxNUgxMC42NDA2Wk0xNy4xOTM2IDE1LjE1NjJDMTUuNjQ2NyAxNS4xNTYyIDE0LjY3MDIgMTQuMDMxMiAxNC42NzAyIDEyLjE2OEMxNC42NzAyIDEwLjI5MyAxNS42NTg0IDkuMjAzMTIgMTcuMTkzNiA5LjIwMzEyQzE4LjcyODggOS4yMDMxMiAxOS43MTMxIDEwLjI4OTEgMTkuNzEzMSAxMi4xNjQxQzE5LjcxMzEgMTQuMDIzNCAxOC43NDA1IDE1LjE1NjIgMTcuMTkzNiAxNS4xNTYyWk0xNy4xOTM2IDEzLjg4MjhDMTcuNzAxNCAxMy44ODI4IDE4LjAyNTYgMTMuMzQ3NyAxOC4wMjU2IDEyLjE2OEMxOC4wMjU2IDEwLjk4NDQgMTcuNzAxNCAxMC40NzY2IDE3LjE5MzYgMTAuNDc2NkMxNi42ODU4IDEwLjQ3NjYgMTYuMzU3NyAxMC45ODQ0IDE2LjM1NzcgMTIuMTY4QzE2LjM1NzcgMTMuMzQ3NyAxNi42ODU4IDEzLjg4MjggMTcuMTkzNiAxMy44ODI4WiIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC4zMiIvPgo8L3N2Zz4K',
            title: 'Video resolutions',
            mwssage: 'Minimum resolution: 720p. 2K and 4K are supported.',
        },
        {
            icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNSAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTguNSA3LjVMMTcgNy41TDE3IDE2SDguNVY3LjVaTTYuNSA3LjVMNi40OTk5OSAxNi4yMjMxQzYuNDk5OTUgMTYuMzQyMyA2LjQ5OTg5IDE2LjQ4NDUgNi41MTAxMyAxNi42MDk4QzYuNTIyIDE2Ljc1NSA2LjU1MjQ0IDE2Ljk2MyA2LjY2MzQ5IDE3LjE4MUM2LjgwNzMgMTcuNDYzMiA3LjAzNjc3IDE3LjY5MjcgNy4zMTkwMSAxNy44MzY1QzcuNTM2OTYgMTcuOTQ3NiA3Ljc0NDk1IDE3Ljk3OCA3Ljg5MDE3IDE3Ljk4OTlDOC4wMTU0NSAxOC4wMDAxIDguMTU3NjUgMTguMDAwMSA4LjI3Njc1IDE4TDE3IDE4VjIxLjJDMTcgMjEuNDggMTcgMjEuNjIgMTcuMDU0NSAyMS43MjdDMTcuMTAyNCAyMS44MjExIDE3LjE3ODkgMjEuODk3NiAxNy4yNzMgMjEuOTQ1NUMxNy4zOCAyMiAxNy41MiAyMiAxNy44IDIySDE4LjJDMTguNDggMjIgMTguNjIgMjIgMTguNzI3IDIxLjk0NTVDMTguODIxMSAyMS44OTc2IDE4Ljg5NzYgMjEuODIxMSAxOC45NDU1IDIxLjcyN0MxOSAyMS42MiAxOSAyMS40OCAxOSAyMS4yVjE4SDIxLjdDMjEuOTggMTggMjIuMTIgMTggMjIuMjI3IDE3Ljk0NTVDMjIuMzIxMSAxNy44OTc2IDIyLjM5NzYgMTcuODIxMSAyMi40NDU1IDE3LjcyN0MyMi41IDE3LjYyIDIyLjUgMTcuNDggMjIuNSAxNy4yVjE2LjhDMjIuNSAxNi41MiAyMi41IDE2LjM4IDIyLjQ0NTUgMTYuMjczQzIyLjM5NzYgMTYuMTc4OSAyMi4zMjExIDE2LjEwMjQgMjIuMjI3IDE2LjA1NDVDMjIuMTIgMTYgMjEuOTggMTYgMjEuNyAxNkgxOUwxOSA3LjI3Njg2QzE5LjAwMDEgNy4xNTc3NSAxOS4wMDAxIDcuMDE1NDggMTguOTg5OSA2Ljg5MDE3QzE4Ljk3OCA2Ljc0NDk1IDE4Ljk0NzYgNi41MzY5NiAxOC44MzY1IDYuMzE5MDFDMTguNjkyNyA2LjAzNjc3IDE4LjQ2MzIgNS44MDczIDE4LjE4MSA1LjY2MzQ5QzE3Ljk2MyA1LjU1MjQ0IDE3Ljc1NSA1LjUyMiAxNy42MDk4IDUuNTEwMTNDMTcuNDg0NiA1LjQ5OTkgMTcuMzQyMyA1LjQ5OTk1IDE3LjIyMzMgNS40OTk5OUw4LjUgNS41VjIuOEM4LjUgMi41MTk5NyA4LjUgMi4zNzk5NiA4LjQ0NTUgMi4yNzNDOC4zOTc1NyAyLjE3ODkyIDguMzIxMDggMi4xMDI0MyA4LjIyNjk5IDIuMDU0NUM4LjEyMDA0IDIgNy45ODAwMyAyIDcuNyAySDcuM0M3LjAxOTk3IDIgNi44Nzk5NiAyIDYuNzczIDIuMDU0NUM2LjY3ODkyIDIuMTAyNDMgNi42MDI0MyAyLjE3ODkyIDYuNTU0NSAyLjI3M0M2LjUgMi4zNzk5NiA2LjUgMi41MTk5NyA2LjUgMi44VjUuNUwzLjMgNS41QzMuMDE5OTcgNS41IDIuODc5OTYgNS41IDIuNzczIDUuNTU0NUMyLjY3ODkyIDUuNjAyNDMgMi42MDI0MyA1LjY3ODkyIDIuNTU0NSA1Ljc3M0MyLjUgNS44Nzk5NiAyLjUgNi4wMTk5NyAyLjUgNi4zVjYuN0MyLjUgNi45ODAwMyAyLjUgNy4xMjAwNCAyLjU1NDUgNy4yMjY5OUMyLjYwMjQzIDcuMzIxMDcgMi42Nzg5MiA3LjM5NzU2IDIuNzczIDcuNDQ1NUMyLjg3OTk2IDcuNSAzLjAxOTk3IDcuNSAzLjMgNy41TDYuNSA3LjVaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjMyIi8+Cjwvc3ZnPgo=',
            title: 'Aspect ratios',
            mwssage: 'Recommended: 16:9 for landscape, 9:16 for vertical.',
        },
    ];

    const user = useSelector((state) => state.authReducer.user);

    const [file, setFile] = useState();

    const [previewVideo, setPreviewVideo] = useState();

    const [uploadProgress, setUploadProgress] = useState(0);

    const [uploadStatus, setUploadStatus] = useState('Uploading...');

    const [description, setDescription] = useState('');

    const [descriptionLength, setDescriptionLength] = useState(description.length);

    const [privateWho, setPrivateWho] = useState('Only you');

    const [showPrivateWho, setShowPrivateWho] = useState(false);

    // open is click to open file in local computer

    // getRootProps can recieve className scss

    const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
        // Disable click and keydown behavior of getRootProps (around area to drag and drop) and getInputProps (around input)
        noClick: true,
        noKeyboard: true,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
            'video/*': ['.mp4'],
        },

        // onDrop to handle when select file after that which function to handle that file
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles[0]);
            setPreviewVideo(URL.createObjectURL(acceptedFiles[0]));
            setDescription(acceptedFiles[0].name.substring(0, acceptedFiles[0].name.indexOf('.')));
            fakeUploadProgress();
        },
    });

    // fake upload progress to create a feeling that the file is uploading

    const fakeUploadProgress = () => {
        const interval = setInterval(() => {
            setUploadProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    setUploadStatus('Uploaded');

                    return 100;
                }
                return prevProgress + 20; // Tăng tiến trình mỗi lần chạy
            });
        }, 300); // fake speeding of upload per 300ms
    };

    const handleHashTag = () => {
        setDescription((prev) => prev + '#');
    };

    const handleMention = () => {
        setDescription((prev) => prev + '@');
    };

    const handlePostVideoApi = () => {
        const formData = new FormData();
        formData.append('Title', description);
        formData.append('SrcVideo', file);
        formData.append('AccountID', user.id);

        const ApiPostVideo = async () => {
            const response = await PostVideo(formData);
            if (response.code === 'Success') {
                // notification
                console.log('Post successfully');
            }
        };
        ApiPostVideo();
    };

    const handleRenderPrivate = (attrs) => (
        <div tabIndex="-1" {...attrs}>
            <Border>
                {privateWatch.map((privateWatch, index) => {
                    return (
                        <div
                            key={index}
                            className={cx('change-info-private-select-item')}
                            onClick={() => {
                                setPrivateWho(privateWatch.title);
                                setShowPrivateWho(false);
                            }}
                        >
                            <h4 className={cx('change-info-private-select-item-title')}>
                                {privateWatch.title}{' '}
                                {privateWatch.title === privateWho ? <TickPrivateWhoWatchVideo /> : <></>}
                            </h4>
                            {privateWatch.message && (
                                <span className={cx('change-info-private-select-item-message')}>
                                    {privateWatch.message}
                                </span>
                            )}
                        </div>
                    );
                })}
            </Border>
        </div>
    );

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                {!previewVideo ? (
                    <>
                        <div className={cx('file')}>
                            <div className={cx('file-input')}>
                                <div className={cx('container')}>
                                    <div {...getRootProps()} className={cx('select-file')} onClick={open}>
                                        <input {...getInputProps()} />
                                        <IconUploadVideo className={cx('icon-upload')} />
                                        <div className={cx('text-upload-up')}>Select video to upload</div>
                                        <div className={cx('text-upload-down')}>Or drag and drop it here</div>
                                        <Button btnPrimary={true} onClick={open} classNames={cx('btn-upload')}>
                                            Select video
                                        </Button>
                                    </div>
                                    <div className={cx('policy')}>
                                        {policy.map((policy, index) => {
                                            return (
                                                <div key={index} className={cx('policy-item')}>
                                                    <img className={cx('policy-item-img')} src={policy.icon} />
                                                    <div className={cx('policy-item-info')}>
                                                        <div className={cx('policy-item-title')}>{policy.title}</div>
                                                        <div className={cx('policy-item-message')}>
                                                            {policy.mwssage}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={cx('preview')}>
                            <div className={cx('preview-infor')}>
                                <div className={cx('preview-name')}>{file.name}</div>
                                <div>
                                    <span className={cx('preview-size')}>
                                        Size: <span className={cx('preview-size-number')}>{file.size}</span>
                                    </span>
                                    <span className={cx('preview-duration')}>
                                        Duration: <span className={cx('preview-duration-number')}>0m 30s</span>
                                    </span>
                                </div>
                                {uploadProgress === 100 ? (
                                    <div className={cx('progress-upload')}>
                                        <p
                                            className={cx('progress-text', {
                                                'upload-status': uploadStatus === 'Uploaded',
                                            })}
                                        >
                                            <span>
                                                <img
                                                    className={cx('progress-text-icon')}
                                                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNSAyNCIgZmlsbD0ibm9uZSIKICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTIuNSAyMS4xNjczQzE3LjU2MjYgMjEuMTY3MyAyMS42NjY3IDE3LjA2MzMgMjEuNjY2NyAxMi4wMDA3QzIxLjY2NjcgNi45MzgwNCAxNy41NjI2IDIuODMzOTggMTIuNSAyLjgzMzk4QzcuNDM3NCAyLjgzMzk4IDMuMzMzMzQgNi45MzgwNCAzLjMzMzM0IDEyLjAwMDdDMy4zMzMzNCAxNy4wNjMzIDcuNDM3NCAyMS4xNjczIDEyLjUgMjEuMTY3M1pNMTYuODMxNiA4LjM4OTIxTDE1Ljk0MjEgNy44MzAxOEMxNS42OTQxIDcuNjc5NDkgMTUuMzY4NSA3Ljc1MjQgMTUuMjE3OCA4LjAwMDMyTDExLjM4NzIgMTQuMTMwMkw5LjI2MjkgMTEuNzA0NUM5LjA2ODQ1IDExLjQ4NTcgOC43Mzc5IDExLjQ2MTQgOC41MjQwMSAxMS42NTFMNy43MjY3OSAxMi4zNDYyQzcuNTA4MDQgMTIuNTM1NyA3LjQ4MzczIDEyLjg3NiA3LjY3ODE3IDEzLjA4OTlMMTAuNzM1OCAxNi41ODVDMTAuOTU0NiAxNi44Mzc4IDExLjI3NTQgMTYuOTY5MSAxMS42MDYgMTYuOTM5OUMxMS45NDE0IDE2LjkxNTYgMTIuMjM3OSAxNi43MzA5IDEyLjQxNzggMTYuNDQ0MUwxNy4wMDE4IDkuMTE4MzdDMTcuMTUyNSA4Ljg3MDQ2IDE3LjA3OTYgOC41NDQ3NiAxNi44MzE2IDguMzg5MjFaIiBmaWxsPSIjMDBDMzlCIi8+Cjwvc3ZnPgo="
                                                />
                                                <span>{uploadStatus}:</span>
                                            </span>
                                            <span className={cx('progress-text-percent')}>{uploadProgress}%</span>
                                        </p>
                                        <div
                                            className={cx('progress-bar')}
                                            style={{ width: `${uploadProgress}%` }}
                                        ></div>
                                    </div>
                                ) : (
                                    <div className={cx('progress-upload')}>
                                        <p
                                            className={cx('progress-text', {
                                                'upload-status': uploadStatus === 'Uploaded',
                                            })}
                                        >
                                            <span>{uploadStatus}</span>
                                            <span className={cx('progress-text-percent')}>{uploadProgress}%</span>
                                        </p>
                                        <div
                                            className={cx('progress-bar')}
                                            style={{ width: `${uploadProgress}%` }}
                                        ></div>
                                    </div>
                                )}
                            </div>
                            <div className={cx('preview-body')}>
                                {uploadProgress === 100 && (
                                    <div className={cx('preview-video')}>
                                        <div className={cx('change-info')}>
                                            <div className={cx('change-info-description')}>
                                                <div className={cx('change-info-description-title')}>Description</div>
                                                <textarea
                                                    className={cx('change-info-description-text')}
                                                    placeholder="Share more about your video here"
                                                    value={description}
                                                    onChange={(e) => {
                                                        setDescription(e.target.value);
                                                        setDescriptionLength(e.target.value.length);
                                                    }}
                                                ></textarea>
                                                <div className={cx('change-info-description-hashtag')}>
                                                    <div className={cx('change-info-description-hashtag-titles')}>
                                                        <span
                                                            className={cx('change-info-description-hashtag-title')}
                                                            onClick={handleHashTag}
                                                        >
                                                            # Hashtags
                                                        </span>
                                                        <span
                                                            className={cx('change-info-description-hashtag-title')}
                                                            onClick={handleMention}
                                                        >
                                                            @ Mentions
                                                        </span>
                                                    </div>
                                                    <div className={cx('change-info-description-hashtag-number')}>
                                                        {descriptionLength}/4000
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('change-info-private')}>
                                                <div className={cx('change-info-private-title')}>
                                                    Who can what this video
                                                </div>
                                                <Tippy
                                                    visible={showPrivateWho}
                                                    interactive
                                                    render={handleRenderPrivate}
                                                    placement="bottom-start"
                                                    offset={[0, 5]}
                                                >
                                                    <div
                                                        className={cx('change-info-private-select')}
                                                        onClick={() => {
                                                            setShowPrivateWho(!showPrivateWho);
                                                        }}
                                                    >
                                                        <div className={cx('change-info-private-select-title')}>
                                                            {privateWho}
                                                        </div>
                                                        <div className={cx('change-info-private-select-icon')}>
                                                            <FontAwesomeIcon icon={faChevronDown} />
                                                        </div>
                                                    </div>
                                                </Tippy>
                                            </div>
                                            <div className={cx('btn-group')}>
                                                <Button
                                                    btnPrimary
                                                    classNames={cx('btn-post')}
                                                    onClick={handlePostVideoApi}
                                                >
                                                    Post
                                                </Button>
                                                <Button
                                                    btnOutline
                                                    classNames={cx('btn-discard')}
                                                    classNameTitle={cx('btn-discard-title')}
                                                >
                                                    Discard
                                                </Button>
                                            </div>
                                        </div>
                                        <div className={cx('change-platform')}>
                                            <h1>Header</h1>
                                            <div className={cx('change-platform-mobile')}>
                                                <video controls className={cx('change-platform-mobile-video')}>
                                                    <source src={previewVideo} type="video/mp4" />
                                                </video>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
            {!previewVideo && (
                <div className={cx('capcut')}>
                    <div>
                        <div className={cx('capcut-title-up')}>Create high quality videos on CapCut Online</div>
                        <div className={cx('capcut-title-down')}>
                            Automatically shorten your videos and create videos from scripts with AI-powered features.
                        </div>
                    </div>
                    <Button btnOutline={true} classNames={cx('btn-capcut')}>
                        Try now
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Upload;

{
    /* <div>
    <h2>Chỉnh sửa video của bạn</h2>
    <video controls className={cx('video-preview')}>
        <source src={URL.createObjectURL(file)} type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ video.
    </video>
</div>; */
}
