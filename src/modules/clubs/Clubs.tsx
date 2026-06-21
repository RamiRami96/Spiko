import { FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Club } from "@/shared/models/club.model";

import { ClubCard } from "./components/ClubCard";
import { SearchBar } from "./components/SearchBar";

export type ClubsProps = {
  clubs: Club[];
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onPressClub: (id: string) => void;
};

export function Clubs({ clubs, searchQuery, onSearchChange, onPressClub }: ClubsProps) {
  const { top } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={clubs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ClubCard club={item} onPress={() => onPressClub(item.id)} />}
        ListHeaderComponent={
          <View style={{ gap: 16, paddingBottom: 8 }}>
            <SearchBar value={searchQuery} onChangeText={onSearchChange} />
          </View>
        }
        ListEmptyComponent={
          <View className="items-center py-16 gap-2">
            <Text className="text-gray-400 text-base">No clubs found</Text>
            <Text className="text-gray-300 text-sm">Try a different search</Text>
          </View>
        }
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: top + 16, paddingBottom: 16, gap: 12 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
