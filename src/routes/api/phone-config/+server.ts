import type { RequestHandler } from "@sveltejs/kit";
import type { PhoneConfigSchema } from "$lib/types";
import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { phoneConfigs } from "$lib/db/schema";

interface PhoneConfigRequest {
  values: Record<string, string>;
  editors: string[];
  variables: string[];
}

export const POST: RequestHandler = async ({ request }) => {
  const { values, editors, variables }: PhoneConfigRequest = await request.json();

  const phone_config: PhoneConfigSchema = {
    phone_model: values["phone-model"],
    phone_cfg_filename: values["phone-cfg-filename"],
    phone_cfg: values["phone-cfg"],
    additional_files: [],
    variables,
  };

  phone_config.additional_files = editors.map((editorId) => {
    return {
      filename: values[`${editorId}-id`],
      content: values[`${editorId}-code`],
    };
  });

  await db.insert(phoneConfigs).values(phone_config);

  return json({ success: true });
};

/* Model Schema 
{
  phone_model: "T-34W",
  phone_cfg_filename: "$mac.cfg",
  phone_cfg: <string>
  additional_files: [
    {
      filename: "$mac.boot"
      content: <string>
    },
    ...
  ],
  variables: ["$mac","$model", ...]
}
*/
