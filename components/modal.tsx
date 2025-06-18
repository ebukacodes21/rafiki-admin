type ModalProp = {
    show: boolean;
    children: React.ReactNode;
}

export const Modal = ({ show, children }: ModalProp) => {
    const showHideClassName = show ? "block" : "hidden";

    return (
        <div
            className={`${showHideClassName} fixed z-10 inset-0 overflow-y-auto`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 w-full">
                <div
                    className="fixed inset-0 bg-[#0a0b0d]/75 bg-opacity-75 transition-opacity cursor-pointer"
                    aria-hidden="true"
                ></div>
                <div className="inline-block align-bottom bg-[#F4F0EE] rounded-sm py-10 px-10 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full w-full max-w-3xl">
                    {children}
                </div>
            </div>
        </div>

    );
};