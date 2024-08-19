import React from "react";
import Link from "next/link";
import UserLibrary from "@/app/components/UserLibrary/UserLibrary";
const page = () => {
  return (
    <div>
      <Link href="/library/content">
        <UserLibrary />
      </Link>
    </div>
  );
};

export default page;
