import type { RequestHandler } from "@sveltejs/kit";
import type { GeneratedFile } from "$lib/types";
import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { phones, phoneConfigs } from "$lib/db/schema";
import { eq } from "drizzle-orm";
import { generatePhoneFiles, writeFilesToDisk, fileToBase64 } from "$lib/server/file-generation";
import { validateMacAddress } from "$lib/form-validation";

export const GET: RequestHandler = async () => {
  const allPhones = await db.select().from(phones);
  return json(allPhones);
};

export const POST: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const mac = formData.get("mac") as string;
  const model = formData.get("model") as string;
  const location = formData.get("location") as string | null;
  const variableValuesJson = formData.get("variable_values") as string;

  // Validate MAC address
  if (!mac || !validateMacAddress(mac)) {
    return json({ error: "Invalid MAC address format" }, { status: 400 });
  }

  // Validate model
  if (!model) {
    return json({ error: "Model is required" }, { status: 400 });
  }

  // Parse variable values
  let variableValues: Record<string, string>;
  try {
    variableValues = JSON.parse(variableValuesJson);
  } catch {
    return json({ error: "Invalid variable values format" }, { status: 400 });
  }

  // Don't automatically add MAC - user provides all variables in the form

  // Get phone config template
  const [phoneConfig] = await db
    .select()
    .from(phoneConfigs)
    .where(eq(phoneConfigs.phone_model, model));

  if (!phoneConfig) {
    return json({ error: "Phone model not found" }, { status: 404 });
  }

  // Generate files from template
  const generatedFiles = generatePhoneFiles(phoneConfig, variableValues);

  // Process custom binary uploads
  const customBinaries: GeneratedFile[] = [];
  const binaryFiles = formData.getAll("binaries") as File[];

  for (const file of binaryFiles) {
    if (file.size > 0) {
      const base64Content = await fileToBase64(file);
      customBinaries.push({
        filename: file.name,
        content: base64Content,
        is_binary: true,
      });
    }
  }

  // Combine generated files and custom binaries for disk write
  const allFiles = [...generatedFiles, ...customBinaries];

  // Write files to disk
  try {
    await writeFilesToDisk(allFiles);
  } catch (error) {
    console.error("Failed to write files to disk:", error);
    return json({ error: "Failed to write files to disk" }, { status: 500 });
  }

  // Save to database
  try {
    await db.insert(phones).values({
      mac,
      model,
      location: location || null,
      generated_files: generatedFiles,
      custom_binaries: customBinaries,
      variable_values: variableValues,
    });

    return json({ success: true, mac }, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return json({ error: "Failed to save phone to database" }, { status: 500 });
  }
};
