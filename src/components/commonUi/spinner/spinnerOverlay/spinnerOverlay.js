import React from 'react';
import Spinner from '../spinner';
import './spinnerOverlay.scss';
const SpinnerOverlay = (props) => {
    return (
        <div className={"spinner-overlay d-flex align-items-center justify-content-center " + (props.className)}>
            <Spinner />
        </div>
    );
};

export default SpinnerOverlay;