import React from 'react'
import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage
} from './styles'

interface Props {
    imageUrls: string[]
}

export function ImageSlider({imageUrls}:Props) {
  return (
    <Container>
      <ImageIndexes>
        <ImageIndex active={true} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImageIndexes>

      <CarImageWrapper>
        <CarImage source={{ uri: imageUrls[0] }} resizeMode={'contain'} />
      </CarImageWrapper>
    </Container>
  )
}
