import React from "react";

export default function LoadingScreen() {
  return (
    <>
      <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
        <i className="fa-solid fa-spinner fa-spin fa-5x"></i>
      </div>
    </>
  );
}
