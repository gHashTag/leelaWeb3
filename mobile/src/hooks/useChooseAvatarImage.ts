import { Buffer } from 'buffer'

import { useReactiveVar } from '@apollo/client'
import { NFT_STORAGE_API_KEY } from '@env'
import { captureException, secondary, white } from 'cons'
import ImagePicker from 'react-native-image-crop-picker'
import RNFetchBlob from 'rn-fetch-blob'
import { avatarVar, isLoadingAvatarVar } from 'store'

const getImagePicker = async () => {
  try {
    const image = await ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      sortOrder: 'none',
      compressImageMaxWidth: 400,
      compressImageMaxHeight: 400,
      compressImageQuality: 1,
      compressVideoPreset: 'HighestQuality',
      includeExif: true,
      cropperStatusBarColor: white,
      cropperToolbarColor: white,
      cropperActiveWidgetColor: white,
      cropperToolbarWidgetColor: secondary,
    })
    return image
  } catch (error: any) {
    throw new Error('Error selecting image: ' + error.message)
  }
}

export const useChooseAvatarImage = () => {
  const avatar = useReactiveVar(avatarVar)
  const isLoading = useReactiveVar(isLoadingAvatarVar)

  const chooseAvatarImage = async () => {
    try {
      isLoadingAvatarVar(true)

      const image = await getImagePicker()

      if (image) {
        const imageBytesInBase64: string = await RNFetchBlob.fs.readFile(
          image.path,
          'base64',
        )
        const bytes = Buffer.from(imageBytesInBase64, 'base64')

        const headers = {
          Accept: 'application/json',
          Authorization: `Bearer ${NFT_STORAGE_API_KEY}`,
        }
        const imageUpload = await fetch('https://api.nft.storage/upload', {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'image/jpg',
          },
          body: bytes,
        })

        if (imageUpload.ok) {
          const imageData = await imageUpload.json()
          const ipfsImageUrl = `https://ipfs.io/ipfs/${imageData.value.cid}`
          avatarVar(ipfsImageUrl)
        } else {
          captureException(
            imageUpload.statusText,
            'Error uploading image to IPFS:',
          )
        }
      } else {
        captureException('No image selected.', 'useChooseAvatarImage')
      }

      isLoadingAvatarVar(false)
    } catch (error) {
      captureException(error, 'Error selecting image or uploading to IPFS:')
      isLoadingAvatarVar(false)
    }
  }

  const setAvatar = (newAvatar: string) => {
    avatarVar(newAvatar)
  }

  return { avatar, setAvatar, isLoading, chooseAvatarImage }
}
