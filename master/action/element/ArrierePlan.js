var ArrierePlan = function(nouveauCanevas){
    var canevas;
    var couleur;
    (function initialiser(){
        canevas = nouveauCanevas;
        couleur = '#FF9F8B';
    })();

    this.afficher = function(){
        canevas.rect(canevas.width(), canevas.height()).attr({'fill-opacity': 0.0});
    }

};
