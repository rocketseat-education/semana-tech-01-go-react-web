import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { Toaster } from 'sonner'

import { CreateRoom } from "./pages/create-room"
import { Room } from "./pages/room"

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateRoom />,
  },
  {
    path: "/:id",
    element: <Room />,
  },
]);

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors invert />
    </>
  )
}
