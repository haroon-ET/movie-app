import Image from "next/image";
import Movies from "./movies/page";
import PrivateRoute from "@/hooks/PrivateRoute";

const Home = () => {
  return <Movies />;
};

export default PrivateRoute(Home);
