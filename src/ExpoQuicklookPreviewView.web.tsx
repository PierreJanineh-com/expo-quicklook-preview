import * as React from 'react';

import { ExpoQuicklookPreviewViewProps } from './ExpoQuicklookPreview.types';

export default function ExpoQuicklookPreviewView(props: ExpoQuicklookPreviewViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
