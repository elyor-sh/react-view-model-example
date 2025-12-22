import { useEffect, useState } from "react";
import { FiltersModel } from "@/provider/filters-provider/model";
import { AppRouter } from "@/provider/router-provider/model";
import { createAppRouter } from "@/app/router";
import { Globals } from "@/app/globals";

export const useInitApp = () => {
  const [filtersModel] = useState(() => new FiltersModel());
  const [router] = useState(() => createAppRouter(filtersModel));
  const [appRouter] = useState(
    () =>
      new AppRouter(
        router.state.location,
        router.state.matches,
        router.navigate,
        filtersModel,
      ),
  );
  const [globals] = useState(() => new Globals(appRouter));

  useEffect(() => {
    const unsubscribe = router.subscribe(appRouter.subscribe);
    return () => unsubscribe();
  }, [appRouter.subscribe]);

  return { globals, router };
};
