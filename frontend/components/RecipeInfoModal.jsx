import { Modal, Text , Button} from "react-native";
function RecipeInfoModal({recipeInfo, visible, setModalVisible}){ 
    return(
        <Modal visible ={visible} animationType='fade' >
            <Button title = "Close" onPress = {() => setModalVisible(false)}/> 
            <Text>Modal</Text>
        </Modal>
    )
}

export default RecipeInfoModal; 