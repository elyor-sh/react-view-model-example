import { ZodError } from "zod";
import { toast } from "sonner";
import type { ReactNode } from "react";

function isAbortError(error: unknown): boolean {
  return (
    (error instanceof DOMException && error.name === "AbortError") ||
    (error instanceof Error && error.name === "AbortError") ||
    (typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "ERR_CANCELED")
  );
}

type ParsedError = {
  message: string;
  fields: Record<string, string>;
};

export function parseError(error: unknown): ParsedError {
  if (isAbortError(error)) {
    return {
      message: "Aborted",
      fields: {},
    };
  }

  if (error instanceof ZodError) {
    const fields: Record<string, string> = {};
    const errorMessages: ReactNode[] = [];

    for (const issue of error.issues) {
      const path = issue.path.join(".");
      fields[path || "_error"] = issue.message;
      errorMessages.push(
        <li>
          {path}: {issue.message}
        </li>,
      );
    }

    toast.error(
      <div>
        <h6>Validation error:</h6>
        <ul>{errorMessages}</ul>
      </div>,
    );

    return {
      message: "Validation error",
      fields,
    };
  }

  if (error instanceof Error) {
    toast.error(error.message);
    return {
      message: error.message,
      fields: {},
    };
  }

  toast.error("Unknown error");

  return {
    message: "Unknown error",
    fields: {},
  };
}
