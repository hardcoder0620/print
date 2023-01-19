import {
  AppRegistry,
  Button,
  StyleSheet,
  NativeModules,
  Platform,
  Text,
  View,
  Image
} from 'react-native';
import React, { useState } from 'react'
import ImagePicker from 'react-native-nj-image-crop-picker';
import DocumentPicker, { DocumentPickerUtil } from 'react-native-document-picker'
import RNPrint from 'react-native-print';
import RNFS from 'react-native-fs';

export default function App() {

  const [imgUri, setImgUri] = useState('')

  async function PickImg() {
    console.warn('picked')
    let image
    ImagePicker.openPicker({
      cropping: true
    }).then(image => {
      console.warn(image.path);
      setImgUri(image.path)
      //  RNPrint.print({ filePath: image.path})
      sendPathImg(image.path)



    });


  }
  var rnpath = RNFS.DocumentDirectoryPath + '/test.txt';
  function sendPath(path) {
    RNFS.readFile(path, 'base64')
      .then((elem) => {
        // console.warn(elem)
        const imagePath = `${RNFS.TemporaryDirectoryPath}docs.pdf`;
        RNFS.writeFile(imagePath, elem, 'base64')
          .then(() => {console.warn('Image converted to jpg and saved at ' + imagePath)

          RNPrint.print({
            filePath: imagePath,
            type: 'pdf'
          });
        });

        // setImgUri(path)
        // console.warn("path", path)
        // // Print the file
        // printImg(path)

      })
      .catch((err) => console.error(err));
  }

  function sendPathImg(path) {
    RNFS.readFile(path, 'base64')
      .then((elem) => {
        // console.warn(elem)
        const imagePath = `${RNFS.TemporaryDirectoryPath}img.jpg`;
        RNFS.writeFile(imagePath, elem, 'base64')
          .then(() => {console.warn('Image converted to jpg and saved at ' + imagePath)

         console.warn("savedImgpath",imagePath)
          RNPrint.print({
            html: `<img   style = "width:100%"  src="https://media.istockphoto.com/id/1225517650/photo/single-big-oak-tree-in-meadow.jpg?s=612x612&w=is&k=20&c=50tUy8rezyP9MTGScoK0x1kHqVyNpnCeEe9mESjV9l4=" >`
          })
        });

        // setImgUri(path)
        // console.warn("path", path)
        // // Print the file
        // printImg(path)

      })
      .catch((err) => console.error(err));
  }

  function printImg(path) {
    RNPrint.print({
      filePath: path,
      type: 'image'
    });
  }

  async function pickDocs() {
    console.warn('document picker')
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf]
    })
    console.warn(res[0].uri)
    sendPath(res[0].uri)

    // RNPrint.print({
    //   filePath: res[0].uri,
    //   type: 'pdf'
    // });

    // printHTML(res[0].uri)
  }
  function printRemote() {
    RNPrint.print({
      filePath: 'http://digitalmotion.co.in/public/upload/documents/DIGITAL%20MOTION%20Interactive%20Flat%20Panel_v2225791657108398.pdf',
      type: 'pdf'
    });
  }

  async function printHTML(path) {
    await RNPrint.print({ filePath: 'content://com.android.providers.media.documents/document/document%3A82483' })
  }


  return (
    <View style={{ flex: 1, backgroundColor: 'skyblue', padding: 50 }} >
      <Button title='Pick image' onPress={PickImg} />
      <View style={styles.viewBtn} >
        <Button title='Pick Docuemnt' onPress={() => { pickDocs() }} />
      </View>
      <View style={styles.viewBtn} >
        <Button title='Pick remote Docuemnt' onPress={() => { printRemote() }} />
      </View>
      {imgUri ?
        <View style={{ marginTop: 40, borderWidth: 1, borderColor: 'black', padding: 20, alignItems: 'center' }}>
          <Image source={{ uri: imgUri }} style={{ height: undefined, aspectRatio: 1, width: '100%' }} resizeMode={'contain'} />
        </View>
        : null}
    </View>
    // import RNFS from 'react-native-fs';
    // import Print from 'react-native-print';

    // const tempFilePath = `${RNFS.TemporaryDirectoryPath}/temp.pdf`;

    // // Write data to the temporary file
    // RNFS.writeFile(tempFilePath, pdfData, 'base64')
    //   .then(() => {
    //     // Print the file
    //     Print.print({
    //       filePath: tempFilePath,
    //       type: 'pdf'
    //     });
    //   })
    //   .catch((err) => console.error(err));
  )
}

const styles = StyleSheet.create({
  viewBtn: {
    marginVertical: 20
  }
})