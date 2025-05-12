/**
 * Export general purpose types used across git-annex utilities
 */

/**
 * Git annex supports many backends, we support a limited subset used by OpenNeuro (for now)
 * https://git-annex.branchable.com/backends/
 */
export type GitAnnexBackend = "GIT" | "SHA256" | "SHA256E" | "MD5" | "MD5E"
