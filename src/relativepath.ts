import { join } from "@std/path/join"
import { relative } from "@std/path/relative"
import { dirname } from "@std/path/dirname"

/**
 * Return the relative path to the .git/annex directory from a repo relative path
 *
 * Used for symlink path creation
 */
export function annexRelativePath(path: string) {
  return relative(dirname(join("/", path)), "/")
}
