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

public class StatsCapteur extends JdbcQueryServlet<List<Stats>> {

	private static final long serialVersionUID = 17L;
	
	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		List<Stats> dashboards = this.doProcess(request);
		this.doWrite(dashboards, response.getWriter());
	}
	
	@Override
	protected void doFill(PreparedStatement statement, HttpServletRequest request) throws Exception { 
		String name = request.getParameter("name");
		statement.setString(1, name);
	}

	@Override
	protected List<Stats> doMap(HttpServletRequest request, ResultSet resultSet) throws Exception {
		List<Stats> dashboards = new LinkedList<Stats>();
		while (resultSet.next()) {
			String label = resultSet.getString("label");
			String data = resultSet.getString("valeur");
			String series = resultSet.getString("type");
			Stats dashboard = new Stats();
			dashboard.setLabels(label);
			dashboard.setData(data);
			dashboard.setSeries(series);
			dashboards.add(dashboard);
		}
		return dashboards;
	}
	
}
