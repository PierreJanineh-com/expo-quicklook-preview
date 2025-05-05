import { NativeModule, requireOptionalNativeModule } from "expo";

import type { PreviewOptions } from "./types";

declare class ExpoQuicklookPreviewModule extends NativeModule {
  preview(options: PreviewOptions): Promise<void>;
}

export default requireOptionalNativeModule<ExpoQuicklookPreviewModule>(
  "ExpoQuicklookPreview",
);
