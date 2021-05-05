var JoueurBoule = function(nouveauCanevas){
    var canevas;
    var couleur;
    var boule;
    var diametre;
    var pseudonyme;
    var texte;
    var couleurDynamique;

    (function initialiser(){
        canevas = nouveauCanevas;
    })();

    this.afficher = function(
        nouvelleCouleur,
        nouveauPseudonyme,
        nouveauDiametre,
        nouvellePositionX,
        nouvellePositionY){   
        couleur = nouvelleCouleur;
        pseudonyme = nouveauPseudonyme;
        diametre =  nouveauDiametre;
        boule = canevas.circle(diametre);
        boule.center(nouvellePositionX, nouvellePositionY).fill(couleur);
        texte = canevas.text(pseudonyme).attr({x:nouvellePositionX,y:nouvellePositionY});
        texte.font({size: 30, family: 'Helvetica'});

        couleurDynamique = new SVG.Color('#ff0066');
        couleurDynamique.morph('#00ff99');
    }

    this.deplacer = function(x, y){
        boule.dmove(x, y);
        texte.dmove(x, y);
        boule.fill(couleurDynamique.at(1/canevas.width()*boule.x()));
    }
    this.getPosition = function(){

        return [boule.cx(), boule.cy()];
    }

    this.setPosition = function(x, y){
        boule.cx(x);
        boule.cy(y);
        texte.cx(x);
        texte.cy(y);
    }

    this.cacher = function(){
        boule.hide();
    }
    this.grossir = function(diametre)
    {
        boule.radius(diametre/2);
        texte.text(pseudonyme + " " + diametre/2);
    }

};
