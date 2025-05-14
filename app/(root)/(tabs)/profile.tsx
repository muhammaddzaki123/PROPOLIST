import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '@/constants/icons';
import images from '@/constants/images';

const SettingsItem = () => (
 <TouchableOpacity>
  <View className=''>
    <Image/>
  </View>
 </TouchableOpacity>
)

const Profile = () => {
  const handleLogout = async () => {};
  
  return (
    <SafeAreaView className=' h-full bg-white'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName='pb-32 px-7'
      >

        <View className='flex flex-row items-center justify-between mt-5'>
          <Text className='text-xl font-rubik-bold'>Profile</Text>
          <Image
          source={icons.bell}
          className='size-5'
          />
          </View>

          <View className=' flex-row justify-center flex mt-5'>
            <View className='flex flex-col items-center relative mt-5'>
            <Image
              source={images.profile}
              className='size-44 relative rounded-full'
              />
            <TouchableOpacity className='absolute bottom-11 right-2'>
              <Image
                source={icons.edit}
                className='size-9 '
                />
            </TouchableOpacity>
            <Text className='text-2xl font-rubik-bold mt2'>Dzaki | full stact Dev</Text>
          </View>
        </View>

        <View className='flex flex-col mt-10 '>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile