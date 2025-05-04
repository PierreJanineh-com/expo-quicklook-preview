import ExpoQuicklookPreview from "expo-quicklook-preview";
import {
  Button,
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle
} from "react-native";
import { useState } from "react";

const ACCENT_COLOR = "#0096FF";
const UNSUPPORTED_WARN_TEXT = "Warning: Quicklook Preview is not implemented for this platform currently.";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={textStyles.header}>Examples</Text>
      {Platform.OS !== "ios" && <Text style={textStyles.subheader}>{UNSUPPORTED_WARN_TEXT}</Text>}
      <ScrollView style={styles.container}>
        <Example
          name="Enter a File URL to preview"
          autoFocus
        />
        <Example
          name="Single page PDF"
          fileName="Single Page PDF.pdf"
          initialUrl="https://pdfobject.com/pdf/sample.pdf"
        />
        <Example
          name="Multi-page PDF"
          fileName="Multi-Page PDF.pdf"
          initialUrl="https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
        />
        <Example
          name="Landscape Photo"
          fileName="Landscape Photo.jpg"
          initialUrl="https://pierrejanineh.com/galleryImages/Food-IMG_1515-4-1920w.jpg"
        />
        <Example
          name="Portrait Photo"
          fileName="Portrait Photo.jpg"
          initialUrl="https://pierrejanineh.com/galleryImages/Outside-IMG_1927-29-1920w.jpg"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function Example(props: { initialUrl?: string, name: string, autoFocus?: boolean, fileName?: string }) {
  const [url, setUrl] = useState(props.initialUrl ?? "")
  const isUrlValid = url.startsWith("https://")
  const openPDF = async () => {
    await ExpoQuicklookPreview?.preview({ url: url, fileName: props.fileName });
    Keyboard.dismiss()
  }

  const [isFocused, setIsFocused] = useState(false);

  return (
    <Group name={props.name}>
      <View style={[styles.inputContainer, isFocused && { boxShadow: `0 0 0 2px ${ACCENT_COLOR}` }]}>
        <TextInput
          autoFocus={props.autoFocus}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="https://..."
          value={url}
          style={styles.textInput}
          onChangeText={(text) => setUrl(text.toLowerCase())}
          keyboardType="url"
          selectTextOnFocus
          onSubmitEditing={openPDF}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="go"
          textContentType="URL"
        />
        {isUrlValid && <Button
            color="ACCENT_COLOR"
            title="Go"
            onPress={openPDF}
        />}
      </View>
    </Group>
  )
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={textStyles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const textStyles = {
  header: {
    fontSize: 24,
    fontWeight: 600,
    margin: 20,
    marginBottom: 0,
  },
  subheader: {
    margin: 20,
    marginBottom: 0,
    color: "#F66",
    fontWeight: 500,
    lineHeight: 20,
  },
  groupHeader: {
    fontSize: 14,
    marginBottom: 10,
  },
} satisfies Record<string, StyleProp<TextStyle>>;

const styles = {
  group: {
    margin: 20,
    marginBottom: 10,
    backgroundColor: "#fff",
    boxShadow: "0 3px 15px #ccc5",
    borderRadius: 20,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  inputContainer: {
    boxShadow: "0 0 0 1px #ccc",
    borderRadius: 20,
    flexDirection: "row",
    gap: 8,
    height: 40,
    paddingRight: 10,
  },
  textInput: {
    flex: 1,
    paddingLeft: 15
  },
} satisfies Record<string, StyleProp<ViewStyle>>;
