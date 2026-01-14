export interface BlocksInstallOptions {
  sections?: boolean;
  templates?: boolean;
  gallery?: boolean;
}

export function resolveBlocksGroups(options: BlocksInstallOptions) {
  const groups: string[] = [];

  // Core is always included for now
  groups.push("core");

  if (options.sections) {
    groups.push("sections");
  }

  if (options.templates) {
    groups.push("templates");
  }

  if (options.gallery) {
    groups.push("gallery");
  }

  return groups;
}
