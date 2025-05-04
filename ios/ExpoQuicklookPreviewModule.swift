import ExpoModulesCore
import QuickLook

public class ExpoQuicklookPreviewModule: Module {
	private var previewItemURL: URL?

	public func definition() -> ModuleDefinition {
		Name("ExpoQuicklookPreview")

		AsyncFunction("preview") { (options: [String : String]) in
			let options = try PreviewOptions(options)

			try previewItemURL = options.fileURL

			DispatchQueue.main.async {
				let previewController = QLPreviewController()
				previewController.dataSource = self

				guard let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
					  let rootVC = windowScene.windows.first(where: { $0.isKeyWindow })?.rootViewController
				else { return }

				rootVC.present(previewController, animated: true)
			}
		}
	}
}

extension ExpoQuicklookPreviewModule: QLPreviewControllerDataSource {
	public func numberOfPreviewItems(
		in controller: QLPreviewController
	) -> Int {
		return previewItemURL != nil ? 1 : 0
	}

	public func previewController(
		_ controller: QLPreviewController,
		previewItemAt index: Int
	) -> QLPreviewItem {
		return previewItemURL! as QLPreviewItem
	}
}

enum PreviewError: Error {
	case invalidURL
}

struct PreviewOptions {
	let url: String
	let fileName: String?

	init(_ options: [String : String]) throws {
		guard let url = options["url"]
		else { throw PreviewError.invalidURL }
		self.url = url

		// Optional, no need for a guard
		fileName = options["fileName"]
	}

	public var fileURL: URL? {
		get throws {
			guard let fileURL = URL(string: url),
				  fileURL.isFileURL ||
					fileURL.scheme?.starts(with: "http") == true
			else { throw PreviewError.invalidURL }

			let finalURL: URL
			if fileURL.isFileURL {
				finalURL = fileURL
			} else {
				let data = try Data(contentsOf: fileURL)
				let tempURL = FileManager
					.default
					.temporaryDirectory
					.appendingPathComponent(fileName ?? fileURL.lastPathComponent)

				try data.write(to: tempURL)
				finalURL = tempURL
			}
			return finalURL
		}
	}
}
