import { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import Apis, { endpoints } from "../../configs/Apis";
import { ActivityIndicator, Chip, List, Searchbar, Text } from "react-native-paper";
import MyStyles from "../../styles/MyStyles";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState();
    const [cateId, setCateId] = useState(null);
    const [page, setPage] = useState(1);
    const nav = useNavigation();

    const loadCate = async () => {
        let res = await Apis.get(endpoints.categories)
        setCategories(res.data)
    }

    const loadCourses = async () => {
        if(page > 0){
            try {
                setLoading(true);
                let url = `${endpoints.courses}?page=${page}`;
                if (searchQuery)
                    url += `&q=${searchQuery}`;
    
                if (cateId)
                    url += `&category_id=${cateId}`
    
                let res = await Apis.get(url);
                setCourses([...courses,...res.data.results]);
                if(res.data.next === null)
                    setPage(0);
            } catch (ex) {
                console.log(ex)
            } finally {
                setLoading(false);
            }
        }
    }

    const loadMore = () => {
        if(page > 0 && !loading)
            setPage(page+1);
    }

    useEffect(() => {
        loadCate();
    }, [])

    useEffect(() => {
        let timer = setTimeout(() => {
            loadCourses();
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, cateId, page])

    useEffect(() => {
        setPage(1);
        setCourses([]);
    }, [cateId, searchQuery])

    return (
        <View style={[MyStyles.container, MyStyles.mt, MyStyles.p]}>
            <Text style={MyStyles.subject}>Danh sách khóa học</Text>
            <View style={[MyStyles.row, MyStyles.wrap]}>
                <TouchableOpacity onPress={() => setCateId(null)}>
                    <Chip icon="label" style={MyStyles.m}>Tất cả</Chip>
                </TouchableOpacity>
                {categories.map((c) => (
                    <TouchableOpacity key={c.id} onPress={() => setCateId(c.id)}>
                        <Chip icon="label" style={MyStyles.m}>{c.name}</Chip>
                    </TouchableOpacity>
                ))}
            </View>

            <Searchbar
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
            <FlatList onEndReached={loadMore} ListFooterComponent={loading && <ActivityIndicator size={30} />} data={courses} renderItem={({ item }) => (<List.Item key={item.id} title={item.subject}
                description={item.created_date} left={() => (<TouchableOpacity onPress={nav.navigate('lesson', {'courseId':item.id})}><Image style={MyStyles.avatar} source={{ uri: item.image }} /></TouchableOpacity>)} />)} />

        </View>
    )
}

export default Home;