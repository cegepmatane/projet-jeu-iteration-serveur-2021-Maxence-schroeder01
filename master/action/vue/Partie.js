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

    var joueurBoulle1;
    var listeJoueurBoulle;
    var groupeBouffeBoulle;


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
        nouveauGroupeBouffeBoulle,
        agirSurClic){

        body.innerHTML = pagePartieContenu;

        largeur = nouvelleLargeur;
        hauteur = nouvelleHauteur;

        canevas = SVG('canevas').size(largeur, hauteur);
        canevas.viewbox(0, 0, largeur, hauteur);


        arrierePlan = new ArrierePlan(canevas);
        arrierePlan.afficher();

        groupeBouffeBoulle = [];
        afficherGroupeBouffeBoulle(nouveauGroupeBouffeBoulle);
        listeJoueurBoulle = [];

        for(
          var indiceJoueur = 0;
          indiceJoueur < listeJoueur.length;
          indiceJoueur++)
        {
          listeJoueurBoulle[indiceJoueur] = new JoueurBoulle(canevas);
          listeJoueurBoulle[indiceJoueur].afficher(
            listeJoueur[indiceJoueur].couleur,
            listeJoueur[indiceJoueur].pseudonyme,
            listeJoueur[indiceJoueur].diametre,
            listeJoueur[indiceJoueur].positionX,
            listeJoueur[indiceJoueur].positionY);
        }
        //joueurBoulle1 = new JoueurBoulle(canevas);
      /*joueurBoulle1.afficher(
          joueur1.couleur,
          joueur1.diametre,
          joueur1.positionX,
          joueur1.positionY,);*/

        canevas.on('click', agirSurClic);

    }

    module.getJoueurBoullePosition = function(numeroJoueur){
      if(listeJoueurBoulle[numeroJoueur])
          return listeJoueurBoulle[numeroJoueur].getPosition();

      return null;
    }

    module.setJoueurBoullePosition = function(numeroJoueur,x,y){
      if(listeJoueurBoulle[numeroJoueur])
          listeJoueurBoulle[numeroJoueur].setPosition(x,y);
    }

    module.deplacerJoueurBoulle = function(
        numeroJoueur,
        deplacementX,
        deplacementY)
    {
      if(listeJoueurBoulle[numeroJoueur])
        listeJoueurBoulle[numeroJoueur].deplacer(deplacementX, deplacementY);
    }
    module.cacherGroupeBouffeBoulle = function(groupeBouffeBoulleMange)
    {
      console.log("partie --> cacherGroupeBouffeBoulle --> groupeBouffeBoulleMange.length : ", groupeBouffeBoulleMange.length);
      for(
        var indiceBoulle = 0;
        indiceBoulle < groupeBouffeBoulleMange.length;
        indiceBoulle++)
      {
        groupeBouffeBoulle[groupeBouffeBoulleMange[indiceBoulle]].cacher();
        console.log ("partie --> cacherGroupeBouffeBoulle : ", groupeBouffeBoulle[groupeBouffeBoulleMange[indiceBoulle]]);
      }
    }

    function afficherGroupeBouffeBoulle(nouveauGroupeBouffeBoulle)
    {
      for(
        var indiceBoulle = 0;
        indiceBoulle < nouveauGroupeBouffeBoulle.length;
        indiceBoulle++)
      {
        var bouffeBoulle = new BouffeBoulle(canevas);
        groupeBouffeBoulle[indiceBoulle] = bouffeBoulle;
        bouffeBoulle.afficher(
          nouveauGroupeBouffeBoulle[indiceBoulle].x,
          nouveauGroupeBouffeBoulle[indiceBoulle].y);
      }

    }

    module.grossirJoueurBoulle = function(numeroJoueur, diametre)
    {
      if(listeJoueurBoulle[numeroJoueur])
          listeJoueurBoulle[numeroJoueur].grossir(diametre);
    }

    return module;

})();
