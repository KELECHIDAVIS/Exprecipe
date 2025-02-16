package com.exprecipe.backend;

import com.exprecipe.backend.ingredient.IngredientScanner;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.generativeai.ContentMaker;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.google.cloud.vertexai.generativeai.PartMaker;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);

		System.out.println("Application Started");

// TODO(developer): Replace these variables before running the sample.


        String output = null;
        try {
			GoogleCredentials creds = GoogleCredentials.getApplicationDefault();
			String projectId = creds.getQuotaProjectId();
			String location = "us-central1";
			String modelName = "gemini-1.5-flash-001";
            output = quickstart(projectId, location, modelName);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        System.out.println("Output: "+ output);
	}

	// Analyzes the provided Multimodal input.
	public static String quickstart(String projectId, String location, String modelName)
			throws IOException {
		// Initialize client that will be used to send requests. This client only needs
		// to be created once, and can be reused for multiple requests.
		try (VertexAI vertexAI = new VertexAI(projectId, location)) {
			String imageUri = "gs://generativeai-downloads/images/scones.jpg";

			GenerativeModel model = new GenerativeModel(modelName, vertexAI);
			GenerateContentResponse response = model.generateContent(ContentMaker.fromMultiModalData(
					PartMaker.fromMimeTypeAndData("image/png", imageUri),
					"Return all the ingredients you can detect in this image as a comma separated list."
			));

			return response.toString();
		}
	}

}
