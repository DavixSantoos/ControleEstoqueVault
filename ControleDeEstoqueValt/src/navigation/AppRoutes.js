
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddEditProductScreen from '../screens/AddEditProductScreen';
import colors from '../styles/colors';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: colors.cardBackground },
                headerTintColor: colors.text,
                headerTitleStyle: { fontWeight: 'bold' },
                contentStyle: { backgroundColor: colors.background }
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: '📦 Controle de Estoque' }}
            />
            <Stack.Screen
                name="AddEditProduct"
                component={AddEditProductScreen}
                options={{ title: 'Produto' }}
            />
        </Stack.Navigator>
    );
}