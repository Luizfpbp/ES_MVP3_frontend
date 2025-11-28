import { BookOpen, LogOutIcon } from "lucide-react";
import { Button } from "../components/ui";
import { useSessionStore } from "../store/useSessionStore";

const Home = () => {
  const { clearSession } = useSessionStore();

  return (
    <div className="flex justify-center h-screen w-full p-2">
      <div className="flex w-full justify-between">
        <div className="border rounded-xl border-transparent bg-amber-800 p-4">
          <BookOpen className="w-18 h-18" color="white" />
        </div>
        <Button onClick={clearSession}>
          <div className="flex gap-2">
            <LogOutIcon />
            Logout
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Home;
