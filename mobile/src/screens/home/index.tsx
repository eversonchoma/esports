import { View, Image, FlatList } from "react-native";

import logoImg from "../../assets/logo-nlw-esports.png";

import { styles } from "./styles";
import { Heading } from "../../components/heading";
import { GameCard } from "../../components/gameCard";
import { GAMES } from "../../utils/games";

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={logoImg} style={styles.logo}></Image>
      <Heading
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      />
      <FlatList 
        data={GAMES} 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
        keyExtractor={item => item.id} 
        renderItem={({item}) => (
          <GameCard data={item} />
        )} >
      </FlatList>
    </View>
  );
}
