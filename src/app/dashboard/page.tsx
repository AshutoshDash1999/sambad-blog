import PublishBlog from "@/components/PublishBlog/PublishBlog";
import { auth } from "@/utils/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

const Dashboard = () => {
  return <div>
    <PublishBlog/>
  </div>;
};
export default Dashboard;
