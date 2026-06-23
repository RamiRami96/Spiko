import { FlatList, RefreshControl, Text, View } from "react-native";

import { GradientButton } from "@/shared/components";
import { Club } from "@/shared/models/club.model";

import { ClubCard } from "./components/ClubCard";
import { SearchBar } from "./components/SearchBar";

export type ClubsProps = {
  clubs: Club[];
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onPressClub: (id: string) => void;
  onCreateClub: () => void;
  refreshing: boolean;
  onRefresh: () => void;
  top: number;
  bottom: number;
};

export function Clubs({ clubs, searchQuery, onSearchChange, onPressClub, onCreateClub, refreshing, onRefresh, top, bottom }: ClubsProps) {
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
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: top + 16,
          paddingBottom: bottom + 88,
          gap: 12,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
        }
      />

      <View
        style={{
          position: "absolute",
          bottom: bottom,
          left: 16,
          right: 16,
        }}
      >
        <GradientButton label="Create Club" onPress={onCreateClub} />
      </View>
    </View>
  );
}
