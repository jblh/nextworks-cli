export async function addAdminPosts(): Promise<void> {
  console.log("Installing admin-posts kit...");

  try {
    console.log("✓ admin-posts kit will be available soon!");
    console.log("This kit will include post management admin panel.");
  } catch (error) {
    console.log("❌ Failed to install admin-posts kit");
    throw error;
  }
}
