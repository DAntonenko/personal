"use client";

import { useFormStatus } from "react-dom";

type Props = {
  idleText: string;
  pendingText: string;
  confirmText?: string;
};

export function SubmitFormButton({
  idleText,
  pendingText,
  confirmText,
}: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (confirmText && !confirm(confirmText)) {
          e.preventDefault();
        }
      }}
    >
      {pending ? pendingText : idleText}
    </button>
  );
}
