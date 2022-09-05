import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ROUTE_NAMES from '../../router/routeNames';
import COLORS from '../../utiles/colors';
import {IMAGES} from '../../utiles/images';
import {normalize} from '../../utiles/dimensions';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function Chats({route}: any) {
  const navigation = useNavigation<any>();
  const {uid} = useSelector((store: any) => store.LoginReducer);
  const [user, setUser] = useState();
  const getUsersDetails = async () => {
    const querySnap = await firestore().collection('Users').get();
    const alluser: any = querySnap.docs.map(docSnap => docSnap.data());
    setUser(alluser);
  };
  useEffect(() => {
    getUsersDetails();
  }, []);

  const onrender = ({item}: any) => {
    console.log('itmem', item);

    return item.uid != uid ? (
      <TouchableOpacity
        style={styles.detailsView}
        onPress={() =>
          navigation.navigate(ROUTE_NAMES.CHAT_SCREEN, {
            Name: item?.name,
            Uid: item?.uid,
            status: item?.isActive,
            profileImage: item?.profileImage,
          })
        }>
        <View style={styles.profileImageView}>
          <Image
            style={{height: '100%', width: '100%'}}
            source={{uri: item.profileImage}}
          />
        </View>
        <View style={styles.userInfoView}>
          <Text style={styles.nameTextStyle}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    ) : null;
  };

  const itemSeparator = () => {
    return <View style={styles.separatorView} />;
  };
  return (
    <View style={styles.main}>
      <FlatList
        data={user}
        renderItem={onrender}
        keyExtractor={({item}) => item}
        ItemSeparatorComponent={itemSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemStyle: {
    padding: 10,
    borderBottomColor: COLORS.BLACK,
    borderRadius: 20,
    flexDirection: 'row',
    marginVertical: 6,
    marginBottom: normalize(900),
  },
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  textName: {
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: '600',
    left: 30,
    paddingVertical: 10,
    color: '#40394A',
  },
  profileImg: {
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: 'aqua',
  },
  detailsView: {
    padding: normalize(10),
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
  },
  profileImageView: {
    height: normalize(60),
    width: normalize(60),
    backgroundColor: 'green',
    borderRadius: normalize(30),
    overflow: 'hidden',
  },
  userInfoView: {
    padding: normalize(10),
  },
  nameTextStyle: {
    fontSize: normalize(18),
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  separatorView: {
    height: normalize(1),
    backgroundColor: COLORS.DARK_GREY,
    opacity: normalize(0.5),
    marginHorizontal: normalize(6),
  },
});
