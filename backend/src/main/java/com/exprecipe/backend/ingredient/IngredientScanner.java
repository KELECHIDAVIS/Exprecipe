package com.exprecipe.backend.ingredient;

import com.exprecipe.backend.user.UserRepo;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.WriteChannel;
import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.generativeai.ContentMaker;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.google.cloud.vertexai.generativeai.PartMaker;
import org.springframework.beans.factory.annotation.Value;
import com.google.cloud.storage.*;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.nio.ByteBuffer;
import java.util.UUID;
import java.io.IOException;

// Scans images and returns a comma separated list of detected ingredients
//For rn uses external api
@Component
public class IngredientScanner {

}
