import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoQuicklookPreviewViewProps } from './ExpoQuicklookPreview.types';

const NativeView: React.ComponentType<ExpoQuicklookPreviewViewProps> =
  requireNativeView('ExpoQuicklookPreview');

export default function ExpoQuicklookPreviewView(props: ExpoQuicklookPreviewViewProps) {
  return <NativeView {...props} />;
}
