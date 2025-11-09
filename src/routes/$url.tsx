import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$url")({
  loader: async ({ params }) => {
    const apiUrl = import.meta.env.API_URL || "https://api.kuerzl.link";
    const url = `${apiUrl}/${params.url}`;
    console.log(url);

    throw redirect({
      href: url,
    });
  },
  component: RouteComponent,
  pendingComponent: () => "is loading...",
});

function RouteComponent() {
  return <div>Hello "/$url"!</div>;
}
