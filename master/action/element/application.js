(function(){

    var vueAccueil;
    var vuePartie;
    var vueFinPartie;

    function initialiser(){

        vueAccueil = VUE.Accueil;
        vueAccueil.afficher();

        window.addEventListener("hashchange",naviguer);

    }

    function naviguer(evenement){

        var hash = window.location.hash;

        if(hash.match(/^#accueil/)){
            naviguerVueAccueil();
        }else if(hash.match(/^#jouer/)){
            naviguerVuePartie();
        }else if(hash.match(/^#fin-partie-gagnee/)){
            naviguerVueFinPartie(gagnee = true);
        }else if(hash.match(/^#fin-partie-perdue/)){
            naviguerVueFinPartie(gagnee = false);
        }
    }
    function naviguerVueAccueil(){

        vueAccueil.afficher();

    }
  function naviguerVuePartie(){

        vuePartie = VUE.Partie;
        vuePartie.afficher();

    }
   function naviguerVueFinPartie(gagnee){

        vueFinPartie = VUE.FinPartie;
        vueFinPartie.afficher(gagnee);

    }
    initialiser();
})();