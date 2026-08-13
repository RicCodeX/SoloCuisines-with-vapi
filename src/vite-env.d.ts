/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VAPI_PUBLIC_KEY?: string;
  readonly VITE_VAPI_ASSISTANT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

declare module '*.webp' {
  const value: string;
  export default value;
}
