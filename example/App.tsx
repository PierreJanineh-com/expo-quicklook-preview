import { preview } from "expo-quicklook-preview";
import {
  ActivityIndicator,
  Keyboard,
  Platform,
  Pressable,
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
        <InputGroup
          label="Enter a File URL to preview"
          autoFocus
        />
        <InputGroup
          label="Single page PDF"
          fileName="Single Page PDF.pdf"
          initialUrl="https://pdfobject.com/pdf/sample.pdf"
        />
        <InputGroup
          label="Multi-page PDF"
          fileName="Multi-Page PDF.pdf"
          initialUrl="https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
        />
        <InputGroup
          label="Photo"
          fileName="Faux Wine.jpg"
          initialUrl="https://pierrejanineh.com/galleryImages/Food-IMG_1515-4-1920w.jpg"
        />
        <InputGroup
          label="Intentional Error"
          initialUrl="https://google.com"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

interface ExampleProps {
  label: string;
  fileName?: string;
  initialUrl?: string;
  autoFocus?: boolean;
}

function InputGroup({ label, fileName, initialUrl, autoFocus }: ExampleProps) {
  const [url, setUrl] = useState(initialUrl ?? "")
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null)

  const isUrlValid = url.startsWith("https://")

  const openPDF = async () => {
    try {
      if (loading) return;
      setError(null);
      setLoading(true);
      Keyboard.dismiss()
      await preview({ url, fileName });
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  }



  return (
    <Group label={label}>
      <View style={[styles.inputContainer, isFocused && { boxShadow: `0 0 0 2px ${ACCENT_COLOR}` }]}>
        <TextInput
          autoFocus={autoFocus}
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
        {isUrlValid && (
          <Pressable onPress={openPDF} style={{ margin: 'auto' }}>
            {({ pressed }) => (
              <Text style={[
                textStyles.goButton,
                pressed && { backgroundColor: `${ACCENT_COLOR}20` }
              ]}>
                {!loading ? "Go" : <ActivityIndicator size="small" color={ACCENT_COLOR}/>}
              </Text>
            )}

          </Pressable>
        )}
      </View>
      {error?.message && <Text style={textStyles.inputError}>{error.message}</Text>}
    </Group>
  )
}

interface GroupProps {
  label: string;
  children: React.ReactNode;
}

function Group({ label, children }: GroupProps) {
  return (
    <View style={styles.group}>
      <Text style={textStyles.groupHeader}>{label}</Text>
      {children}
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
  inputError: {
    color: "#F66",
    fontSize: 12,
    padding: 5,
    marginTop: 5,
  },
  goButton: {
    color: ACCENT_COLOR,
    fontSize: 16,
    padding: 5,
    borderRadius: 15
  }
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
