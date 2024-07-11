import { Fragment, ReactNode, useRef } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import classNames from "@/utils/classNames";

interface Props {
  show: boolean;
  width?: string;
  children: ReactNode;
  onCloseModal: () => void;
}

const DialogModal = ({
  show,
  width,
  children,
  onCloseModal: closeModal,
}: Props) => {
  const focusRef = useRef(null);

  return (
    <Transition show={show} as={Fragment}>
      <Dialog
        as="div"
        initialFocus={focusRef}
        className="relative z-20 font-jakarta"
        onClose={closeModal}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                className={classNames(
                  `${width} relative my-8 max-w-lg py-[12px] px-[24px] transform `,
                  "rounded-xl bg-[#14171a] text-left shadow-xl transition-all"
                )}
              >
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DialogModal;
