import {
  parseQueryParams,
  parseQueryStringFromUrl,
  stringifyQueryParams,
} from "@/shared/lib/query-params.ts";
import type { ZodObject, ZodRawShape } from "zod";
import { redirect } from "react-router";
import type { FiltersModel } from "@/provider/filters-provider/model";

export function validateLocationSearch<T extends ZodRawShape>(
  url: string,
  filtersModel: FiltersModel,
  $schema: ZodObject<T>,
) {
  const pathname = new URL(url).pathname;
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
    if (filtersModel.filters[pathname]) {
      const params = filtersModel.filters[pathname];
      return redirect(`/?${params}`);
    }

    const params = stringifyQueryParams(validQueryParams);
    return redirect(`/?${params}`);
  }

  return validQueryParams;
}
