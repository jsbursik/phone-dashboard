export interface AdditionalFiles {
  filename: string;
  content: string;
}

export interface PhoneConfigSchema {
  phone_model: string;
  phone_cfg_filename: string;
  phone_cfg: string;
  additional_files: AdditionalFiles[];
  variables: string[];
}
