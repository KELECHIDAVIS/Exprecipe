import { Modal, Text , Button, SafeAreaView, View} from "react-native";
import { useSelector } from 'react-redux'

function RecipeInfoModal({ visible, setModalVisible}){ 
    const {currentRecipe} = useSelector((state)=> state.ingredients)
    return(
        <Modal visible ={visible} animationType='fade' >
            <SafeAreaView >
                <View style={{padding:15, alignContent:'center'}}>
                    <Button title = "Close" onPress = {() => setModalVisible(false)}/> 
                    <Text>{currentRecipe.instructions}</Text>
                </View>
            </SafeAreaView>
        </Modal>
    )
}

export default RecipeInfoModal; 