import React, { useState, useEffect } from 'react'

import { StyleSheet, View, FlatList } from 'react-native'

import { Space, Background, ButtonItem } from 'components'
import { W } from 'cons'
import { navigate } from 'cons/navigation'

interface PlanItem {
  title: string
  key: string
}

const PlansScreen: React.FC = () => {
  const [plans, setPlans] = useState<PlanItem[]>([])

  useEffect(() => {
    const plansData = require('./plansList.json')
    setPlans(Object.values(plansData))
  }, [])

  const onPress = (key: string) => {
    navigate('PLAN_SCREEN', { key })
  }

  const renderItem = ({ item }: { item: PlanItem }) => {
    return (
      <View>
        <ButtonItem title={item.title} onPress={() => onPress(item.key)} />
        <Space height={20} />
      </View>
    )
  }

  return (
    <Background>
      <Space height={20} />
      <FlatList
        data={plans}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponentStyle={styles.headerStyle}
      />
    </Background>
  )
}

const styles = StyleSheet.create({
  headerStyle: {
    marginBottom: 50,
  },
  listContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    width: W,
  },
})

export { PlansScreen }
