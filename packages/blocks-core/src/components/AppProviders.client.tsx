"use client";

import React from "react";
import { BlocksAppProviders } from "../providers/BlocksAppProviders";

export type AppProvidersClientProps = Readonly<{
  children: React.ReactNode;
}>;

/**
 * Client-safe AppProviders for Pages Router.
 *
 * Unlike the App Router server variant, this version does not read cookies
 * or inject server-rendered theme CSS.
 */
export default function AppProvidersClient({
  children,
}: AppProvidersClientProps) {
  return (
    <div className="antialiased">
      <BlocksAppProviders>{children}</BlocksAppProviders>
    </div>
  );
}
