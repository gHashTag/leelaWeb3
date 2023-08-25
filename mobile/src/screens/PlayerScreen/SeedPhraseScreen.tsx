import React, { useEffect, useState } from 'react'

import Clipboard from '@react-native-clipboard/clipboard'
import { getAccountPhrase } from '@rly-network/mobile-sdk'
import { Space, Button, Background, Display } from 'components'
import { red } from 'cons'
import { useTranslation } from 'react-i18next'

const SeedPhraseScreen: React.FC = () => {
  const { t } = useTranslation()
  const [didConfirm, setDidConfirm] = useState(false)
  const [seed, setSeed] = useState<undefined | null | string>()

  useEffect(() => {
    const doAsyncWork = async () => {
      if (!didConfirm) {
        return
      }

      const tmpSeed = await getAccountPhrase()
      setSeed(tmpSeed)
    }
    doAsyncWork()
  }, [didConfirm])

  return (
    <Background isScrollView>
      <Space height={70} />

      {!didConfirm && (
        <>
          <Space height={50} />
          <Display title={t('neverDisclose')} />
        </>
      )}
      <Space height={50} />
      {!didConfirm && (
        <Button
          h={'h2'}
          title={t('iUnderstand')}
          onPress={() => {
            setDidConfirm(true)
          }}
        />
      )}

      {didConfirm && (
        <>
          {seed && <Display title={seed} height={160} />}
          <Space height={50} />
          <Button
            h={'h2'}
            title={t('copySeedPhrase')}
            onPress={async () => {
              Clipboard.setString(seed || '')
            }}
          />
        </>
      )}
      <Space height={50} />
      <Display onColor={red} title={t('educateUsers')} height={250} />
    </Background>
  )
}

export { SeedPhraseScreen }
