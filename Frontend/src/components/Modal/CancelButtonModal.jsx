import { toast } from "react-toastify";
import api from "../../Interceptor/Api";

const CancelButtonModal = ({loadData, oId }) => {

    const handleCancel = async (oId) => {
        try {
            const res = await api.put(`order/cancel/${oId}`)
            if (res.data) {
                toast.info(`Order - ${oId} has been cancelled`);
                loadData()
                return;
            }
            toast.error("Order can't Cancelled");
            return;
        }
        catch (err) {
            console.log(err.message)
        }

    }

    return (
        <dialog id={`cancel-btn-modal-${oId}`} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h1 className="text-2xl font-bold">Are You Sure to Cancel ?</h1>
                <div className="modal-action">
                    <form className="flex gap-2" method="dialog">
                        <button onClick={() => handleCancel(oId)} className='btn btn-error'>Cancel</button>
                        <button className="btn">No</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default CancelButtonModal;