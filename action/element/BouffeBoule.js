var BouffeBoule = function(nouveauCanevas){
    var canevas;
    var couleur;
    var boule;
    var diametre;
    var couleur;
    (function initialiser(){

        canevas = nouveauCanevas;
        couleur = "red";
        diametre = 10;

    })();
    this.afficher = function(positionBouleX, positionBouleY){
        boule = canevas.circle(diametre);
        boule.center(positionBouleX, positionBouleY).fill(couleur);
    }
    this.getPosition = function(){
        return [boule.cx(), boule.cy()];
    }
    this.setPosition = function(x, y){
        boule.cx(x);
        boule.cy(y);
    }
    this.cacher = function(){
      boule.hide();
    }
};
