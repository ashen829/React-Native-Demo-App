import React from 'react'
import { Button, Text, View } from 'react-native'

const HomePage = ({navigation}) => {
    console.log('HomePage rendered!');
  return (
    <View>
        <Text>This is Homepage</Text>
        <Button
            title='Add Vehicle'
            onPress={()=>{
                navigation.navigate('Search Vehicle')
            }}   
        />
    </View>
  )
}

export default HomePage