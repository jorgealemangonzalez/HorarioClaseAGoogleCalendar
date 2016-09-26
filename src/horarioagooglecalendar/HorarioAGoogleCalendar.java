/**
 * Condiciones:
 * ventana abierta al maximo
 * carpeta llamada "horarios" en C:/
 * cualquier nombre de documento html
 * usar chrome o alomejor mozilla
 * idioma catalan
 */

package horarioagooglecalendar;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.jsoup.*;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 *
 * @author jorge aleman gonzalez
 */
public class HorarioAGoogleCalendar {
    private static final int lateral = 62 ;
    private static final ArrayList<String> monthNames = new ArrayList<>(Arrays.asList("Gener","Febrer","Març", "Abril","Maig","Juny","Juliol","Agost", "Setembre","Octubre", "Novembre","Desembre"));
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
        System.out.println("Se van a cargar los documentos html de la carpeta C:\\horarios ");
        ArrayList<Document> docs = cargarDocumentos();
        if(docs == null){
            System.out.println("Ha habido un error cargando los documentos");
            return;
        }
        System.out.println("Los documentos se han cargado correctamente");
        
        System.out.println("Extrayendo los datos de las clases...");
        ArrayList<Clase> clases = getClases(docs);
        if(clases == null){
            System.out.println("Ha habido un error extrayendo los datos de las clases");
            return;
        }
        //DEBUG
        //for(Clase c : clases)
        //    c.print();
        //END_DEBUG
        
        System.out.println("Clases extraidas correctamente");
        
        
    }
    
    private static  ArrayList<Clase> getClases(ArrayList<Document> docs){
        ArrayList<Clase> clases = new ArrayList<>();
        //Magia de JSoup
        
        for(Document doc : docs){
            
            Element calendar = doc.body().getElementById("calendar");
            //Obtener el ancho de los dias para saber en que dia esta los eventos estan posicionados en relacion al ancho de la pantalla
            Element lunes = calendar.getElementsByTag("thead").first().getElementsByClass("fc-mon").first();
            String style = lunes.attr("style");
            //DEBUG 
            //System.out.println("Style : "+style);
            //END_DEBUG
            
            //El ancho de los dias es mas o menos el mismo para todos
            double widthMonday = (double)Integer.parseInt(style.replaceAll("[^0-9]",""));
            //DEBUG
            //    System.out.println(widthMonday);
            //END_DEBUG
            //Guardamos la fecha del lunes
            
            String[] startDate = doc.getElementsByClass("fc-header-title").first().text().split(" ");
            int startYear = Integer.parseInt(startDate[startDate.length-1]);
            int startMonth = monthNames.indexOf(startDate[1]);
            int startDay = Integer.parseInt(startDate[0]);
            
            Date date = new Date(startYear - 1900,startMonth , startDay );
            //DEBUG 2016 9 26
            //System.out.println("date : "+ (date.getYear()+1900) + " " + date.getMonth() + " " + date.getDate());
            //END_DEBUG
            
            //Obtener cada una de las clases
            Element eventosElemento = calendar.getElementsByClass("fc-event-container").first();
            Elements eventos = eventosElemento.getElementsByClass("fc-event");
            for(Element evento : eventos){
                Date diaInicio = (Date)date.clone();
                Date diaFin;
                String horaInicio ;
                String horaFin ;
                String titulo = null;
                String descripcion ;
                Clase clase ;
                
                style = evento.attr("style");
                String[] distances = style.split(";");
                int leftDist = Integer.parseInt(distances[2].replaceAll("[^0-9]",""));
                //Calculamos el dia gracias a la lejania del div con respecto al borde izquierdo ( left ) 
                int diaRelativo = (int)(((double)(leftDist-lateral))/widthMonday +0.5);
                changeDay(diaInicio,diaRelativo);
               
                //DEBUG
                //System.out.println(leftDist);
                //System.out.println("Dia : "+ (dia.getYear()+1900) + " " + dia.getMonth() + " " + dia.getDate());
                //END_DEBUG
                //Obtener horas de inicio y fin
                String[] intervalHora = evento.getElementsByClass("fc-event-time").first().text().split(" - ");
                horaInicio = intervalHora[0];
                horaFin = intervalHora[1];
                diaFin = (Date)diaInicio.clone();
                diaInicio.setHours(Integer.parseInt(horaInicio.split(":")[0]));
                diaInicio.setMinutes(Integer.parseInt(horaInicio.split(":")[1]));
                diaFin.setHours(Integer.parseInt(horaFin.split(":")[0]));
                diaFin.setMinutes(Integer.parseInt(horaFin.split(":")[1]));
                
                String tituloDesc = evento.getElementsByClass("fc-event-title").first().text();

                titulo = tituloDesc.substring(0,tituloDesc.indexOf("Grup")).replaceAll("[0-9-]", "");
                descripcion = tituloDesc.substring(tituloDesc.indexOf("Grup"));

                clase = new Clase(diaInicio,diaFin,titulo,descripcion);
                //DEBUG
                // clase.print();
                //END_DEBUG
                clases.add(clase);
            }
        }
        
        return clases;
                
    }
    
    /**
     * Añadir o quitar dias al date 
     */
    private static void changeDay(Date date , int numDays){
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DATE , numDays);
        date.setTime(cal.getTime().getTime());
    }
   
    /**
     * Comprueba si un input dado se encuentra cerca
     * del numero comp , dado un error err.
     * 
     */
    private boolean inRange(int input , int comp , int err){
        return (input < comp + err  && input > comp - err);
    }
    
    private static ArrayList<Document> cargarDocumentos(){
        ArrayList<Document> documentos = new ArrayList<>();
        
        ArrayList<String> rawHtmls = getRawHtmls();
        if(rawHtmls == null){
            System.out.println("Error al obtener los ficheros");
            return null;
        }
        
        for(String rawDoc : rawHtmls){
            Document doc = Jsoup.parse(rawDoc);
            if(doc == null){
                System.out.println("Error al parsear un documento por JSoup");
                continue;
            }
            documentos.add(doc);
        }
        return documentos;
    }
    
    private static ArrayList<String> getRawHtmls(){
        ArrayList<String> rawHtmls = new ArrayList<>();
        
        File docsFolder = new File("C:\\horarios");
        if(docsFolder == null){
            System.out.println("Error: la carpeta no existe");
            return null;
        }
        for(File doc : docsFolder.listFiles()){
            if(doc.getPath().endsWith(".html")){
                System.out.println("Cargando fichero"+ doc.getName());
                
                StringBuilder content = new StringBuilder();

                BufferedReader reader;
                try {
                    reader = new BufferedReader(new FileReader(doc));
                } catch (FileNotFoundException ex) {
                    Logger.getLogger(HorarioAGoogleCalendar.class.getName()).log(Level.SEVERE, null, ex);
                    System.out.println("Error al cargar el fichero "+ doc.getName());
                    continue;
                }

                String line;

                try {
                    while ((line = reader.readLine()) != null) {
                        content.append(line);
                    }
                } catch (IOException ex) {
                    Logger.getLogger(HorarioAGoogleCalendar.class.getName()).log(Level.SEVERE, null, ex);
                }
                
                //DEBUG
                //System.out.println(content);
                rawHtmls.add(content.toString());
            }
        }
        
        return rawHtmls;
    }
}
