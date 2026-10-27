import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ProductService } from '../services/ProductService';
import colors from '../styles/colors';

export default function HomeScreen({ navigation }) {
    const [products, setProducts] = useState([]);

    const carregarProdutos = async () => {
        try {
            const lista = await ProductService.listar();
            setProducts(lista);
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    };

    useFocusEffect(
        useCallback(() => {
            carregarProdutos();
        }, [])
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('AddEditProduct', { product: item })}
                    >
                        <View>
                            <Text style={styles.title}>{item.nome}</Text>
                            <Text style={styles.details}>{item.categoria} • R$ {item.preco.toFixed(2)}</Text>
                        </View>
                        <View style={styles.stockBadge}>
                            <Text style={styles.stockText}>{item.quantidade} {item.unidade}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Nenhum produto cadastrado no estoque.</Text>
                }
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddEditProduct')}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, padding: 16 },
    card: { backgroundColor: colors.cardBackground, padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
    title: { fontSize: 18, fontWeight: 'bold', color: colors.text },
    details: { color: colors.textSecondary, marginTop: 4, fontSize: 14 },
    stockBadge: { backgroundColor: colors.primary, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
    stockText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
    emptyText: { color: colors.textSecondary, textAlign: 'center', marginTop: 40 },
    fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: colors.primary, width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 5 },
    fabText: { color: colors.text, fontSize: 28, fontWeight: 'bold' }
});