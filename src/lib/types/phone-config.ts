export interface AdditionalFiles {
  filename: string;
  content: string;
  is_model_specific: boolean;
  is_binary: boolean;
}

export interface PhoneConfigSchema {
  id?: number;
  phone_model: string;
  phone_cfg_filename: string;
  phone_cfg: string;
  phone_cfg_is_model_specific: boolean;
  additional_files: AdditionalFiles[];
  variables: string[];
}

export interface GeneratedFile {
  filename: string;
  content: string; // base64 for binaries, plain text for configs
  is_binary: boolean;
}

export interface Phone {
  mac: string;
  model: string;
  location: string | null;
  generated_files: GeneratedFile[];
  custom_binaries: GeneratedFile[];
  variable_values: Record<string, string>;
}

export interface Location {
  id?: number;
  name: string;
}
