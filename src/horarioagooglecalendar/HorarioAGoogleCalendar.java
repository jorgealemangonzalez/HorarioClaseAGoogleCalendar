/**
 * Condiciones:
 * ventana abierta al maximo
 * carpeta llamada "horarios" en C:/
 * cualquier nombre de documento html
 * usar chrome o alomejor mozilla
 * idioma catalan
 */

package horarioagooglecalendar;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;

import org.jsoup.nodes.Document;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.store.DataStoreFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.calendar.CalendarScopes;
import com.google.api.services.calendar.model.Calendar;
import java.io.ByteArrayInputStream;
import java.io.Reader;
import java.io.StringReader;
import java.nio.charset.StandardCharsets;

/**
 *
 * @author jorge aleman gonzalez
 */
public class HorarioAGoogleCalendar {
	//////
	/**
	 * Be sure to specify the name of your application. If the application name is {@code null} or
	 * blank, the application will log a warning. Suggested format is "MyCompany-ProductName/1.0".
	 */
	private static final String APPLICATION_NAME = "Horario a Google Calendar";

	/** Directory to store user credentials. */
	private static final java.io.File DATA_STORE_DIR =
			new java.io.File(System.getProperty("user.home"), ".store/calendar_sample");

	/**
	 * Global instance of the {@link DataStoreFactory}. The best practice is to make it a single
	 * globally shared instance across your application.
	 */
	private static FileDataStoreFactory dataStoreFactory;

	/** Global instance of the HTTP transport. */
	private static HttpTransport httpTransport;

	/** Global instance of the JSON factory. */
	private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();

	private static com.google.api.services.calendar.Calendar client;
	//////
	
	/** Authorizes the installed application to access user's protected data. */
	private static Credential authorize() throws Exception {
		// load client secrets
		//GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY,
		//		new InputStreamReader(new FileInputStream(System.getProperty("user.dir")+"/client_secrets.json")));
                Reader secrets = (Reader) new StringReader("{\n" +
"	\"installed\":{\n" +
"		\"client_id\":\"261579083146-b5o4lb1rddgv2gvb9hmom0hi4nls4bt8.apps.googleusercontent.com\",\n" +
"		\"project_id\":\"stalwart-fx-144910\",\n" +
"		\"auth_uri\":\"https://accounts.google.com/o/oauth2/auth\",\n" +
"		\"token_uri\":\"https://accounts.google.com/o/oauth2/token\",\n" +
"		\"auth_provider_x509_cert_url\":\"https://www.googleapis.com/oauth2/v1/certs\",\n" +
"		\"client_secret\":\"Mi5m7bZfcH1UpPoKMCMpdYP0\",\n" +
"		\"redirect_uris\":[\"urn:ietf:wg:oauth:2.0:oob\",\"http://localhost\"]\n" +
"	}\n" +
"}");
                GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY,secrets);
	
                if (clientSecrets.getDetails().getClientId().startsWith("Enter")
				|| clientSecrets.getDetails().getClientSecret().startsWith("Enter ")) {
			System.out.println(
					"Enter Client ID and Secret from https://code.google.com/apis/console/?api=calendar "
							+ "into calendar-cmdline-sample/src/main/resources/client_secrets.json");
			System.exit(1);
		}
		// set up authorization code flow
		GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
				httpTransport, JSON_FACTORY, clientSecrets,
				Collections.singleton(CalendarScopes.CALENDAR)).setDataStoreFactory(dataStoreFactory)
				.build();
		// authorize
		return new AuthorizationCodeInstalledApp(flow, new LocalServerReceiver()).authorize("user");
	}

	/**
	 * @param args the command line arguments
	 */

	public static void main(String[] args) {
		System.out.println("Se van a cargar los documentos html y htm de la carpeta ./horarios ");
		ArrayList<Document> docs = HorarioAClase.cargarDocumentos();
		if(docs == null){
			System.out.println("Ha habido un error cargando los documentos");
			return;
		}
		System.out.println("Los documentos se han cargado correctamente");

		System.out.println("Extrayendo los datos de las clases...");
		ArrayList<Clase> clases = HorarioAClase.getClases(docs);
		if(clases == null){
			System.out.println("Ha habido un error extrayendo los datos de las clases");
			return;
		}
		//DEBUG
		/*
		int cont = 0;
		int contWrong = 0;
		for(Clase c : clases){
			cont++;
			c.print();
			if(c.diaInicio.after(new Date(2016-1900, 10, 0))||c.diaInicio.before(new Date(2016-1900, 8, 0))){
			//	c.print();
				contWrong++;
			}
		}
		System.out.println("\nDe "+cont+" clases, "+contWrong+" no son en 2016. Error: "+(double)contWrong/cont+"\n");
		*/
		//END_DEBUG

		System.out.println("Clases extraidas correctamente");
		
		//DEBUG
		//System.exit(1);
		//END_DEBUG
		
		try {
			System.out.println("Se intentará conectar a una cuenta de google");
			// initialize the transport
			httpTransport = GoogleNetHttpTransport.newTrustedTransport();
			// initialize the data store factory
			dataStoreFactory = new FileDataStoreFactory(DATA_STORE_DIR);
			// authorization
			Credential credential = authorize();
			// set up global Calendar instance
			client = new com.google.api.services.calendar.Calendar.Builder(
					httpTransport, JSON_FACTORY, credential).setApplicationName(APPLICATION_NAME).build();

			// run commands
			Calendar calendar = ClaseAGoogleCalendar.createCalendar(client,"HorarioUPF");
			if(calendar == null){
				System.exit(0);
			}
			System.out.println("Añadiendo clases al calendario...");
			ClaseAGoogleCalendar.addClases(client, calendar, clases);
			System.out.println("Clases añadidas con éxito");

		} catch (IOException e) {
			System.err.println(e.getMessage());
		} catch (Throwable t) {
			t.printStackTrace();
		}

	}
}
