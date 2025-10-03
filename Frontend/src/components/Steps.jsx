const Steps = ({ statusId }) => {
    // console.log(statusId)
    return (
        <div className="md:w-1/4 mb-6 md:mb-0">
            <ul className="steps steps-vertical">
                <li className='step step-primary'>Place Order</li>
                <li
                    id="confirmOrderStep"
                    className={`step ${statusId >= 2 ? "step-primary" : ""}`}
                >
                    Confirm Order
                </li>

                <li
                    className={`step ${statusId >= 2 ? "step-primary" : ""}`}
                >
                    Processing
                </li>

                <li
                    className={`step ${statusId >= 3 ? "step-primary" : ""}`}
                >
                    Assign to Deliveryman
                </li>

                <li
                    className={`step ${statusId === 4 ? "step-primary" : ""}`}
                >
                    Delivered
                </li>
            </ul>
        </div>
    );
};

export default Steps;