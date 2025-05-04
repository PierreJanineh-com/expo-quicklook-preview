import ExpoModulesCore
import QuickLook

public class ExpoQuicklookPreviewModule: Module, QLPreviewControllerDataSource {
  private var previewItemURL: URL?
  public func definition() -> ModuleDefinition {

    Name("ExpoQuicklookPreview")

    AsyncFunction("preview") { (urlString: String, fileName: String?) in
      guard let fileURL = URL(string: urlString),
        fileURL.isFileURL || fileURL.scheme?.starts(with: "http") == true
      else {
        throw PreviewError.invalidURL
      }
      let finalURL: URL
      if fileURL.isFileURL {
        finalURL = fileURL
      } else {
        let data = try Data(contentsOf: fileURL)
        let tempURL = FileManager.default.temporaryDirectory.appendingPathComponent(
          fileName ?? fileURL.lastPathComponent)
        try data.write(to: tempURL)
        finalURL = tempURL
      }

      previewItemURL = finalURL
      DispatchQueue.main.async {
        let previewController = QLPreviewController()
        previewController.dataSource = self

        guard
          let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
          let rootVC = windowScene.windows.first(where: { $0.isKeyWindow })?
            .rootViewController
        else {
          return
        }

        rootVC.present(previewController, animated: true)
      }
    }
  }

  public func numberOfPreviewItems(in controller: QLPreviewController) -> Int {
    return previewItemURL != nil ? 1 : 0
  }

  public func previewController(_ controller: QLPreviewController, previewItemAt index: Int)
    -> QLPreviewItem
  {
    return previewItemURL! as QLPreviewItem
  }

  enum PreviewError: Error {
    case invalidURL
  }
}
