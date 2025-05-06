# Expo QuickLook Preview

A native module for Expo that enables document preview using iOS’s `QLPreviewController`.

### Main Features:

- Preview PDF, DOCX, images, and more
- Native iOS QuickLook UI
- Supports local and remote URLs
- Full zoom and scroll gestures 

> This module is built using Expo Module API. It requires that you build a **custom development build** of your Expo app as it [does not include your native module.](https://docs.expo.dev/modules/module-api/)

### Getting Started
Add the package to your project:

```bash
<package-manager> add expo-quicklook-preview
# Tip: In npm v7+, `add` works just like `install`.
# Simply replace <package-manager> with your project's tool (npm, yarn, pnpm, bun)
```


Build your app for development:

```bash
npx expo run:ios
```

### Use in your project

```typescript jsx
import { preview } from "expo-quicklook-preview";

const previewImage = async () => {
    const fileURL = "https://pierrejanineh.com/galleryImages/Food-IMG_1515-4-1920w.jpg";
  
    try {
      await preview({
        url: fileURL,
        fileName: 'Faux Wine.jpg' // Optionally, pass a file name with an extension
      });
      // Handle user state, analytics, etc...
      
    } catch (e) {
      // Handle errors as needed (possible errors listed below).
    }
}
```

### Error handling


| **Cases**   | **Formatted message**                                                       |
|-------------|----------------------------------------------------------------------------------|
| Invalid URL | Invalid URL provided. Please ensure the URL is properly formatted and accessible. |
| Not A File  | The provided URL does not point to a valid file.                                 |


### Created by

| [Pierre Janineh](https://github.com/pierrejanineh-com)<br/>– | [Ophir Bucai](https://github.com/ophirbucai)<br />– |
|--------------------------------------------------------------|-----------------------------------------------------|

### License

Expo QuickLook Preview is [MIT licensed](./LICENSE).
