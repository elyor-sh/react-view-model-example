import {Loader2Icon} from "lucide-react"

import {cn} from "@/shared/lib/utils.ts"
import type {ComponentProps} from "react";

function Spinner({ className, ...props }: ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

function Loading(props: ComponentProps<"svg">) {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <Spinner {...props} />
    </div>
  )
}

export { Spinner, Loading }
