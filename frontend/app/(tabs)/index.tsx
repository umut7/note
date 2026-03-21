import { API_BASE_URL, CATEGORY_API_URL } from "@/constants/api";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert, Modal, ScrollView} from 'react-native'
import { styles, colors } from "@/constants/style"
import { useRouter } from 'expo-router';
import {Picker} from '@react-native-picker/picker';


type Note= {
  id: number;
  title: string;
  description: string;
  created_at: string;
  category: Category | null;
}

type Category= {
  id: number;
  name: string;
}

export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCatogeries] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  /**
   * CATEGORY
   */
  const fetchCategories = async () => {
    setLoading(true);
    const response = await fetch(CATEGORY_API_URL);
    const data = await response.json();
    console.log(data);
    setCatogeries(data);
    setLoading(false);
  
  };
  useEffect(() => {
    fetchCategories()
  }, []);


  /**
   * NOTES
   * -FETCH
   * -ADD
   * -DELETE
   */
  const fetchNotes = async () => {
    setLoading(true);
    const response = await fetch(API_BASE_URL);
    const data = await response.json();
    setNotes(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchNotes();
    fetchCategories();
  }, []);

  /**
   * ADD
   */
  const addNote = async () => {
    if (title.trim() === ''){
      Alert.alert("Lütfen başlık girin", "", [{
        text: 'Tamam'
      }])
      return
    }
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: description,
        category_id: selectedCategory
      })
    });
    const data = await response.json();
    setNotes([data, ...notes]);
    setTitle('');
    setDescription('');
    setModalVisible(false);
  }


  /**
   * DELETE
   */
  const deleteNote = async (id: number, title: string) => {
    Alert.alert(`${title} notu silinsin mi?`, "Bu işlem geri alınamaz", [{
      text:'İptal'
    },
    {
      text:'Tamam',
      onPress: async () => {
        await fetch(`${API_BASE_URL}${id}/`, {
          method: 'DELETE'
        });
        setNotes(notes.filter(note => note.id !== id))
      }
      
    }])
  }

  const router = useRouter()
  const goDetail =  (id:number) => {
      router.push(`/notes/${id}`);
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
          <TextInput style={styles.input} placeholderTextColor={colors.primary}
            value={title}
            onChangeText={(text) => setTitle(text)}
            placeholder='Yeni not ekle'
          />
          <TextInput style={styles.input} placeholderTextColor={colors.primary}
            value={description}
            onChangeText={(text) => setDescription(text)}
            placeholder="Açıklama"
          />
          <ScrollView>
            <View style={{height:150}}>
            {categories.map(cat => (
            <TouchableOpacity 
              key={cat.id}
              onPress={() => setSelectedCategory(cat.id)}
              style={{
                padding: 8,
                marginBottom: 4,
                borderRadius: 6,
                backgroundColor: selectedCategory === cat.id ? colors.primary : '#eee'
              }}
            >
              <Text style={{color: selectedCategory === cat.id ? '#fff' : '#333'}}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
          </View>
          </ScrollView>
          <TouchableOpacity onPress={addNote} style={styles.addButton}>
            <Text style={styles.addButtonText}>Ekle</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={{marginTop:12, alignItems:'center'}}>
            <Text style={{color:colors.danger}}>İptal</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </Modal>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) =>
          <View style={styles.noteCard}>
            <TouchableOpacity onPress={() => goDetail(item.id)}>
              <Text style={styles.notes}>{item.title}</Text>
            </TouchableOpacity>
            <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">{item.description}</Text>
            <View style={styles.bottom}>
              <Text>{item.category?.name}</Text>
              <TouchableOpacity onPress={() => deleteNote(item.id, item.title)}>
                <Text style={styles.delete}>Sil</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </View>
  )
}
