import { FlatList, Text, View } from "react-native";

import { Club } from "@/shared/models/club.model";

import { ClubCard } from "./components/ClubCard";
import { SearchBar } from "./components/SearchBar";

export type ClubsProps = {
  clubs: Club[];
  searchQuery: string;
  onSearchChange: (text: string) => void;
};

export function Clubs({ clubs, searchQuery, onSearchChange }: ClubsProps) {
  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={clubs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ClubCard club={item} />}
        ListHeaderComponent={
          <View className="gap-4 pb-2">
            <Text className="text-2xl font-bold text-gray-900">Speaking Clubs</Text>
            <SearchBar value={searchQuery} onChangeText={onSearchChange} />
          </View>
        }
        ListEmptyComponent={
          <View className="items-center py-16 gap-2">
            <Text className="text-gray-400 text-base">No clubs found</Text>
            <Text className="text-gray-300 text-sm">Try a different search</Text>
          </View>
        }
        contentContainerClassName="px-4 pt-6 pb-4 gap-3"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
