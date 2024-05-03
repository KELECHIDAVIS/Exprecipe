import { Modal, Text , Button, SafeAreaView} from "react-native";
import { useSelector } from 'react-redux'

function RecipeInfoModal({ visible, setModalVisible}){ 
    const {currentRecipe} = useSelector((state)=> state.ingredients)
    return(
        <Modal visible ={visible} animationType='fade' >
            <SafeAreaView>
                <Button title = "Close" onPress = {() => setModalVisible(false)}/> 
                <Text>{JSON.stringify(currentRecipe)}</Text>
            </SafeAreaView>
        </Modal>
    )
}

export default RecipeInfoModal; 