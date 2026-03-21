import { API_BASE_URL } from "@/constants/api"
import { useEffect, useState } from "react";
import { useLocalSearchParams } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native' 
import { styles } from '@/constants/style'

type Note = {
    id: number;
    title: string;
    description : string;
    created_at: string;
    category: Category | null;
}

type Category = {
    id: number;
    name: string;
}


export default function CategoryDetails() {
    
    const [notes, setNotes] = useState<Note[]>();
    const { id } = useLocalSearchParams();


    const fetchNotes = async () => {
        const response = await fetch(`${API_BASE_URL}?category=${id}`);
        const data = await response.json();
        console.log("category: ", data)
        setNotes(data)
    };
    useEffect(() => {
        fetchNotes();
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={notes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => 
                    <View>
                        <Text>{item.title}</Text>
                    </View>
                }
            />
        </View>
    )
    
}