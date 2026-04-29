/**
 * localStorage versioning utility
 * 
 * Automatically clears or migrates localStorage when the app version changes.
 * This prevents blank pages and broken UI when users revisit after deployments.
 */

// Get the current app version from package.json (injected at build time)
// Falls back to a timestamp-based version if not available
const APP_VERSION = import.meta.env.VITE_APP_VERSION || `${new Date().toISOString().split('T')[0]}`;
const STORAGE_VERSION_KEY = "__app_version__";

/**
 * Initialize storage versioning on app startup
 * Clears old localStorage if version has changed
 */
export function initializeStorageVersion() {
  try {
    const storedVersion = localStorage.getItem(STORAGE_VERSION_KEY);
    
    if (storedVersion !== APP_VERSION) {
      console.log(`[Storage] Version changed from ${storedVersion || 'unknown'} to ${APP_VERSION}. Clearing old state.`);
      
      // Clear all app-specific localStorage (keep only version key)
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && !key.startsWith("__")) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      // Update version
      localStorage.setItem(STORAGE_VERSION_KEY, APP_VERSION);
      
      console.log(`[Storage] Cleared ${keysToRemove.length} old storage entries. New version: ${APP_VERSION}`);
    }
  } catch (error) {
    console.error("[Storage] Failed to initialize storage version:", error);
  }
}

/**
 * Get the current app version
 */
export function getAppVersion(): string {
  return APP_VERSION;
}

/**
 * Check if this is the first time the user is visiting (no stored version)
 */
export function isFirstVisit(): boolean {
  return !localStorage.getItem(STORAGE_VERSION_KEY);
}
