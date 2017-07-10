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

import fr.icam.openbeerdb.entities.Stats;

public class StatsLocal extends JdbcQueryServlet<List<Stats>> {

	private static final long serialVersionUID = 17L;
	
	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		List<Stats> dashboards = this.doProcess(request);
		this.doWrite(dashboards, response.getWriter());
	}
	
	@Override
	protected void doFill(PreparedStatement statement, HttpServletRequest request) throws Exception { }

	@Override
	protected List<Stats> doMap(HttpServletRequest request, ResultSet resultSet) throws Exception {
		List<Stats> dashboards = new LinkedList<Stats>();
		while (resultSet.next()) {
			String date = resultSet.getString("label");
			String valeur = resultSet.getString("valeur");
			String types = resultSet.getString("type");
			Stats dashboard = new Stats();
			dashboard.setLabels(date);
			dashboard.setData(valeur);
			dashboard.setSeries(types);
			dashboards.add(dashboard);
		}
		return dashboards;
	}
	
}
