import React from "react"
import loading from "../../img/opaque_spinner.gif"



const LoadingSpinner = props => {
    return (
        <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
            <img src={loading} alt="spinner" />
        </div>
    );
}

export default LoadingSpinner