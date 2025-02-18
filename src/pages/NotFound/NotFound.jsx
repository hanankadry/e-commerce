import React from "react";
import { Button } from "@heroui/react";

export default function NotFoundPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[#F8F9FA]">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-6">
        Page Not Found
      </h2>
      <p className="text-lg text-gray-500 mb-8 text-center max-w-md">
        Sorry, the page you're looking for doesn't exist. You can go back to the
        homepage or explore other sections of our website.
      </p>
      <Button
        color="success"
        size="lg"
        className="text-lg hover:bg-green-600 px-6 py-3 rounded"
        onPress={() => (window.location.href = "/")}
      >
        Go to Homepage
      </Button>
    </div>
  );
}
