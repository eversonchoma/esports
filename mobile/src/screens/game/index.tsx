import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { GameParams } from "../../@types/navigation";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Image, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/background";
import { Heading } from "../../components/heading";
import { DuoCard, DuoCardProps } from "../../components/duoCard";
import { THEME } from "../../theme";
import { styles } from "./styles";
import logoImg from "../../assets/logo-nlw-esports.png";

export function Game() {
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;
  const [duos, setDuos] = useState<DuoCardProps[]>([]);

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    fetch(`http://192.168.0.113:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => setDuos(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.containar}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            ></Entypo>
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.emptyView} />
        </View>
        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.banner}
          resizeMode="cover"
        />
        <Heading title={game.title} subtitle="Conecte-se e comece a jogar" />
        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          horizontal
          contentContainerStyle={[
            duos.length > 0 ? styles.contentList : styles.emptyListContent,
          ]}
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => {}} />
          )}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>
              Não existem anúncios publicados ainda!
            </Text>
          )}
        ></FlatList>
      </SafeAreaView>
    </Background>
  );
}
