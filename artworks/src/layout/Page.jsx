import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

export default function Page(props) {
  const { children } = props;
  return (
    <>
      <Header />
      <main className="container">
        <h1 className="page-title">The Art of Japanese Prints</h1>
        {children}
      </main>
      <Footer />
    </>
  );
}
