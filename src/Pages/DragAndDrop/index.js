import classNames from 'classnames/bind';
import { useDropzone } from 'react-dropzone';

import styles from './DragAndDrop.module.scss';

const cx = classNames.bind(styles);

function DragAndDrop(props) {
    const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
        // Disable click and keydown behavior
        noClick: true,
        noKeyboard: true,
    });

    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const className = cx('content');

    return (
        <div className={cx('container')}>
            <div {...getRootProps({ className })} onClick={open}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here</p>
                <button type="button" onClick={open}>
                    Open File Dialog
                </button>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
        </div>
    );
}

export default DragAndDrop;
