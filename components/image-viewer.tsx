import { FC, useEffect } from "react";

type ImageViewerProper = {
    imgUrl: string,
    isOpen: boolean,
    onClose: () => void,
}

export const ImagePreviewModal: FC<ImageViewerProper> = ({
  imgUrl,
  isOpen,
  onClose,
}: {
  imgUrl: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-2 rounded shadow-lg max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imgUrl}
          alt="Profile Preview"
          className="max-w-full max-h-[80vh] object-contain rounded"
        />
        <button
          className="mt-2 w-full text-center text-sm text-red-600 hover:underline cursor-pointer"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};
