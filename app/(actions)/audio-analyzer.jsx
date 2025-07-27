import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AudioAnalyzer from "../../components/AudioAnalyzer";
import Navbar from "../../components/Navbar";
import TopBar from "../../components/TopBar";

const AudioAnalyzerScreen = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <TopBar />
    <View style={{ flex: 1 }}>
      <AudioAnalyzer />
    </View>
    <Navbar />
  </SafeAreaView>
);

export default AudioAnalyzerScreen; 