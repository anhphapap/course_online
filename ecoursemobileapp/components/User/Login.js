import {Text, View } from "react-native";
import MyStyles from "../../styles/MyStyles";
import { Icon, TextInput, Button, HelperText } from "react-native-paper";
import { useState } from "react";
import Apis, { authApis, endpoints } from "../../configs/Apis";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const info = [{
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
  }
]
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

    setMsg(null);
    return true;
  }

  const login = async () => {
    if(validate()===true){
      try{
        setLoading(true);
        let res = await Apis.post(endpoints['login'], {
          ...user,
          client_id: "Vbe8euZZQJoWJ2UzW9wDThg4hJEZHHbhFmnfj7UR",
          client_secret: "cVm4w4hSdy4MtwbP4KuNgXkGPeQJ9yrQdBvXHGR6b3e97F2bYqQ81XJ49FEufzjcw4SKwpuOZQiCLsNelHY1MkuYTGBRcSqtWmSlebSUk27WfyDskCB2VeCQihnEKdZ2",
          grant_type: "password"
        })

        console.log(res.data.access_token);
        let u = await authApis(res.data.access_token).get(endpoints['current-user']);
        console.log(u.data)
        
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
      <Button disabled={loading} loading={loading} mode="contained" onPress={login}>Đăng nhập</Button>
    </View>
  );
};

export default Login;
