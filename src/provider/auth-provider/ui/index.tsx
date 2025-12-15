import {observer} from "mobx-react-lite";
import {Navigate, Outlet} from "react-router";
import {useGlobalStore} from "@/app/globals.ts";
import {AuthProviderVM} from "@/provider/auth-provider/model";

export const AuthProvider = observer(() => {

  const {vm} = useGlobalStore(AuthProviderVM);

  if (!vm.isLoggedIn) {
    return <Navigate to="/login" />
  }

  return <Outlet />
});

AuthProvider.displayName = "AuthProvider";