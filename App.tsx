import React, {  useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Modal, Text, ImageBackground, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ProgressBar from "./src/CustomProgressBar";

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [openmodalVisible, setOpenmodalVisible] = useState(false);
  const [progess, setProgess] = useState(0);
  const [bgImage, setBgimage] = useState('');

  const openModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      setProgess(0)
    }, 3000);
  };

  const imageFunction = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={openmodalVisible}
        onRequestClose={() => {
          setOpenmodalVisible(false);
        }}
      >
        <TouchableWithoutFeedback style={styles.feedback} onPress={() => setOpenmodalVisible(false)}>
          <View style={styles.imageFuncView}>
            <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, borderWidth: 1, alignItems: 'center' }}>
              <TouchableOpacity onPress={pickImageFromGallery}>
                <Text style={styles.picText}>CHOOSE PIC FROM GALLERY</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={takeImageFromCamera}>
                <Text style={styles.picText}>OPEN CAMERA</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteImage}>
                <Text style={styles.picText}>REMOVE IMAGE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  const userModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ImageBackground style={styles.bgStyle}
              source={{ uri: bgImage ? bgImage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnyzOGZzI92UReZg9aeBpqVA-HZRrk1LSUhpgK5_dHVw&s' }}>
              <ProgressBar />
              <Text style={styles.backgroundText}>your story  2m</Text>
            </ImageBackground>
          </View>
        </View>
      </Modal>
    )
  }

  const deleteImage = () => {
    setSelectedImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfgJ0SYGF5qAueA_nbIYvUB58DCZ2KG-DkYA&usqp=CAU');
    setOpenmodalVisible(false)
  }

  const ImageFromGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      // setSelectedImage(image.path);
      setBgimage(image.path)
      setOpenmodalVisible(false)
    } catch (error) {
      console.log(error);
    }
  };


  const pickImageFromGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      setSelectedImage(image.path);
      setBgimage(image.path)
      setOpenmodalVisible(false)
    } catch (error) {
      console.log(error);
    }
  };

  const takeImageFromCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });

      setSelectedImage(image.path);
      setOpenmodalVisible(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.headerCont}>
        <Text style={styles.userProfileText}>User Profile</Text>
      </View>
      <View style={styles.container}>
        {modalVisible && userModal()}
        {openmodalVisible && imageFunction()}
        <View style={styles.imgCont}>
          <TouchableOpacity onLongPress={() => setOpenmodalVisible(true)} onPress={() => bgImage ? openModal() : null}>
            <Image
              style={[styles.imageContainer, { borderColor: bgImage ? 'orange' : 'grey' }]}
              source={{ uri: selectedImage ? selectedImage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfgJ0SYGF5qAueA_nbIYvUB58DCZ2KG-DkYA&usqp=CAU' }} />
          </TouchableOpacity >
          <TouchableOpacity style={{ bottom: 20, position: 'absolute', right: 4, borderWidth: 5, borderColor: bgImage ? 'orange' : 'grey', borderRadius: 50 }} onPress={() => ImageFromGallery()} >
            <Image style={styles.plusImg} source={{ uri: 'https://w7.pngwing.com/pngs/68/239/png-transparent-number-computer-icons-plus-miscellaneous-game-plus.png' }} />
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 30, alignItems: 'center' }}>
          <Text style={styles.bioText}>Ashish Yadav</Text>
          <Text style={styles.bioText}>ashishyadavrn9@gmail.com</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center'
  },
  imageContainer: {
    borderWidth: 5,
    height: 170,
    borderRadius: 100,
    width: 170,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%'
  },
  bgStyle: { height: '100%', width: '100%' },
  backgroundText: {
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
    paddingHorizontal: 15
  },
  feedback: { flex: 1, },
  imageFuncView: { position: 'absolute', bottom: 0, left: 0, right: 0 },
  picText: { fontWeight: 'bold', color: 'black' },
  safeAreaContainer: { flex: 1 },
  headerCont: { padding: 20 },
  userProfileText: { fontWeight: 'bold', fontSize: 22, color: 'black' },
  imgCont: { flexDirection: 'row' },
  bioText: { fontWeight: 'bold', fontSize: 22, color: 'black' },
  plusImg: { height: 30, width: 30, borderRadius: 20 }
});
