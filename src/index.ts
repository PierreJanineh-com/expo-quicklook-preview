import ExpoQuicklookPreview from "./ExpoQuicklookPreview";
import { PreviewOptions } from "./types";

/**
 * ##### Previews a file on iOS using Quicklook.
 *
 * **Platform Compatibility: ** This module is [_currently_](https://github.com/PierreJanineh-com/expo-quicklook-preview/issues/2) only works on iOS.
 * On Android devices, calling this function will do nothing.
 */
export async function preview(options: PreviewOptions) {
  if (!ExpoQuicklookPreview) {
    console.warn("ExpoQuicklookPreview is not available.");
    return;
  }
  return await ExpoQuicklookPreview.preview(options);
}

