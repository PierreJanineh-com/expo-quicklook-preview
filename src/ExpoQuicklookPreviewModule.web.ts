import { registerWebModule, NativeModule } from 'expo';

import { ExpoQuicklookPreviewModuleEvents } from './ExpoQuicklookPreview.types';

class ExpoQuicklookPreviewModule extends NativeModule<ExpoQuicklookPreviewModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoQuicklookPreviewModule, 'ExpoQuicklookPreviewModule');
