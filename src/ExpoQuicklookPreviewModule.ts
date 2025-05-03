import { NativeModule, requireNativeModule } from 'expo';

declare class ExpoQuicklookPreviewModule extends NativeModule {
  preview(url: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoQuicklookPreviewModule>('ExpoQuicklookPreview');
