"use client";

import useModal from "@/store/common/context/modal.context";

type ModalProps = {
  children: React.ReactNode;
  title: string;
};

const Modal = ({ children, title }: ModalProps) => {
  const { open, setOpen } = useModal();

  // Don't render anything when modal is closed
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-slate-950/50
        p-4
        backdrop-blur-[2px]
      "
    >
      {/* =========================================================
          MODAL CONTAINER
          ---------------------------------------------------------
          Responsive:
          - Mobile  : almost full width
          - Tablet  : medium width
          - Desktop : max 4xl
      ========================================================= */}

      <div
        className="
          flex
          w-full
          max-w-4xl
          flex-col
          overflow-hidden
          rounded-xl
          border
          border-slate-200
          bg-white
          shadow-2xl
          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        {/* =======================================================
            MODAL HEADER
            -------------------------------------------------------
            Contains:
            - Title
            - Close button
        ======================================================= */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-white/10
            bg-[#003366]
            px-5
            py-4
            sm:px-6
          "
        >
          {/* -----------------------------------------------------
              TITLE SECTION
          ----------------------------------------------------- */}

          <div className="min-w-0">
            <h2
              className="
                
                text-base
                font-semibold
                tracking-tight
                text-white
                sm:text-lg
              "
            >
              {title}
            </h2>

            {/* Small enterprise-style indicator */}
            <p className="mt-0.5 text-xs text-white/60">School ERP</p>
          </div>

          {/* -----------------------------------------------------
              CLOSE BUTTON
          ----------------------------------------------------- */}

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close modal"
            className="
              ml-4
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              border
              border-white/10
              bg-white/10
              text-lg
              leading-none
              text-white
              transition
              duration-200
              hover:bg-white/20
              hover:text-white
              focus:outline-none
              focus:ring-2
              focus:ring-white/40
            "
          >
            ×
          </button>
        </div>

        {/* =======================================================
            MODAL BODY
            -------------------------------------------------------
            Scrollable body prevents large forms from making the
            entire browser page scroll.
        ======================================================= */}

        <div
          className="
            max-h-[70vh]
            overflow-y-auto
            bg-slate-50
            p-4
            sm:p-6
            dark:bg-slate-950
          "
        >
          {children}
        </div>

        {/* =======================================================
            MODAL FOOTER
            -------------------------------------------------------
            This is intentionally empty.

            If a particular modal needs buttons such as:
            Cancel / Save / Update

            you can place them inside the children/form itself.
        ======================================================= */}
      </div>
    </div>
  );
};

export default Modal;
