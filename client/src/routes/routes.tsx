import App from "../App";
import ErrorPage from "../error pages/ErrorPage";

const routes = [
    {
        path: "/:currPage?/:folderId?",
        element: <App></App>,
        errorElement: <ErrorPage></ErrorPage>
    }
]

export default routes;