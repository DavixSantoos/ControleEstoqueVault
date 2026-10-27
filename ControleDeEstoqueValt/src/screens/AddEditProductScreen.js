import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import Product from '../models/Product';
import { ProductService } from '../services/ProductService';
import colors from '../styles/colors';

export default function AddEditProductScreen({ route, navigation }) {
  const produtoExistente = route.params?.product;

  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [unidade, setUnidade] = useState('');

  useEffect(() => {
    if (produtoExistente) {
      setNome(produtoExistente.nome);
      setCategoria(produtoExistente.categoria || '');
      setPreco(produtoExistente.preco.toString());
      setQuantidade(produtoExistente.quantidade.toString());
      setUnidade(produtoExistente.unidade || '');
      navigation.setOptions({ title: 'Editar Produto' });
    } else {
      navigation.setOptions({ title: 'Novo Produto' });
    }
  }, [produtoExistente]);

  const handleSalvar = async () => {
    try {
      // Instancia o objeto aplicando a POO e regras de negócio da classe Product
      const product = new Product(
        produtoExistente ? produtoExistente.id : null,
        nome,
        categoria,
        preco,
        quantidade,
        unidade
      );

      if (produtoExistente) {
        await ProductService.atualizar(product);
        Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
      } else {
        await ProductService.adicionar(product);
        Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
      }

      navigation.goBack();
    } catch (error) {
      // Tratamento de exceções com try/catch exigido pela atividade
      Alert.alert('Erro de Validação', error.message);
    }
  };

  const handleExcluir = async () => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tens a certeza que pretendes remover este produto do stock?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await ProductService.excluir(produtoExistente.id);
              Alert.alert('Sucesso', 'Produto excluído com sucesso!');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Erro', error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nome do Produto</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Arroz 5kg"
        placeholderTextColor={colors.textSecondary}
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Categoria</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Alimentos"
        placeholderTextColor={colors.textSecondary}
        value={categoria}
        onChangeText={setCategoria}
      />

      <Text style={styles.label}>Preço Unitário (R$)</Text>
      <TextInput
        style={styles.input}
        placeholder="0.00"
        placeholderTextColor={colors.textSecondary}
        keyboardType="numeric"
        value={preco}
        onChangeText={setPreco}
      />

      <Text style={styles.label}>Quantidade em Stock</Text>
      <TextInput
        style={styles.input}
        placeholder="0"
        placeholderTextColor={colors.textSecondary}
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
      />

      <Text style={styles.label}>Unidade de Medida</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: un, kg, pct, lt"
        placeholderTextColor={colors.textSecondary}
        value={unidade}
        onChangeText={setUnidade}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
        <Text style={styles.saveButtonText}>Guardar Produto</Text>
      </TouchableOpacity>

      {produtoExistente && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleExcluir}>
          <Text style={styles.deleteButtonText}>Excluir Produto</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  label: { color: colors.text, fontSize: 14, fontWeight: 'bold', marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: colors.cardBackground, color: colors.text, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: colors.border, fontSize: 16 },
  saveButton: { backgroundColor: colors.primary, padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 24 },
  saveButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  deleteButton: { backgroundColor: colors.danger, padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 12, marginBottom: 40 },
  deleteButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});