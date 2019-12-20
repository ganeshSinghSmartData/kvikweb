import React from 'react';
import './checkbox.scss';
const Checkbox = () => {
    return (
        <label className="checkbox">
            <input type="checkbox" name="checkbox" />
            <span className="d-flex align-items-center justify-content-center">
                <svg className="" xmlns="http://www.w3.org/2000/svg" width="78.775" height="57.775" viewBox="0 0 78.775 57.775">
                    <path id="Forma_1" data-name="Forma 1" d="M78.564,8.73,29.722,57.567a1.1,1.1,0,0,1-1.556,0L.433,29.836a1.1,1.1,0,0,1,0-1.555l6.739-6.738a1.1,1.1,0,0,1,1.556,0L28.945,41.757,70.27.436a1.1,1.1,0,0,1,1.555,0l6.739,6.738A1.1,1.1,0,0,1,78.564,8.73Z" transform="translate(-0.111 -0.114)" />
                </svg>
            </span>
        </label>
    );
};

export default Checkbox;