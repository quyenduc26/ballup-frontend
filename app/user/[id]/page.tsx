import React from "react";

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  return <div>User ID: {params.id}</div>;
}
