import { API_BASE_URL } from "@/constants/api"
import { useEffect, useState } from "react";
import { useLocalSearchParams } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native' 
import { styles } from '@/constants/style'

type Note={
    id: number;
    title: string;
    description: string;
    created_at: string;
    category: Category | null;
}

type Category={
    id: number;
    name: string;
}

export default function NoteDetail() {

    const { id } = useLocalSearchParams();
    const [note, setNote] = useState<Note>();
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editDesc, setEditDesc] = useState("");


    const EditNote = async () => {
        const response = await fetch(`${API_BASE_URL}${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: editTitle,
                description: editDesc
            })
        });
        const data = await response.json();
        setNote(data);
        setIsEditing(false);
    }

    const fetchNote = async () => {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}${id}/`)
        const data = await response.json()
        setNote(data);
        setEditTitle(data.title);
        setEditDesc(data.description);
        setLoading(false);
    };
    useEffect(() => {
        fetchNote()
    }, []);


    const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    };

    return (
    <View style={styles.container}>
        {isEditing ? (
            <TextInput 
                style={styles.input}
                value={editTitle}
                onChangeText={setEditTitle}
            />
        ) : (
            <Text style={styles.title}>{note?.title}</Text>
        )}

        {isEditing ? (
            <TextInput
                style={styles.input}
                value={editDesc}
                onChangeText={setEditDesc}
            />
        ) : (
            <Text style={styles.description}>{note?.description}</Text>
        )}

        <Text>{note?.category?.name}</Text>
        <Text style={styles.timestamp}>{formatDate(note?.created_at ?? '')}</Text>

        <TouchableOpacity 
            style={styles.addButton}
            onPress={() => isEditing ? EditNote() : setIsEditing(true)}
        >
            <Text style={styles.addButtonText}>{isEditing ? "Kaydet" : "Düzenle"}</Text>
        </TouchableOpacity>

        {isEditing && (
            <TouchableOpacity onPress={() => setIsEditing(false)} style={{marginTop:12, alignItems:'center'}}>
                <Text style={{color:'red'}}>İptal</Text>
            </TouchableOpacity>
        )}
    </View>
)
}

