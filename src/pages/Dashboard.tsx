
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-gray-50">
      <div className="w-full max-w-2xl text-center animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to your Dashboard
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          This is where your journey begins!
        </p>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <p className="text-gray-600 mb-4">
            Thank you for signing up! This is a placeholder dashboard page.
          </p>
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Signup
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
