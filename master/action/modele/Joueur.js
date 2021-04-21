var MODELE = MODELE || {};

MODELE.Joueur = function(
  numeroJoueur,
  pseudonyme,
  couleur,
  diametre,
  positionX,
  positionY,
  destinationX,
  destinationY,
  velociteX,
  velociteY,
  distance){

    joueur = this;
  //  this.pointage;
    this.numeroJoueur;
    this.pseudonyme;
    this.couleur;
    this.diametre;
    this.positionX;
    this.positionY;
    this.destinationX;
    this.destinationY;
    this.velociteX;
    this.velociteY;
    this.distance;


    (function initialiser(){

        //joueur.pointage = pointage;
        //joueur.joueurActif = joueurActif;
        joueur.numeroJoueur = numeroJoueur;
        joueur.pseudonyme = pseudonyme;
        joueur.couleur = couleur;
        joueur.diametre = diametre;
        joueur.positionX = positionX;
        joueur.positionY = positionY;
        joueur.destinationX = destinationX;
        joueur.destinationY = destinationY;
        joueur.velociteX = velociteX;
        joueur.velociteY = velociteY;
        joueur.distance = distance;


    })();

}
