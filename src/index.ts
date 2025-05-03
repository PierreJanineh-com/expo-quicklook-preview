// Reexport the native module. On web, it will be resolved to ExpoQuicklookPreviewModule.web.ts
// and on native platforms to ExpoQuicklookPreviewModule.ts
export { default } from './ExpoQuicklookPreviewModule';
export { default as ExpoQuicklookPreviewView } from './ExpoQuicklookPreviewView';
export * from  './ExpoQuicklookPreview.types';
