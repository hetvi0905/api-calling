import React from "react";
import { headers } from "next/headers";
import Content from "@/app/components/Content/Content";

const page = ({ params }: { params: { id: string } }) => {
  return <Content paramId={params.id} />;
};

export default page;
