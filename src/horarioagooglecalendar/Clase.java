
package horarioagooglecalendar;

import java.util.Date;

/**
 *  
 * @author jorge aleman gonzalez
 */
public class Clase {
    Date diaInicio;
    Date diaFin;
    String horaFin;
    String titulo;
    String descripcion;
    
    
    public Clase(Date diaInicio , Date diaFin, String titulo ,String descripcion){
        this.descripcion = descripcion;
        this.diaInicio = diaInicio;
        this.diaFin = diaFin;
        this.titulo = titulo;
    }

    public void print(){
        System.out.println("\nClase : " + this.titulo);
        System.out.println(this.diaInicio + "------------" + this.diaFin  );
        System.out.println("Descripcion: "+this.descripcion+"\n");
    }
}
