package fr.icam.openbeerdb.servlets;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.github.jeromerocheteau.JdbcQueryServlet;

import fr.icam.openbeerdb.entities.Brewery;

public class BreweryPage extends JdbcQueryServlet<List<Brewery>> {

	private static final long serialVersionUID = 10L;
	
	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		List<Brewery> breweries = this.doProcess(request);
		this.doWrite(breweries, response.getWriter());
	}
	
	@Override
	protected void doFill(PreparedStatement statement, HttpServletRequest request) throws Exception {
		Integer offset = Integer.valueOf(request.getParameter("offset"));
		Integer length = Integer.valueOf(request.getParameter("length"));
		statement.setInt(1, offset);
		statement.setInt(2, length);
	}

	@Override
	protected List<Brewery> doMap(HttpServletRequest request, ResultSet resultSet) throws Exception {
		List<Brewery> breweries = new LinkedList<Brewery>();
		while (resultSet.next()) {
			String ID_capteur = resultSet.getString("ID_capteur");
			String Description = resultSet.getString("Description");
			Brewery brewery = new Brewery(ID_capteur,Description);
			breweries.add(brewery);
		}
		return breweries;
	}
	
}
