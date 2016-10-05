/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package horarioagooglecalendar;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
//import java.util.Scanner;
import java.util.TimeZone;

import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.model.Calendar;
import com.google.api.services.calendar.model.CalendarList;
import com.google.api.services.calendar.model.CalendarListEntry;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventDateTime;

/**
 *
 * @author miquel
 */
public class ClaseAGoogleCalendar {
	static LinkedList<String> tituloClase ;
	public static Calendar createCalendar(com.google.api.services.calendar.Calendar client, String name) throws IOException{
		//CalendarList calendars = client.calendarList().list().execute();
		//CalendarListEntry entry = searchCalendar(calendars, name);
		Calendar calendar;
		//if(entry == null){
			calendar = new Calendar();

			calendar.setSummary(name);
			calendar = client.calendars().insert(calendar).execute();
			System.out.println("Creado calendario "+name);
		/*}else{
			System.out.println("Ya existe un calendario llamado "+name);
			System.out.println("Si se continua, pueden crearse eventos duplicados "+name);
			System.out.println("Quieres usarlo y continuar igualmente? (S/n)");
			Scanner in = new Scanner(System.in);
			String s = in.nextLine();
			in.close();
			if(s == "n"||s == "N") return null;
			calendar = client.calendars().get(entry.getId()).execute();
		}*/
		return calendar;
	}
	
	public static CalendarListEntry searchCalendar(CalendarList calendars, String name){
		for(CalendarListEntry entry : calendars.getItems()){
			if (entry.getSummary().equals(name)){
				return entry;
			}
		}
		return null;
	}
	
	public static void addClases(com.google.api.services.calendar.Calendar client, Calendar calendar, ArrayList<Clase> clases) throws IOException{
		for(Clase c : clases){
			addClase(client,calendar,c);
		}
	}
	
	public static void addClase(com.google.api.services.calendar.Calendar client, Calendar calendar, Clase clase) throws IOException{
		//Integer colorid = 1;
		//if(tituloClase.)//TODO buscar el titulo de la clase , si no lo encuentra insertarla , luego usar el id de la lista para ponerlo en colorid
		//{}
		
		Event event = new Event();
	    event.setSummary(clase.titulo);
	    event.setLocation(clase.descripcion);
	    DateTime start = new DateTime(clase.diaInicio,TimeZone.getTimeZone("UTC"));
	    event.setStart(new EventDateTime().setDateTime(start));
	    DateTime end = new DateTime(clase.diaFin, TimeZone.getTimeZone("UTC"));
	    event.setEnd(new EventDateTime().setDateTime(end));
	    //event.setColorId(colorid.toString());
		client.events().insert(calendar.getId(), event).execute();
	}
}
