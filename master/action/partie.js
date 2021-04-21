var CONTROLEUR = CONTROLEUR || {};

CONTROLEUR.partie = (function(){

    var module = {};

    var vuePartie;
    var animationFrame;
    var derniereValeurTemporelleMilliseconde;
    var joueurLocal;
    var pseudonymeLocal;
    var listeJoueur;
    var groupeBouffeBoule;
    var groupeBouffeBouleMange;
    var CONFIGURATION =
      {
        ECRAN_LARGEUR: 900,
        ECRAN_HAUTEUR: 700,
        JOUEUR_POUSSEE: 400,
        NOMBRE_BOUFFE_BOULE: 50,
        BOUFFE_BOULE_DIAMETRE: 25,
        JOUEUR_DIAMETRE_INITIAL : 50,
        POID_AUGMENTATION : 10
      };

      var appliquerFinPartieExterne;

    (function initialiser(){

        multiNode = new MultiNode();
        multiNode.confirmerConnexion = confirmerConnexion;
        multiNode.confirmerAuthentification = confirmerAuthentification;
        multiNode.apprendreAuthentification = apprendreAuthentification;
        multiNode.recevoirVariable = recevoirVariable;
        vuePartie = VUE.partie;
        groupeBouffeBoule = [];
        groupeBouffeBouleMange = [];
        listeJoueur = [];
    })();

    function confirmerConnexion()
    {
        multiNode.demanderAuthentification(pseudonymeLocal);
    }

    function confirmerAuthentification(autresParticipants)
    {
        ajouterAutresParticipants(autresParticipants);
        joueurLocal = creerJoueur(
          derterminerNumeroJoueur(autresParticipants),
          pseudonymeLocal);
        listeJoueur[joueurLocal.numeroJoueur] = joueurLocal;

    }
    function recevoirVariable(variable){
    [cle, numeroJoueur] = variable.cle.split("-");
    switch (cle) {

        case "terrain":
          groupeBouffeBoule = JSON.parse(variable.valeur);
          demarrerJeu();
        break;

        case "directionJoueur":
          directionJoueur = JSON.parse(variable.valeur);
          listeJoueur[numeroJoueur].destinationX = directionJoueur.destinationX;
          listeJoueur[numeroJoueur].destinationY = directionJoueur.destinationY;
          listeJoueur[numeroJoueur].velociteX = 0;
          listeJoueur[numeroJoueur].velociteY = 0;
        break;

        case "groupeBouffeBouleMange":
          groupeBouffeBouleMange = JSON.parse(variable.valeur);
          cacherGroupeBouffeBoule();
          grossirJoueurBoule(numeroJoueur);
          if(testerFinPartie())
          {
            multiNode.posterVariableTextuelle(
              "finPartie", "");
          }
        break;
        case "finPartie":
            appliquerFinPartieExterne(listeJoueur);
        break;

      }
    }

    function testerFinPartie()
    {
      var finPartie = true;
      for(
        var indiceBouffeBoule = 0;
        indiceBouffeBoule<groupeBouffeBoule.length;
        indiceBouffeBoule++)
      {
        if(groupeBouffeBoule[indiceBouffeBoule].visible) return false;

      }
      return true;
    }

    function isInitialisationTerrain()
    {
      return listeJoueur.length > 1 && joueurLocal.numeroJoueur == 0;
    }

    function initialiserTerrain()
    {
      var groupeBouffeBoule = genererGroupeBouffeBoule();
      multiNode.posterVariableTextuelle(
        "terrain",
        JSON.stringify(groupeBouffeBoule));
    }

    function derterminerNumeroJoueur(autresParticipants = null)
    {
      if(autresParticipants)
      {
        return autresParticipants.length ;
      }
      else
      {
        return listeJoueur.length;
      }

    }

    function derterminerCouleurJoueur(numeroJoueur)
    {
        switch (numeroJoueur) {
          case 0:
            return "yellow";
            break;
          case 1:
            return "blue";
            break;
        }
        return null;
    }

    function derterminerPositionInitialeJoueur(numeroJoueur)
    {
        switch (numeroJoueur) {
          case 0:
            return positionInitialeJoueur =
                {
                  x: CONFIGURATION.ECRAN_LARGEUR*0.25,
                  y: CONFIGURATION.ECRAN_HAUTEUR/2
                };
            break;
          case 1:
            return positionInitialeJoueur =
                {
                  x: CONFIGURATION.ECRAN_LARGEUR*0.75,
                  y: CONFIGURATION.ECRAN_HAUTEUR/2
                };
            break;
        }
        return null;
    }

    function creerJoueur(numeroJoueur, pseudonyme)
    {
      var positionInitialeJoueur = derterminerPositionInitialeJoueur(numeroJoueur);
      var couleurJoueur = derterminerCouleurJoueur(numeroJoueur);
      return new MODELE.Joueur(
          numeroJoueur,
          pseudonyme,
          couleurJoueur,
          CONFIGURATION.JOUEUR_DIAMETRE_INITIAL,
          positionInitialeJoueur.x,
          positionInitialeJoueur.y,
          positionInitialeJoueur.x,
          positionInitialeJoueur.y,
          0,
          0,
          0);
    }

    function ajouterAutresParticipants(autresParticipants)
    {
        for(
          var indiceParticipant = 0;
          indiceParticipant < autresParticipants.length;
          indiceParticipant++)
        {
          var autreJoueur =
              creerJoueur(
                indiceParticipant,
                autresParticipants[indiceParticipant]);
          listeJoueur[autreJoueur.numeroJoueur] = autreJoueur;
        }
    }

    function ajouterAutreJoueur(pseudonyme)
    {
        var autreJoueur =
              creerJoueur(
                derterminerNumeroJoueur(),
                pseudonyme);
          listeJoueur[autreJoueur.numeroJoueur] = autreJoueur;
    }
    function apprendreAuthentification(pseudonyme)
    {
        ajouterAutreJoueur(pseudonyme);
        //if(listeJoueur.length > 1) demarrerJeu();
        if(isInitialisationTerrain())
        {
           initialiserTerrain();
        }
    }

    module.preparerJeu = function(pseudonyme,appliquerFinPartie)
    {
        pseudonymeLocal = pseudonyme;
        appliquerFinPartieExterne = appliquerFinPartie;
        multiNode.connecter();
    }
    function demarrerJeu()
    {
        genererGroupeBouffeBoule();
        CONFIGURATION.ECRAN_LARGEUR = (window.innerWidth);
        CONFIGURATION.ECRAN_HAUTEUR = (window.innerHeight) - 55;
        vuePartie.afficher(
          CONFIGURATION.ECRAN_LARGEUR,
          CONFIGURATION.ECRAN_HAUTEUR,
          listeJoueur,
          groupeBouffeBoule,
          agirSurClic);
        preparerRafraichissementEcran();
        createjs.Sound.registerSound("sons/open.mp3", "action");
    }

    function agirSurClic(evenement){
    multiNode.posterVariableTextuelle(
      "directionJoueur-"+ joueurLocal.numeroJoueur,
      JSON.stringify(
        {
          destinationX: evenement.layerX,
          destinationY: evenement.layerY
        }
      ));
    }
    function _mettreAJourJeu(deltaValeurTemporelleMilliseconde) {

      var [positionX, positionY] =
       vuePartie.getJoueurBoulePosition(joueurLocal.numeroJoueur);
      joueurLocal.x = positionX;
      joueurLocal.y = positionY;
      var tx = joueurLocal.destinationX - joueurLocal.x;
      var ty = joueurLocal.destinationY - joueurLocal.y;
      joueurLocal.distance = Math.sqrt(tx*tx+ty*ty);

      if(joueurLocal.distance != 0){
        joueurLocal.velociteX = (tx/joueurLocal.distance)*CONFIGURATION.JOUEUR_POUSSEE;
        joueurLocal.velociteY = (ty/joueurLocal.distance)*CONFIGURATION.JOUEUR_POUSSEE;
      }
      else {
        joueurLocal.velociteX = joueurLocal.velociteY = 0;
      }
      if(joueurLocal.distance > 1 &&
        joueurLocal.distance > CONFIGURATION.JOUEUR_POUSSEE*deltaValeurTemporelleMilliseconde){
         vuePartie.deplacerJoueurBoule(
           joueurLocal.numeroJoueur,
           joueurLocal.velociteX*deltaValeurTemporelleMilliseconde,
           joueurLocal.velociteY*deltaValeurTemporelleMilliseconde);
       }else if (joueurLocal.distance > 1 &&
         joueurLocal.distance < CONFIGURATION.JOUEUR_POUSSEE*deltaValeurTemporelleMilliseconde) {
         vuePartie.setJoueurBoulePosition(
           joueurLocal.numeroJoueur,
           joueurLocal.destinationX,
           joueurLocal.destinationY);
       }
       if (detecterCollisionBoule())
       {
         cacherGroupeBouffeBoule();
         grossirJoueurBoule();
       }
    }

    function mettreAJourJeu(deltaValeurTemporelleMilliseconde)
    {
      for(
        var indiceJoueur = 0;
        indiceJoueur < listeJoueur.length;
        indiceJoueur++)
      {
        var [positionX, positionY] =
         vuePartie.getJoueurBoulePosition(listeJoueur[indiceJoueur].numeroJoueur);
         listeJoueur[indiceJoueur].x = positionX;
         listeJoueur[indiceJoueur].y = positionY;
         var tx = listeJoueur[indiceJoueur].destinationX - listeJoueur[indiceJoueur].x;
         var ty = listeJoueur[indiceJoueur].destinationY - listeJoueur[indiceJoueur].y;
         listeJoueur[indiceJoueur].distance = Math.sqrt(tx*tx+ty*ty);

         if(listeJoueur[indiceJoueur].distance != 0){
           listeJoueur[indiceJoueur].velociteX = (tx/listeJoueur[indiceJoueur].distance)*CONFIGURATION.JOUEUR_POUSSEE;
           listeJoueur[indiceJoueur].velociteY = (ty/listeJoueur[indiceJoueur].distance)*CONFIGURATION.JOUEUR_POUSSEE;
         }
         else {
           listeJoueur[indiceJoueur].velociteX = listeJoueur[indiceJoueur].velociteY = 0;
         }
         if(listeJoueur[indiceJoueur].distance > 1 &&
           listeJoueur[indiceJoueur].distance > CONFIGURATION.JOUEUR_POUSSEE*deltaValeurTemporelleMilliseconde){
            vuePartie.deplacerJoueurBoule(
              listeJoueur[indiceJoueur].numeroJoueur,
              listeJoueur[indiceJoueur].velociteX*deltaValeurTemporelleMilliseconde,
              listeJoueur[indiceJoueur].velociteY*deltaValeurTemporelleMilliseconde);
          }else if (listeJoueur[indiceJoueur].distance > 1 &&
            listeJoueur[indiceJoueur].distance < CONFIGURATION.JOUEUR_POUSSEE*deltaValeurTemporelleMilliseconde) {
            vuePartie.setJoueurBoulePosition(
              listeJoueur[indiceJoueur].numeroJoueur,
              listeJoueur[indiceJoueur].destinationX,
              listeJoueur[indiceJoueur].destinationY);
          }
      }
       if (detecterCollisionBoule())
       {
         multiNode.posterVariableTextuelle(
           "groupeBouffeBouleMange-"+ joueurLocal.numeroJoueur,
           JSON.stringify(groupeBouffeBouleMange)
         );
       }

    }

    function grossirJoueurBoule(numeroJoueur)
    {
      listeJoueur[numeroJoueur].diametre += CONFIGURATION.POID_AUGMENTATION;
      vuePartie.grossirJoueurBoule(numeroJoueur, listeJoueur[numeroJoueur].diametre);
    }

    function cacherGroupeBouffeBoule()
    {
      vuePartie.cacherGroupeBouffeBoule(groupeBouffeBouleMange);
      for(var indiceBoule = 0;indiceBoule < groupeBouffeBouleMange.length;indiceBoule++)
      {
        groupeBouffeBoule[groupeBouffeBouleMange[indiceBoule]].visible = false;
      }
      groupeBouffeBouleMange= [];
    }

    function preparerRafraichissementEcran(valeurTemporelleMilliseconde) {
        if (derniereValeurTemporelleMilliseconde) {
          mettreAJourJeu((valeurTemporelleMilliseconde-
                                     derniereValeurTemporelleMilliseconde)
                                     /1000);}
        derniereValeurTemporelleMilliseconde = valeurTemporelleMilliseconde;
        animationFrame = requestAnimationFrame(preparerRafraichissementEcran);
    }

    function genererGroupeBouffeBoule()
    {
      var groupeBouffeBoule = [];
      for(var indiceBoule = 0;indiceBoule < CONFIGURATION.NOMBRE_BOUFFE_BOULE;indiceBoule++)
      {
        bouleX = obtenirValeurAleatoir(0, CONFIGURATION.ECRAN_LARGEUR);
        bouleY = obtenirValeurAleatoir(0, CONFIGURATION.ECRAN_HAUTEUR);
        groupeBouffeBoule[indiceBoule] = {x : bouleX, y : bouleY, visible : true};
      }
      return groupeBouffeBoule;
    }

    function obtenirValeurAleatoir(minimun, maximum)
    {
      minimun = Math.ceil(minimun);
      maximum = Math.floor(maximum);
      return Math.floor(Math.random() * (maximum - minimun + 1)) + minimun;
    }

    function detecterCollisionBoule()
    {
      var [positionJoueurX, positionJoueurY] =
        vuePartie.getJoueurBoulePosition(joueurLocal.numeroJoueur);

      for(var indiceBoule = 0;indiceBoule < CONFIGURATION.NOMBRE_BOUFFE_BOULE;indiceBoule++)
      {
        if(groupeBouffeBoule[indiceBoule].visible){
          var sommeRayon;
          var deltaX;
          var deltaY;
          var rayonBouffeBoule = CONFIGURATION.BOUFFE_BOULE_DIAMETRE / 2;
          var rayonJoueur = joueurLocal.diametre / 2;


          sommeRayon = rayonBouffeBoule + rayonJoueur;
          deltaX = groupeBouffeBoule[indiceBoule].x - positionJoueurX;
          deltaY = groupeBouffeBoule[indiceBoule].y - positionJoueurY;
          if (sommeRayon > Math.sqrt((deltaX * deltaX) + (deltaY * deltaY))) {
            var longeurGroupeBouffeBouleMange = groupeBouffeBouleMange.length;
            groupeBouffeBouleMange[longeurGroupeBouffeBouleMange] = indiceBoule;
          }
      }
    }
      return groupeBouffeBouleMange.length > 0;
    }
    return module;
})();
