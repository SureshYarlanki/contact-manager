import React from "react";
export interface IProps{
    heading?: string;
    color: string;
}

export const Heading: React.FC<IProps> = (props) => {
    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        <p className={`h3 ${props.color}`}>{props.heading}</p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem perferendis pariatur distinctio laudantium voluptatum repellendus quia tempore nihil dolorum aliquid commodi veniam quasi modi similique numquam, ipsa cupiditate impedit saepe.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Heading;