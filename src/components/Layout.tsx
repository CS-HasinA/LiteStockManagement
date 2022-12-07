import React from "react";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <div className="text-center">
      <header className="h-16 flex justify-center items-center relative">
        <Header title={title} />
      </header>
      <main className="bg-slate-200 p-5 text-gray-600 min-h-screen">
        {children}
      </main>
      <ToastContainer
        position="top-right"
        autoClose={50000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ minWidth: "200px", zIndex: 999999 }}
      />
    </div>
  );
}
