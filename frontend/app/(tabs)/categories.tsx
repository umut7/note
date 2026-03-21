import { Text, View, FlatList, TouchableOpacity, Modal, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from "react";
import { CATEGORY_API_URL } from '@/constants/api';
import { styles, colors } from '@/constants/style'
import { useRouter } from 'expo-router';

type Category = {
    id: number;
    name: string;
}

export default function CategoryScreen() {
    const [categories, setCatogeries] = useState<Category[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [Categoryname, setCategoryName] = useState("");
    

    const fetchCategories = async () => {
        const response = await fetch(CATEGORY_API_URL);
        const data = await response.json();
        setCatogeries(data);
    };
    useEffect(() => {
        fetchCategories()
      }, []);


    /**
     * ADD CATEGORY
     */
    const addCategory = async () => {
        if (Categoryname.trim() === ''){
              Alert.alert("Lütfen başlık girin", "", [{
                text: 'Tamam'
              }])
              return
        }
        const response = await fetch(CATEGORY_API_URL, {
            method: 'POST' ,
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                name: Categoryname
            })
        });
        const data = await response.json();
        console.log("post response", data)
        setCatogeries([data, ...categories]);
        setModalVisible(false);
        setCategoryName("");
    }


    /**
     * DELETE
     */
    const deleteCategory = async (id: number, name: string) => {
        Alert.alert(`${name} silinsin mi?`, "Bu işlem geri alınamaz", [{
            text: 'İptal'
        },
        {
            text: 'Tamam',
            onPress: async () => {
                await fetch(`${CATEGORY_API_URL}${id}/`, {
                    method: 'DELETE'
                });
                setCatogeries(categories.filter(category => category.id !== id))
            }
        }])
    }


    const router = useRouter()
    const goDetail= async (id: number) => {
      router.push(`/categories/${id}`);
    }

    return (

        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
                <Text style={styles.title}>Notes App</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={{fontSize:32, color:colors.primary}}>+</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={{flex:1, justifyContent:'center', padding:20, backgroundColor:'rgba(0,0,0,0.4)'}}>
                    <View style={{backgroundColor:'#fff', borderRadius:12, padding:20}}>
                        <TextInput style={styles.input}
                            value={Categoryname}
                            onChangeText={(text) => setCategoryName(text)}
                            placeholder='Yeni kategori ekle'
                        />
                        <TouchableOpacity onPress={addCategory} style={styles.addButton}>
                            <Text style={styles.addButtonText}>Ekle</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{marginTop:12, alignItems:'center'}}>
                            <Text style={{color:colors.danger}}>İptal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <FlatList                
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => 
                <View style={styles.noteCard}>
                    <TouchableOpacity onPress={() => goDetail(item.id)}>
                        <Text style={styles.notes}>{item.name}</Text>
                    </TouchableOpacity>
                    <View style={styles.bottom}>
                        <Text></Text>
                        <TouchableOpacity onPress={() => deleteCategory(item.id, item.name)}>
                        <Text style={styles.delete}>Sil</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            }
            
            />
        </View>
    )
}