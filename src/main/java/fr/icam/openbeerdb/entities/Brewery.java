package fr.icam.openbeerdb.entities;

public class Brewery {

	private String ID_capteur;
	
	private String Description;

	public String getID_capteur() {
		return ID_capteur;
	}

	public void setID_capteur(String iD_capteur) {
		ID_capteur = iD_capteur;
	}

	public String getDescription() {
		return Description;
	}

	public void setDescription(String description) {
		Description = description;
	}

	public Brewery(String ID_capteur, String Description) {
		super();
		this.ID_capteur = ID_capteur;
		this.Description = Description;
	}

	

	
	
}
