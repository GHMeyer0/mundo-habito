import { RouteObject } from "react-router-dom";
import Main from "./layout/Main";
import GoalsPage from "./pages/GoalsPage";
import MainPage from "./pages/MainPage";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/goals',
        element: <GoalsPage />,
      }
    ],
  },
]