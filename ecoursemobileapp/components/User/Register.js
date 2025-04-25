import { Image, Text, TouchableOpacity, View } from "react-native";
import MyStyles from "../../styles/MyStyles";
import { Icon, TextInput, Button, HelperText } from "react-native-paper";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import Apis, { endpoints } from "../../configs/Apis";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const info = [
    {
    label: "Tên",
    field: "first_name",
    secureTextEntry: false,
    icon: "text"
  },
    {
    label: "Họ",
    field: "last_name",
    secureTextEntry: false,
    icon: "text"
  },
    {
    label: "Tên đăng nhập",
    field: "username",
    secureTextEntry: false,
    icon: "account"
  },
    {
    label: "Mật khẩu",
    field: "password",
    secureTextEntry: true,
    icon: "eye"
  },
    {
    label: "Xác nhận mật khẩu",
    field: "confirm",
    secureTextEntry: true,
    icon: "eye"
  },
]
  const pickImage = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
        alert("Permissions denied!");
    } else {
        const result = await ImagePicker.launchImageLibraryAsync();

        if (!result.canceled)
            setState(result.assets[0], "avatar");
    }
  }
  const [user, setUser] = useState({});
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);
  const setState=(value, field) => setUser({...user,[field]:value });
  const nav = useNavigation();

  const validate = () => {
    if(Object.values(user).length === 0){
      setMsg("Vui long nhap du thong tin");
      return false;
    }

    for(let i of info){
      if(!user[i.field] || user[i.field].trim() === "" ){
        setMsg("Vui long nhap "+ i.label);
        return false;
      }
    }

    if(user.password !== user.confirm){
      setMsg("Mat khau k khop");
      return false;
    }

    setMsg(null);
    return true;
  }

  const register = async () => {
    if(validate()===true){
      try{
        setLoading(true);
        let form = new FormData();

        for(let key in user){
          if(key !== "confirm"){
            if(key === "avatar"  && user?.avatar !== null){
              form.append(key,  {
                uri: user.avatar.uri,
                name: user.avatar.fileName,
                type: user.avatar.type
            });
            }else{
              form.append(key, user[key]);
            }
          }
        }

        let res = await Apis.post(endpoints['register'], form, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        if(res.status === 201){
          nav.navigate("login");
        }
      }catch(ex){
        console.error(ex);
      }
      finally{
        setLoading(false);
      }
    }
  }

  return (
    <View>
       <HelperText type="error" visible={msg}>
        {msg}
      </HelperText>
      {info.map(i => <TextInput key={i.field} style={MyStyles.m} onChangeText={t => setState(t, i.field)} label={i.label} secureTextEntry={i.secureTextEntry} right={<TextInput.Icon icon={i.icon}/>}></TextInput>)}
      <TouchableOpacity style={MyStyles.m} onPress={pickImage}><Text>Thêm ảnh đại diện...</Text></TouchableOpacity>
      {user?.avatar && <Image style={[MyStyles.avatar, MyStyles.m]} source={{uri: user.avatar.uri}} />}
      <Button disabled={loading} loading={loading} mode="contained" onPress={register}>Đăng ký</Button>
    </View>
  );
};

export default Register;
