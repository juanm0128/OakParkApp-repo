import React from 'react';
import { Image } from 'react-native';

const ImageViewer = ({ placeholderImageSource, selectedImage }) => {
    const imageSource = selectedImage  ? { uri: selectedImage } : placeholderImageSource;

    return (
        <Image source={imageSource} style={styles.image} />
    );
};

export { ImageViewer };