import React from "react";
import spinImg from "../../../../assets/animations/ spinner.gif"

export const Spinner: React.FC = () => {
    return (
        <>
            <div className="spinner">
                <img src={spinImg} alt="spinner" />
            </div>
        </>
    )
}
export default Spinner;