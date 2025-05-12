/**
 * Why are we using hash wasm over web crypto?
 * Web crypto cannot do streaming hashes of the common git-annex functions yet.
 */
import { createMD5 } from "hash-wasm"

/**
 * Reusable hash factories
 */
const computeHashMD5 = await createMD5()

/**
 * git-annex hashDirLower implementation based on https://git-annex.branchable.com/internals/hashing/
 * Compute the directory path from a git-annex filename
 */
export async function hashDirLower(
  annexKey: string,
): Promise<[string, string]> {
  computeHashMD5.init()
  computeHashMD5.update(annexKey)
  const digest = computeHashMD5.digest("hex")
  return [digest.slice(0, 3), digest.slice(3, 6)]
}

/**
 * git-annex hashDirMixed implementation based on https://git-annex.branchable.com/internals/hashing/
 */
export async function hashDirMixed(
  annexKey: string,
): Promise<[string, string]> {
  const computeHashMD5 = await createMD5()
  computeHashMD5.init()
  computeHashMD5.update(annexKey)
  const digest = computeHashMD5.digest("binary")
  const firstWord = new DataView(digest.buffer).getUint32(0, true)
  const nums = Array.from({ length: 4 }, (_, i) => (firstWord >> (6 * i)) & 31)
  const letters = nums.map(
    (num) => "0123456789zqjxkmvwgpfZQJXKMVWGPF".charAt(num),
  )
  return [`${letters[1]}${letters[0]}`, `${letters[3]}${letters[2]}`]
}
