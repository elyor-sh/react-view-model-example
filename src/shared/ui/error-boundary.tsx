import { ZodError } from "zod";
import { Component, type ErrorInfo, type ReactNode } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router";

type ErrorBoundaryProps = {
  children?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: unknown;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
    console.error("Error caught by ValidationErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const error = this.state.error;

      // Специально для Zod
      if (error instanceof ZodError) {
        return (
          <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-red-700 p-4">
            <h1 className="text-2xl font-bold mb-2">Ошибка валидации данных</h1>
            <p className="mb-4">Параметры запроса некорректны:</p>
            <ul className="list-disc pl-6 space-y-1">
              {error.issues.map((issue, idx) => (
                <li key={idx}>
                  <strong>{issue.path.join(".") || "field"}:</strong>{" "}
                  {issue.message}
                </li>
              ))}
            </ul>
          </div>
        );
      }

      // Для любых других ошибок
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-700 p-4">
          <h1 className="text-2xl font-bold mb-2">Произошла ошибка</h1>
          <pre className="whitespace-pre-wrap">{String(error)}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export function RouterErrorBoundary() {
  const error = useRouteError();

  if (error instanceof ZodError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-red-700 p-4">
        <h1 className="text-2xl font-bold mb-2">Ошибка валидации данных</h1>
        <p className="mb-4">Параметры запроса некорректны:</p>
        <ul className="list-disc pl-6 space-y-1">
          {error.issues.map((issue, idx) => (
            <li key={idx}>
              <strong>{issue.path.join(".") || "field"}:</strong>{" "}
              {issue.message}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (isRouteErrorResponse(error)) {
    // Например, 404 или redirect ошибки
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-700 p-4">
        <h1 className="text-2xl font-bold mb-2">Ошибка маршрута</h1>
        <p>{error.statusText || "Что-то пошло не так"}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-700 p-4">
      <h1 className="text-2xl font-bold mb-2">Произошла неизвестная ошибка</h1>
      <pre className="whitespace-pre-wrap">{String(error)}</pre>
    </div>
  );
}
