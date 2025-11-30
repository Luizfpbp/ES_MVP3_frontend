import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui";
import { ROUTES } from "../routes/routes";

const Page404 = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-bold text-red-500">404</h1>
        <p className="mb-4 text-2xl text-muted-foreground">
          Oops! Page not found
        </p>
        <Button onClick={handleBackHome}>Return to Home</Button>
      </div>
    </div>
  );
};

export default Page404;
