import { NativeModule, requireOptionalNativeModule } from "expo";

declare class ExpoQuicklookPreview extends NativeModule {
  preview(url: string): Promise<void>;
}

/**
 * ### Platform Compatibility
 * This module is [_currently_](https://github.com/PierreJanineh-com/expo-quicklook-preview/issues/2) only supported on iOS.
 *
 * On Android devices, this module will be `null`.
 *
 * @example
 * ```typescript
 * import ExpoQuicklookPreview from "expo-quicklook-preview";
 *
 * const url = "https://link-to-a-resource-file.jpg";
 * // Safe to call on any platform - will no-op on Android
 * await ExpoQuicklookPreview?.preview(url);
 * ```
 */

export default requireOptionalNativeModule<ExpoQuicklookPreview>(
  "ExpoQuicklookPreview",
);
