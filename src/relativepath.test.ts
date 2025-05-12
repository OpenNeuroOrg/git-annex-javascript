import { assertEquals } from "@std/assert/equals"
import { join } from "@std/path/join"
import { annexRelativePath } from "./relativepath.ts"

Deno.test("annexRelativePath() returns appropriate paths", () => {
  assertEquals(
    annexRelativePath("sub-01/anat/sub-01_T1w.nii.gz"),
    join("..", ".."),
  )
})