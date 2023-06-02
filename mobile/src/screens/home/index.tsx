import { View, Image, FlatList } from "react-native";

import logoImg from "../../assets/logo-nlw-esports.png";

import { styles } from "./styles";
import { Heading } from "../../components/heading";
import { GameCard, GameCardProps } from "../../components/gameCard";
import { useEffect, useState } from "react";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  useEffect(() => {
    fetch("http://192.168.0.113:3333/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);
  return (
    <View style={styles.container}>
      <Image source={logoImg} style={styles.logo}></Image>
      <Heading
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      />
      <FlatList
        data={games}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GameCard data={item} />}
      ></FlatList>
    </View>
  );
}
