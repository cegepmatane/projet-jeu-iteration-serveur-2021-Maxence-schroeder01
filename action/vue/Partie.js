var VUE = VUE || {};

VUE.partie = (function(){

    var module = {};

    var pagePartieContenu;
    var pageAccueil;
    var body;

    var canevas;
    var largeur;
    var hauteur;

    var arrierePlan;

    var joueurBoule1;
    var listeJoueurBoule;
    var groupeBouffeBoule;


    (function initialiser(){

        document.addEventListener("DOMContentLoaded", preparerVue);

    })();

    function preparerVue(evenement){

        pagePartieContenu = document.querySelector("#page-partie").innerHTML;
        body = document.querySelector("body");


    }

    module.afficher = function(
        nouvelleLargeur,
        nouvelleHauteur,
        listeJoueur,
        nouveauGroupeBouffeBoule,
        agirSurClic){

        body.innerHTML = pagePartieContenu;

        largeur = nouvelleLargeur;
        hauteur = nouvelleHauteur;

        canevas = SVG('canevas').size(largeur, hauteur);
        canevas.viewbox(0, 0, largeur, hauteur);


        arrierePlan = new ArrierePlan(canevas);
        arrierePlan.afficher();

        groupeBouffeBoule = [];
        afficherGroupeBouffeBoule(nouveauGroupeBouffeBoule);
        listeJoueurBoule = [];

        for(
          var indiceJoueur = 0;
          indiceJoueur < listeJoueur.length;
          indiceJoueur++)
        {
          listeJoueurBoule[indiceJoueur] = new JoueurBoule(canevas);
          listeJoueurBoule[indiceJoueur].afficher(
            listeJoueur[indiceJoueur].couleur,
            listeJoueur[indiceJoueur].pseudonyme,
            listeJoueur[indiceJoueur].diametre,
            listeJoueur[indiceJoueur].positionX,
            listeJoueur[indiceJoueur].positionY);
        }
        canevas.on('click', agirSurClic);

    }

    module.getJoueurBoulePosition = function(numeroJoueur){
      if(listeJoueurBoule[numeroJoueur])
          return listeJoueurBoule[numeroJoueur].getPosition();

      return null;
    }

    module.setJoueurBoulePosition = function(numeroJoueur,x,y){
      if(listeJoueurBoule[numeroJoueur])
          listeJoueurBoule[numeroJoueur].setPosition(x,y);
    }

    module.deplacerJoueurBoule = function(
        numeroJoueur,
        deplacementX,
        deplacementY)
    {
      if(listeJoueurBoule[numeroJoueur])
        listeJoueurBoule[numeroJoueur].deplacer(deplacementX, deplacementY);
    }
    module.cacherGroupeBouffeBoule = function(groupeBouffeBouleMange)
    {
      console.log("partie --> cacherGroupeBouffeBoule --> groupeBouffeBouleMange.length : ", groupeBouffeBouleMange.length);
      for(
        var indiceBoule = 0;
        indiceBoule < groupeBouffeBouleMange.length;
        indiceBoule++)
      {
        groupeBouffeBoule[groupeBouffeBouleMange[indiceBoule]].cacher();
        console.log ("partie --> cacherGroupeBouffeBoule : ", groupeBouffeBoule[groupeBouffeBouleMange[indiceBoule]]);
      }
    }

    function afficherGroupeBouffeBoule(nouveauGroupeBouffeBoule)
    {
      for(
        var indiceBoule = 0;
        indiceBoule < nouveauGroupeBouffeBoule.length;
        indiceBoule++)
      {
        var bouffeBoule = new BouffeBoule(canevas);
        groupeBouffeBoule[indiceBoule] = bouffeBoule;
        bouffeBoule.afficher(
          nouveauGroupeBouffeBoule[indiceBoule].x,
          nouveauGroupeBouffeBoule[indiceBoule].y);
      }

    }

    module.grossirJoueurBoule = function(numeroJoueur, diametre)
    {
      if(listeJoueurBoule[numeroJoueur])
          listeJoueurBoule[numeroJoueur].grossir(diametre);
    }

    return module;

})();
