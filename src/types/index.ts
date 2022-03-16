export interface ClientConfig {
  linkToken: string; // Token used to verify consumers account.
  onSuccess: (publicToken: string) => void;
  onClose?: () => void;
  onLoad?: () => void;
}

export interface VesselConfig {
  onLoad?: () => void;
}

export interface Vessel {
  init: (options: VesselConfig) => void;
  open: () => void;
}

declare global {
  interface Window {
    Vessel: Vessel;
  }
}
