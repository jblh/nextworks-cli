import React from "react";
import { BlocksAppProviders } from "../providers/BlocksAppProviders";
import { getInitialThemeFromCookies } from "../server/theme-vars";

export default async function AppProviders({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { variant, styleTag } = await getInitialThemeFromCookies();

  return (
    <>
      {styleTag}
      <div className="antialiased">
        <BlocksAppProviders defaultThemeVariant={variant}>
          {children}
        </BlocksAppProviders>
      </div>
    </>
  );
}
