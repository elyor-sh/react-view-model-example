import {
  parseQueryParams,
  parseQueryStringFromUrl,
} from "@/shared/lib/query-params.ts";
import type { ZodObject, ZodRawShape } from "zod";
import { redirect } from "react-router";

export function validateLocationSearch<T extends ZodRawShape>(
  url: string,
  $schema: ZodObject<T>,
) {
  const searchParams = parseQueryStringFromUrl(url);
  const query = parseQueryParams(searchParams);

  const validQueryParams = $schema.strip().parse(query);

  const extraKeys = Object.keys(query).filter(
    (key) => !(key in validQueryParams),
  );

  // если зод вернул дефольтные поля, то они не попадут в extraKeys, поэтому проверяем наоборот
  const extraKeysT = Object.keys(validQueryParams).filter(
    (key) => !(key in query),
  );

  if (extraKeys.length > 0 || extraKeysT.length > 0) {
    const params = new URLSearchParams(
      validQueryParams as Record<string, string>,
    );
    return redirect(`/?${params.toString()}`);
  }

  return validQueryParams;
}
