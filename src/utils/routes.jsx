import HomePage from "pages/Home/Home";
import Error404Page from "pages/Error/E404";
import FAQPage from "pages/FAQ/FAQ";

const RoutePaths = [
  {
    type: "route",
    name: "FAQ",
    key: "faq",
    route: "/faq",
    component: <FAQPage />,
  },

  {
    type: "route",
    name: "Home Page",
    key: "home",
    route: "/",
    component: <HomePage />,
  },

  {
    type: "route",
    name: "Error 404",
    key: "error404",
    route: "*",
    component: <Error404Page />,
  },
];

export const getRoute = (key) => {
  return RoutePaths.find((element) => {
    return element.key === key;
  }).route;
};

export default RoutePaths;
