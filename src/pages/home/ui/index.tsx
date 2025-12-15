import {observer} from "mobx-react-lite";
import {useGlobalStore} from "@/app/globals.ts";

export const HomePage = observer(() => {
  const {context} = useGlobalStore();

  return (
    <div>
      <h1>Hello {context.session.email}</h1>
      <p>You logged in at {context.session.loginDate}</p>
    </div>
  )
})

HomePage.displayName = "HomePage";
