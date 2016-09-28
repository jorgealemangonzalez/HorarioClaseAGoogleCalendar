/**
 * Condiciones:
 * ventana abierta al maximo
 * carpeta llamada "horarios" en C:/
 * cualquier nombre de documento html
 * usar chrome o alomejor mozilla
 * idioma catalan
 */

package horarioagooglecalendar;

import java.util.ArrayList;
import org.jsoup.nodes.Document;

/**
 *
 * @author jorge aleman gonzalez
 */
public class HorarioAGoogleCalendar {
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
        System.out.println("Se van a cargar los documentos html de la carpeta C:\\horarios ");
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
        for(Clase c : clases) c.print();  
        //END_DEBUG
        
        System.out.println("Clases extraidas correctamente");
    }
}
