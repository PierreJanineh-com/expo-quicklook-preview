import { NativeModule, requireNativeModule } from 'expo';

import { ExpoQuicklookPreviewModuleEvents } from './ExpoQuicklookPreview.types';

declare class ExpoQuicklookPreviewModule extends NativeModule<ExpoQuicklookPreviewModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoQuicklookPreviewModule>('ExpoQuicklookPreview');
