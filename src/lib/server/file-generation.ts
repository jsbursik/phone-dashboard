import type { PhoneConfigSchema, GeneratedFile, AdditionalFiles } from "$lib/types";
import { env } from "$env/dynamic/private";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

/**
 * Substitutes variables in a string with values from the variableValues object
 * @param template - String containing variables like $mac, $vlan, etc.
 * @param variableValues - Object mapping variable names to values
 * @returns String with variables replaced
 */
export function substituteVariables(
  template: string,
  variableValues: Record<string, string>
): string {
  let result = template;
  for (const [key, value] of Object.entries(variableValues)) {
    // Replace all occurrences of $variable with the value
    const regex = new RegExp(`\\$${key}`, "g");
    result = result.replace(regex, value);
  }
  return result;
}

/**
 * Generates config files for a phone based on the model template
 * @param phoneConfig - The phone model configuration template
 * @param variableValues - Variable values specific to this phone (e.g., mac, vlan)
 * @param customBinaries - Optional custom binary files for this specific phone
 * @returns Array of generated files with content
 */
export function generatePhoneFiles(
  phoneConfig: PhoneConfigSchema,
  variableValues: Record<string, string>,
  customBinaries: File[] = []
): GeneratedFile[] {
  const generatedFiles: GeneratedFile[] = [];

  // Process main config file
  const mainFilename = phoneConfig.phone_cfg_is_model_specific
    ? phoneConfig.phone_cfg_filename
    : substituteVariables(phoneConfig.phone_cfg_filename, variableValues);

  const mainContent = phoneConfig.phone_cfg_is_model_specific
    ? phoneConfig.phone_cfg
    : substituteVariables(phoneConfig.phone_cfg, variableValues);

  generatedFiles.push({
    filename: mainFilename,
    content: mainContent,
    is_binary: false,
  });

  // Process additional files
  for (const file of phoneConfig.additional_files) {
    const filename = file.is_model_specific
      ? file.filename
      : substituteVariables(file.filename, variableValues);

    const content = file.is_model_specific || file.is_binary
      ? file.content
      : substituteVariables(file.content, variableValues);

    generatedFiles.push({
      filename,
      content,
      is_binary: file.is_binary,
    });
  }

  return generatedFiles;
}

/**
 * Writes generated files to disk in the TFTP root directory
 * @param files - Array of generated files to write
 * @throws Error if TFTP_ROOT is not configured or write fails
 */
export async function writeFilesToDisk(files: GeneratedFile[]): Promise<void> {
  const tftpRoot = env.TFTP_ROOT;
  if (!tftpRoot) {
    throw new Error("TFTP_ROOT environment variable is not configured");
  }

  // Ensure TFTP root directory exists
  await mkdir(tftpRoot, { recursive: true });

  // Write each file
  for (const file of files) {
    const filePath = join(tftpRoot, file.filename);

    if (file.is_binary) {
      // Decode base64 and write binary file
      const buffer = Buffer.from(file.content, "base64");
      await writeFile(filePath, buffer);
    } else {
      // Write text file
      await writeFile(filePath, file.content, "utf-8");
    }
  }
}

/**
 * Converts a File object to base64 string
 * @param file - File to convert
 * @returns Base64 encoded string
 */
export async function fileToBase64(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer.toString("base64");
}

/**
 * Deletes files from disk
 * @param filenames - Array of filenames to delete
 */
export async function deleteFilesFromDisk(filenames: string[]): Promise<void> {
  const tftpRoot = env.TFTP_ROOT;
  if (!tftpRoot) {
    throw new Error("TFTP_ROOT environment variable is not configured");
  }

  const { unlink } = await import("fs/promises");

  for (const filename of filenames) {
    const filePath = join(tftpRoot, filename);
    try {
      await unlink(filePath);
    } catch (error) {
      // Ignore errors if file doesn't exist
      console.warn(`Failed to delete file ${filePath}:`, error);
    }
  }
}
