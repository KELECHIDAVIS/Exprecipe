import { Modal, Text , Button, SafeAreaView} from "react-native";
function RecipeInfoModal({recipeInfo, visible, setModalVisible}){ 
    return(
        <Modal visible ={visible} animationType='fade' >
            <SafeAreaView>
                <Button title = "Close" onPress = {() => setModalVisible(false)}/> 
                <Text>{JSON.stringify(recipeInfo)}</Text>
            </SafeAreaView>
        </Modal>
    )
}

export default RecipeInfoModal; 