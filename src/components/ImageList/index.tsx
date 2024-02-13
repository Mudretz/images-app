import {FC, useEffect} from 'react';
import {Image, View} from 'react-native';
import imagesStore from '../../store/imagesStore';

export const ImageList: FC = () => {
  const {getImages, images} = imagesStore;
  useEffect(() => {
    getImages();
  }, []);

  if (!images) return null;

  console.log(images, 'photos');

  return (
    <View
      style={{
        flex: 1,
      }}>
      {images.map(item => (
        <Image
          key={item.id}
          height={100}
          width={100}
          source={{
            uri: item.url,
          }}
        />
      ))}
    </View>
  );
};
