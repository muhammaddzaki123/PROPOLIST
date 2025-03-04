import { Text, View ,Image, TouchableOpacity, FlatList} from "react-native";
import { Link,router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Card, FeaturedCard} from "@/components/Cards";
import Filters from "@/components/Filters";
import { useEffect } from "react";

//SrollView
//FlatList (for list of items)

export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={[1,2,3,4]}
        renderItem={({item})=>
        <Card/>}
       // keyExtractor={(item)= item.toString()}
        numColumns={2}
        columnWrapperClassName="flex gap-5 px-5"
        contentContainerClassName="pb-32"
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">
          <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center">
                <Image source={{ uri: "https://i.scdn.co/image/ab67616d00001e02cfeae645958e9248abff0710" }} className="size-12 relative rounded-full"/>
                <View className="flex flex-col items-start ml-2 justify-center">
                    <Text className="text-xs font-rubik text-black-100">hamsnida</Text>
                    <Text className="text-base font-rubik-medium text-black-300">Q</Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6"/>
          </View>
          <Search/>
          <View className="my-5">
            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold text-black-300 " >Featured</Text>
                <TouchableOpacity>
                  <Text className=" text-base font-rubik-bold text-primary-300">See All</Text>
                </TouchableOpacity>
            </View>

            </View>

            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold text-black-300 " >Our Recomendation</Text>
                <TouchableOpacity>
                  <Text className=" text-base font-rubik-bold text-primary-300">See All</Text>
                </TouchableOpacity>
            </View>

            <Filters/>
      </View>
        }/>
    </SafeAreaView>
  );
}
