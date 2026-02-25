"use client";

import { useRouter } from "next/navigation";

interface BackLinkProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function BackLink({ className = "", style }: BackLinkProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={className}
      style={style}
    >
      back
    </button>
  );
}
