"use client";

import * as React from "react";
import { Check, Palette, Wrench } from "lucide-react";
import { useTheme } from "next-themes";
import { useThemeVariant } from "../components/enhanced-theme-provider";
import {
  themes,
  darkThemes,
  type ThemeVariant,
  type ThemeConfig,
} from "../lib/themes";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type ThemeSelectorProps = React.ComponentPropsWithoutRef<typeof Button> & {
  ariaLabel?: string;
  label?: string; // optional override for the visible text ("Theme")
};

export function ThemeSelector({
  ariaLabel = "Demo: Color theme",
  label = "Theme",
  className,
  ...buttonProps
}: ThemeSelectorProps) {
  const { theme, setTheme } = useTheme();
  const { themeVariant, setThemeVariant, setCustomBrandColors } =
    useThemeVariant();

  const isDark = theme === "dark";

  const [showCustom, setShowCustom] = React.useState(false);
  const [custom, setCustom] = React.useState<Partial<ThemeConfig["colors"]>>(
    {},
  );

  function openCustomDialog() {
    setCustom({});
    setShowCustom(true);
  }

  function applyCustom() {
    setCustomBrandColors(custom);
    document.cookie = `theme-variant=custom; Path=/; Max-Age=31536000; SameSite=Lax`;
    document.cookie = `theme-custom=${encodeURIComponent(JSON.stringify(custom))}; Path=/; Max-Age=31536000; SameSite=Lax`;
    setShowCustom(false);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`gap-2 ${className ?? ""}`}
          aria-label={ariaLabel}
          {...buttonProps}
        >
          <Palette className="h-4 w-4" />
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="space-y-1">
          <div className="flex items-center justify-between">
            <span>Color theme variants</span>
            <span
              aria-hidden="true"
              className="border-border bg-muted/50 text-muted-foreground rounded-md border px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase"
            >
              Gallery
            </span>
          </div>
          <p className="text-muted-foreground text-xs">
            Affects this preview only ( button is not part of the shared Navbar.
            )
          </p>
        </DropdownMenuLabel>
        {/* <DropdownMenuLabel>
          Color theme variants — gallery only
        </DropdownMenuLabel> */}
        {/* <DropdownMenuLabel>Theme preview controls</DropdownMenuLabel> */}

        <DropdownMenuSeparator />
        {Object.entries(themes).map(([key, themeConfig]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => {
              setThemeVariant(key as ThemeVariant);
              document.cookie = `theme-variant=${key}; Path=/; Max-Age=31536000; SameSite=Lax`;
            }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded-full border"
                style={{
                  backgroundColor: isDark
                    ? darkThemes[key as ThemeVariant].colors.primary
                    : themeConfig.colors.primary,
                }}
              />
              {themeConfig.name}
            </div>
            {themeVariant === key && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Custom</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={openCustomDialog}
          className="flex items-center gap-2"
        >
          <Wrench className="h-4 w-4" />
          Customize brand colors…
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
      {showCustom && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="customBrandColorsTitle"
            className="bg-popover text-popover-foreground w-full max-w-md rounded-md border p-4 shadow-lg"
          >
            <div
              id="customBrandColorsTitle"
              className="mb-3 text-sm font-semibold"
            >
              Custom brand colors
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <label className="w-28 text-sm">primary</label>
                <input
                  type="text"
                  placeholder="oklch(...) or #hex"
                  className="bg-background flex-1 rounded border p-2 text-sm"
                  value={custom.primary ?? ""}
                  onChange={(e) =>
                    setCustom((c) => ({ ...c, primary: e.target.value }))
                  }
                />
                <input
                  type="color"
                  className="h-8 w-10 cursor-pointer"
                  value={
                    typeof custom.primary === "string" &&
                    custom.primary.startsWith("#")
                      ? (custom.primary as string)
                      : "#000000"
                  }
                  onChange={(e) =>
                    setCustom((c) => ({ ...c, primary: e.target.value }))
                  }
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="w-28 text-sm">accent</label>
                <input
                  type="text"
                  placeholder="oklch(...) or #hex"
                  className="bg-background flex-1 rounded border p-2 text-sm"
                  value={custom.accent ?? ""}
                  onChange={(e) =>
                    setCustom((c) => ({ ...c, accent: e.target.value }))
                  }
                />
                <input
                  type="color"
                  className="h-8 w-10 cursor-pointer"
                  value={
                    typeof custom.accent === "string" &&
                    custom.accent.startsWith("#")
                      ? (custom.accent as string)
                      : "#000000"
                  }
                  onChange={(e) =>
                    setCustom((c) => ({ ...c, accent: e.target.value }))
                  }
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="w-28 text-sm">ring</label>
                <input
                  type="text"
                  placeholder="oklch(...) or #hex"
                  className="bg-background flex-1 rounded border p-2 text-sm"
                  value={custom.ring ?? ""}
                  onChange={(e) =>
                    setCustom((c) => ({ ...c, ring: e.target.value }))
                  }
                />
                <input
                  type="color"
                  className="h-8 w-10 cursor-pointer"
                  value={
                    typeof custom.ring === "string" &&
                    custom.ring.startsWith("#")
                      ? (custom.ring as string)
                      : "#000000"
                  }
                  onChange={(e) =>
                    setCustom((c) => ({ ...c, ring: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCustom(false)}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={applyCustom}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </DropdownMenu>
  );
}
