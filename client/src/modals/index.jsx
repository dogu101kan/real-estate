import modals from "../routes/modals";
import { removeModal } from "../store/modal/actions";
import { useModal } from "../store/modal/hooks";

const Modal = () => {
  const modal = useModal();
  const currentModal = modals.find((m) => m.name === modal.name);

  return (
    <div className="fixed inset-0 bg-[#00000066] flex items-center justify-center z-[100]">
      <div className="bg-[color:var(--background-primary)] max-w-[600px] max-h-[90vh] overflow-auto rounded-2xl">
        {currentModal && <currentModal.element close={removeModal} />}
      </div>
    </div>
  );
};

export default Modal;
