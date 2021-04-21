(function(){

    var application = this;
    var pseudonyme;
    var vueAccueil;
    //var vuePartie;
    var vueFinPartie;
    var partie;
    var listeJoueurGagnantPerdant;

    (function initialiser(){

        vueAccueil = VUE.accueil;
        vueAccueil.nouveauPseudonymeObtenu = nouveauPseudonymeObtenu;
        vuePartie = VUE.partie;
        vueFinPartie = VUE.finPartie;
        partie = CONTROLEUR.partie;

        window.addEventListener("hashchange",naviguer);
        document.addEventListener("DOMContentLoaded", preparerApplication);

    })();

    function preparerApplication()
    {
        vueAccueil.afficher();
    }

    function nouveauPseudonymeObtenu(nouveauPseudonyme)
    {
        pseudonyme = nouveauPseudonyme;
        window.location = "#jouer";
    }

    function naviguer(evenement){

        var hash = window.location.hash;

        if(hash.match(/^#accueil/)){
            naviguerVueAccueil();
        }else if(hash.match(/^#jouer/)){
            naviguerVuePartie();
        }else if(hash.match(/^#fin-partie/)){
            naviguerVueFinPartie(listeJoueurGagnantPerdant);
        }

    }

    function naviguerVueAccueil()
    {
        vueAccueil.afficher();
    }

  function naviguerVuePartie()
  {
      partie.preparerJeu(pseudonyme, appliquerFinPartie);
  }

   function naviguerVueFinPartie(gagnee)
   {
        vueFinPartie.afficher(gagnee);
   }
   function appliquerFinPartie(listeJoueur)
   {
     listeJoueurGagnantPerdant = listeJoueur;
     window.location = "#fin-partie";
   }

})();


/*
var jeu = new Jeu();
jeu.demarrer();
*/
