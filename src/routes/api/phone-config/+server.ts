import type { RequestHandler } from "@sveltejs/kit";
import type { PhoneConfigSchema } from "$lib/types";
import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { phoneConfigs } from "$lib/db/schema";

interface PhoneConfigRequest {
  values: Record<string, string>;
  editors: string[];
  variables: string[];
  mainCfgIsModelSpecific: boolean;
  editorFlags: Record<string, { isModelSpecific: boolean; isBinary: boolean }>;
}

export const POST: RequestHandler = async ({ request }) => {
  const { values, editors, variables, mainCfgIsModelSpecific, editorFlags }: PhoneConfigRequest =
    await request.json();

  const phone_config: PhoneConfigSchema = {
    phone_model: values["phone-model"],
    phone_cfg_filename: values["phone-cfg-filename"],
    phone_cfg: values["phone-cfg"],
    phone_cfg_is_model_specific: mainCfgIsModelSpecific,
    additional_files: [],
    variables,
  };

  phone_config.additional_files = editors.map((editorId) => {
    const flags = editorFlags[editorId] || { isModelSpecific: false, isBinary: false };
    return {
      filename: values[`${editorId}-id`],
      content: values[`${editorId}-code`],
      is_model_specific: flags.isModelSpecific,
      is_binary: flags.isBinary,
    };
  });

  await db.insert(phoneConfigs).values(phone_config);
  return json({ success: true });
};
