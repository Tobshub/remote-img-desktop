import React from "react";
import { Link } from "react-router-dom";
import RandImage1 from "@/assets/rand_image_1.jpg";
import RandImage2 from "@/assets/rand_image_2.jpg";

export default function IndexPage() {
  return (
    <div className="page">
      <main className="page d-flex flex-wrap-reverse justify-content-center align-items-center gap-5">
        <div style={{ maxWidth: 300 }}>
          <h1>Tobsmg</h1>
          <p>Upload images to a Tobsmg server or view the images you have.</p>
          <div className="d-flex gap-2 align-items-center">
            <Link to="/upload" className="btn btn-primary">
              UPLOAD
            </Link>
            <Link to="/images" className="btn btn-outline-warning">
              IMAGES
            </Link>
            <Link to="/sign-out" className="btn btn-outline-danger">
              SIGN OUT
            </Link>
          </div>
        </div>
        <div className="d-flex flex-column">
          <img src={RandImage1} style={{ maxWidth: 300, rotate: "2deg" }} />
          <img src={RandImage2} style={{ maxWidth: 300, rotate: "-2deg" }} />
        </div>
      </main>
    </div>
  );
}
