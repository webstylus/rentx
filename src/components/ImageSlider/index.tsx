import React, { useRef, useState } from 'react'
import {
  Container,
  ImageIndexes,
  CarImageWrapper,
  CarImage
} from './styles'
import { FlatList, ViewToken } from 'react-native'
import {Bullet} from "../Bullet";

interface Props {
  imageUrl: {
      id: string
      photo: string
  }[]
}

interface ChangeImageProps {
  viewableItems: ViewToken[]
  changed: ViewToken[]
}

export function ImageSlider({ imageUrl }: Props) {
  const [imageIndex, setImageIndex] = useState(0)
  const indexChanged = useRef((info: ChangeImageProps) => {
      const index = info.viewableItems[0].index!
    setImageIndex(index)
  })

  return (
    <Container>
      <ImageIndexes>
        {imageUrl.map((item, index) => (
          <Bullet key={index} active={index === imageIndex} />
        ))}
      </ImageIndexes>

      <FlatList
        data={imageUrl}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item.photo }} resizeMode={'contain'} />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  )
}
