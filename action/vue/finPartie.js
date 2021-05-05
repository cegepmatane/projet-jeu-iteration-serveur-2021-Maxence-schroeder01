var VUE = VUE || {};

VUE.finPartie = (function(){

    var finPartie = {};

    var pageFinPartieContenu;
    var body;

    (function initialiser()
    {
        document.addEventListener("DOMContentLoaded", preparerVue);


    })();

    function preparerVue(evenement){

      pageFinPartieContenu = document.querySelector("#page-fin-partie").innerHTML;
      body = document.querySelector("body");


    }

    finPartie.afficher = function(listeJoueurGagnantPerdant){

        body.innerHTML = pageFinPartieContenu;
        var liste = document.querySelector("ul");
        console.log("finPartie --> partie.afficher --> liste : ", liste);
        var numeroJoueur = 0;
        var pointage = 0;
        for(
          var indiceJoueurGagnantPerdant = 0;
          indiceJoueurGagnantPerdant < listeJoueurGagnantPerdant.length;
          indiceJoueurGagnantPerdant++)
        {
          if(listeJoueurGagnantPerdant[indiceJoueurGagnantPerdant].diametre > pointage)
          {
            numeroJoueur = indiceJoueurGagnantPerdant;
            pointage = listeJoueurGagnantPerdant[indiceJoueurGagnantPerdant].diametre;
          }
        }
        for(
          var indiceJoueurGagnantPerdant = 0;
          indiceJoueurGagnantPerdant < listeJoueurGagnantPerdant.length;
          indiceJoueurGagnantPerdant++)
        {
          liste.innerHTML +=
              "<li>"+
            listeJoueurGagnantPerdant[indiceJoueurGagnantPerdant].pseudonyme+
            " " +
            listeJoueurGagnantPerdant[indiceJoueurGagnantPerdant].diametre/2+
            " " +
            (indiceJoueurGagnantPerdant == numeroJoueur?"gagnant" : "perdant");
              "</li>";
        }


    }


    return finPartie;

})();
