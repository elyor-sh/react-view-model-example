import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { ToastContainer, type ToastContainerProps } from "react-toastify";

const Toaster = ({ ...props }: ToastContainerProps) => {
  return (
    <ToastContainer
      className="toaster group"
      icon={({ type }) => {
        switch (type) {
          case "success":
            return <CircleCheckIcon className="size-4" />;
          case "info":
            return <InfoIcon className="size-4" />;
          case "warning":
            return <TriangleAlertIcon className="size-4" />;
          case "error":
            return <OctagonXIcon className="size-4" />;
          default:
            return <Loader2Icon className="size-4 animate-spin" />;
        }
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
