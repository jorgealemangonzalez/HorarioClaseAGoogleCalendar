/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package horarioagooglecalendar;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Scanner;
import java.util.TimeZone;

import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.model.Calendar;
import com.google.api.services.calendar.model.CalendarList;
import com.google.api.services.calendar.model.CalendarListEntry;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventDateTime;
import com.google.api.services.calendar.model.Events;

/**
 *
 * @author miquel
 */
public class ClaseAGoogleCalendar {
	public static Calendar createCalendar(com.google.api.services.calendar.Calendar client, String name) throws IOException{
		CalendarList calendars = client.calendarList().list().execute();
		CalendarListEntry entry = searchCalendar(calendars, name);
		Calendar calendar;
		if(entry == null){
			calendar = new Calendar();

			calendar.setSummary(name);
			calendar = client.calendars().insert(calendar).execute();
			System.out.println("Creado calendario "+name);
		}else{
			System.out.println("Ya existe un calendario llamado "+name);
			System.out.println("Si se continua, se borrará el contenido de las semanas de las clases a cargar");
			System.out.println("Quieres continuar igualmente? (S/n)");
			Scanner in = new Scanner(System.in);
			String s = in.nextLine();
			in.close();
			if(s == "n"||s == "N") return null;
			calendar = client.calendars().get(entry.getId()).execute();
		}
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

	@SuppressWarnings("deprecation")
	public static void addClases(com.google.api.services.calendar.Calendar client, Calendar calendar, ArrayList<Clase> clases) throws IOException{
		//Eliminar clases de semanas a añadir
		HashSet<Date> mon = new HashSet<>();
		for(Clase c : clases){
			mon.add(c.lunesSemana);
		}
		Events events = client.events().list(calendar.getId()).execute();
		for(Event ev : events.getItems()){
			Event e = client.events().get(calendar.getId(), ev.getId()).execute();
			//System.out.println(e.getStart().toString().split("\":\"")[1].split("\"}")[0]);
			String s[] = e.getStart().toString().split("\":\"")[1].split("\"}")[0].replaceAll("[\\-':.+T]", " ").split(" ");
			Date start = new Date(Integer.parseInt(s[0])-1900, Integer.parseInt(s[1])-1, Integer.parseInt(s[2]));
			start.setHours(12);
			for(Date m : mon){
				Date nextm = (Date)m.clone();
				HorarioAClase.changeDay(nextm, 7);
				if(start.before(nextm)||start.after(m)){
					client.events().delete(calendar.getId(), e.getId()).execute();
					break;
				}
			}
		}

		//Añadir clases
		for(Clase c : clases){
			addClase(client,calendar,c);
		}
	}

	public static void addClase(com.google.api.services.calendar.Calendar client, Calendar calendar, Clase clase) throws IOException{

		Event event = new Event();
		event.setSummary(clase.titulo);
		event.setLocation(clase.descripcion);
		DateTime start = new DateTime(clase.diaInicio,TimeZone.getTimeZone("UTC"));
		event.setStart(new EventDateTime().setDateTime(start));
		DateTime end = new DateTime(clase.diaFin, TimeZone.getTimeZone("UTC"));
		event.setEnd(new EventDateTime().setDateTime(end));
		client.events().insert(calendar.getId(), event).execute();
	}
}
