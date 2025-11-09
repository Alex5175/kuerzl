import { Outlet, createRootRoute } from "@tanstack/react-router";
// import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
// import { TanStackDevtools } from "@tanstack/react-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen w-full relative">
        {/* Cotton Candy Sky Gradient */}
        <div
          className="absolute inset-0 z-0"
          style={{
            zIndex: -10,
            background: `linear-gradient(45deg, #FFB3D9 0%, #FFD1DC 20%, #FFF0F5 40%, #E6F3FF 60%, #D1E7FF 80%, #C7E9F1 100%)`,
          }}
        />
        {/* Your Content/Components */}
        <Outlet />
      </div>

      {/* <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      /> */}
    </>
  ),
});
