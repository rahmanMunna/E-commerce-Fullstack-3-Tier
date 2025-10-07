const CancelButtonModal = ({ handleCancel, oId }) => {
    return (
        <dialog id="cancel-btn-modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h1 className="text-2xl font-bold">Are You Sure to Cancel ?</h1>
                <div className="modal-action">                  
                    <form className="flex gap-2" method="dialog">
                        <button className="btn">No</button>
                        <button onClick={() => handleCancel(oId)} className='btn btn-error'>Cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default CancelButtonModal;