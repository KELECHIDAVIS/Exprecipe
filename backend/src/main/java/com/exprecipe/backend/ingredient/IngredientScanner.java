package com.exprecipe.backend.ingredient;

import com.exprecipe.backend.user.UserRepo;
import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.generativeai.ContentMaker;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.google.cloud.vertexai.generativeai.PartMaker;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;

// Scans images and returns a comma separated list of detected ingredients
//For rn uses external api
public class IngredientScanner {

}
