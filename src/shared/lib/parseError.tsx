import { ZodError } from "zod";
import { toast } from "sonner";
import type { ReactNode } from "react";
import type { AxiosError } from "axios";

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

function isAxiosError(error: unknown): error is AxiosError {
  return (
    typeof error === "object" &&
    error !== null &&
    "isAxiosError" in error &&
    (error as { isAxiosError: boolean }).isAxiosError
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

  if (isAxiosError(error)) {
    const data = error.response?.data as
      | {
          message?: string;
          errors?: Record<string, string>;
        }
      | undefined;

    const message = data?.message || error.message || "Request failed";

    const fields = data?.errors ?? {};

    if (Object.keys(fields).length > 0) {
      toast.error(
        <div>
          <h6>{message}</h6>
          <ul>
            {Object.entries(fields).map(([field, msg]) => (
              <li key={field}>
                {field}: {msg}
              </li>
            ))}
          </ul>
        </div>,
      );
    } else {
      toast.error(message);
    }

    return {
      message,
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
