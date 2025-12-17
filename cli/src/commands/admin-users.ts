export async function addAdminUsers(): Promise<void> {
  console.log("Installing admin-users kit...");

  try {
    console.log("✓ admin-users kit will be available soon!");
    console.log("This kit will include user management admin panel.");
  } catch (error) {
    console.log("❌ Failed to install admin-users kit");
    throw error;
  }
}
