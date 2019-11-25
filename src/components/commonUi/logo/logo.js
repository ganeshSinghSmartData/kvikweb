import React from 'react';
import './logo.scss';
const Logo = (props) => {
    return (
        <label className={"logo " + (props.className)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="78.708" height="29.16" viewBox="0 0 78.708 29.16">
                <path id="Path_899" data-name="Path 899" d="M9.873,0V-28.471h-6.8V0ZM19.7-28.471,10.424-16.577,22.5,0h8.036L17.725-16.485l10.24-11.985ZM36.645.276H37.93L48.125-19.241H41.65L37.287-9.092,32.879-19.241H26.45ZM56.85-25.394c0-1.745-1.469-2.755-3.352-2.755s-3.352,1.01-3.352,2.755,1.469,2.8,3.352,2.8S56.85-23.649,56.85-25.394ZM50.558,0h5.924V-19.241H50.558ZM67.274,0V-28.884L61.4-27.69V0Zm.367-11.113L74.713,0h7.072L73.978-11.113,79.9-19.241H72.968Z" transform="translate(-3.077 28.884)" fill="#fff" />
            </svg>
        </label>
    );
};

export default Logo;