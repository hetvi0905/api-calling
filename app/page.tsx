import React from "react";
import Link from "next/link";
const page = () => {
  return (
    <Link
      href="library"
      className="text-blue-500 flex justify-center items-center mt-20"
    >
      go to library page
    </Link>
  );
};

export default page;
