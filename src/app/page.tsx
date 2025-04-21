// LandingPage component: the main page that users see when they first access the app

import Link from "next/link";
import "./page.css";

const LandingPage = () => {
  return (
    <div className="LandingPageContainer">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Welcome to the Events App
        </h1>
        <p className="mb-4">
          <Link href="/auth/login" className="LandingPageButton">
            Log In
          </Link>
        </p>
        <p>
          <Link href="/auth/register" className="LandingPageButton">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
