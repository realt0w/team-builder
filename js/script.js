
  window.addEventListener('load', function () {
    const images = document.images;
    let loadedCount = 0;
    const totalImages = images.length;

    if (totalImages === 0) {
      showApp();
    }

    for (let i = 0; i < totalImages; i++) {
      if (images[i].complete) {
        incrementCounter();
      } else {
        images[i].addEventListener('load', incrementCounter, false);
        images[i].addEventListener('error', incrementCounter, false);
      }
    }

    function incrementCounter() {
      loadedCount++;
      if (loadedCount === totalImages) {
        showApp();
      }
    }

    function showApp() {
      document.getElementById("loading-screen").style.display = "none";
      document.getElementById("popUP").style.display = "block";
    }
  });


// Global variables
var playerToChange, playerToChangeId, customSprite;

/**
 * Render players to choose from inside modal
 * @param {array} players Players to be rendered inside of modal
 * @param {string} language Chosen language of player names
 */
function renderPlayers(players, language) {
    var modal = document.getElementById('modal');
    // HTML to insert inside of modal
    var htmlInsert = '';

    // List of games
    var games = [
        {
            'IE1': 'Inazuma Eleven',
            'IE2': 'Inazuma Eleven 2',
            'IE3': 'Inazuma Eleven 3',
            'GO1': 'Inazuma Eleven GO',
            'GO2': 'Inazuma Eleven GO Chrono Stones',
            'GO3': 'Inazuma Eleven GO Galaxy',
            'Ares': 'Inazuma Eleven Ares',
            'Orion': 'Inazuma Eleven Orion',
            'VR': 'Inazuma Eleven Victory Road',
            'Scouts': 'Scout Characters',
            'Fan': 'Fan Made Teams',
            'GF': 'Galactik Football',
        }
    ];

    // Add Custom players heading
    htmlInsert += '</div><h4 class="custom"><img src="./images/addimage.png" class="modal-team-sprite">Create your own players</h4>' +
        '<div id="custom-player-panel"><div><input id="custom-player-name" placeholder="Player name"><input type="file" id="custom-player-file" accept="image/*" onchange="loadSprite(event)"><input type="submit" id="add-button" value="Add player"></div></div>';

    htmlInsert += '<h4 class="custom">Or select from the player list!</h4><div class="btn-group" role="group" aria-label="game-buttons">';
    for (var i = 0; i < Object.keys(games[0]).length; i++) {
        htmlInsert += '<button type="button" onClick=toggle("game-' + i + '"); class="game-title" id="game-' + i + '-button"><img src="./images/logos/' + i + '.png" alt="' + Object.values(games[0])[i] + '"/></button>';
    }

    // Cycle through all games and add a panel for each game
    for (var x = 0; x < Object.keys(games[0]).length; x++) {
        htmlInsert += '<div class="hidden game-player-panel" id="game-' + x + '">';

        // Cycle through all teams and add an accordion panel for each team
        for (var j = 0; j < teams.length; j++) {
            var team = teams[j];
            if (team.Game == Object.keys(games[0])[x]) {
                htmlInsert +=
                    '<button class="accordion"><img src="' + team.Sprite + '" class="modal-team-sprite">' + team[language + 'Name'] + '</button>' +
                    '<div class="panel">';
                // Cycle through all players and add them to the teams panel
                for (var k = 0; k < players.length; k++) {
                    var player = players[k];
                    // If current player is in the current team add a player box
                    if (player[language + 'Team'] == team[language + 'Name']) {
                        if (player.Game == team.Game) {
                            htmlInsert +=
                                '<div class="modal-player-box">' +
                                '<p class="modal-player-name">' + player[language + 'Name'] + '</p>' +
                                '<div class="modal-player-box-container">' +
                                '<div class="modal-player-props-container">' +
                                `<div class='modal-player-position' style='background-image: url("./images/positions/` + player.Position + `.png");'></div>` +
                                `<div class='modal-player-element' style='background-image: url("./images/elements/` + player.Element + `.png");'></div>` +
                                `<div class='modal-player-gender' style='background-image: url("./images/genders/` + player.Gender + `.png");'></div>` +
                                '</div>' +
                                '<div class="modal-player-sprite-container" data-dismiss="modal" data-name="' + player[language + 'Name'] + '" data-sprite="' + player.Sprite + '" data-team-sprite="' + player.TeamSprite + '">' +
                                '<img src="' + player.Sprite + '" alt="' + player[language + 'Name'] + '.png" class="modal-player-sprite"/>' +
                                '<div class="icon">+</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>';
                        }
                    }
                }
                htmlInsert += '</div>';
            }
        }
        htmlInsert += '</div></div></div>';
    }
    // Insert HTML inside modal
    modal.innerHTML = htmlInsert;

    // Initialize
    initializeModal();
    addModalPlayerActions();
}

/**
 * Toggle visibility of the games
 * @param {string} game - Game that has been clicked
 */
function toggle(game) {
    // Show game (hide all others)
    if ($('#' + game).css('display') == 'none') {
        $('.game-title').css('background-color', '#eee');
        $('#' + game + '-button').css('background-color', '#ccc');
        $('.game-player-panel').addClass('hidden');
        $('#' + game).removeClass('hidden');
    } // Hide game
    else {
        $('#' + game + '-button').css('background-color', '#eee');
        $('#' + game).addClass('hidden');
    }
}

/**
 * Initialize modal script
 */
function initializeModal() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }

    $(".game-title").first().click();
}

/**
 * Render formations in formation dropdown
 * @param {array} formations Formations to be rendered inside of dropdown
 */
function renderFormations(formations) {
    var formationDropdown = $("#formation-dropdown");
    var formation;

    // Add a dropdown option for each formation, and store some information in data attributes depending on which device is being used
    if ($(window).width() <= 479) {
        for (var i = 0; i < formations.length; i++) {
            formation = formations[i];
            $(formationDropdown).append('<option value="' + formation.name + '" data-html="' + he.encode(formation.phone_html) + '" class="formation-option">' + formation.name + '</option>');
        }
    } else if ($(window).width() > 479 && $(window).width() < 1600) {
        for (var j = 0; j < formations.length; j++) {
            formation = formations[j];
            $(formationDropdown).append('<option value="' + formation.name + '" data-html="' + he.encode(formation.laptop_html) + '" class="formation-option">' + formation.name + '</option>');
        }
    } else {
        for (var k = 0; k < formations.length; k++) {
            formation = formations[k];
            $(formationDropdown).append('<option value="' + formation.name + '" data-html="' + he.encode(formation.html) + '" class="formation-option">' + formation.name + '</option>');
        }
    }

    // Select 4-4-2 (F-Basic)
    document.querySelectorAll('[value="4-4-2 (F-Basic)"]')[0].selected = true;
}

/**
 * Render coaches in coach dropdown
 * @param {array} coaches Array of coaches
 * @param {string} language Chosen language
 */
function renderCoaches(coaches, language) {
    var coachDropdown = $("#coach-dropdown");
    coachDropdown.empty();

    // Add a dropdown option for each coach, and store some information in data attributes
    for (var i = 0; i < coaches.length; i++) {
        var coach = coaches[i];
        $(coachDropdown).append('<option value="' + coach[language + 'Name'] + '" data-coachSprite="' + coach.Sprite + '" class="coach-option">' + coach[language + 'Name'] /*+ " (" + coach[language + 'Team'] + ')*/ + '</option>');
    }
}

/**
 * Change field's formation to the selected formation
 */
function changeFormation() {
    var formationDropdown = document.getElementById('formation-dropdown');
    var selectedOption = formationDropdown.options[formationDropdown.selectedIndex];

    $("#field-players-container").html(he.decode(selectedOption.dataset.html));

    addPlayerBoxActions();
}

/**
 * Render emblems in emblem dropdown
 * @param {array} emblems Array of emblems
 * @param {string} language Chosen language
 */
function renderEmblems(emblems, language) {
    emblems.sort((a, b) => (a[language + 'Team'] > b[language + 'Team']) ? 1 : ((b[language + 'Team'] > a[language + 'Team']) ? -1 : 0));

    var emblemDropdown = $("#emblem-dropdown");
    emblemDropdown.empty();

    // Add a dropdown option for each emblem, and store some information in data attributes
    for (var i = 0; i < emblems.length; i++) {
        var emblem = emblems[i];
        $(emblemDropdown).append('<option value="' + emblem[language + 'Team'] + '" data-emblemSprite="' + emblem.Sprite + '" class="emblem-option">' + emblem[language + 'Team'] + '</option>');
    }
}

/**
 * Update sprite when selecting a different option
 * @param {string} type Type of sprite e.g. coach or emblem
 */
function updateSprite(type) {
    var dropdown = document.getElementById([type] + '-dropdown');
    var selectedOption = dropdown.options[dropdown.selectedIndex];

    // Set source of the sprite equal to the image url of the selected option
    var spriteToChange = document.getElementById([type + "-sprite"]);
    spriteToChange.src = selectedOption.dataset[type + 'sprite'];
}

/**
 * Change the selected player with a player selected in the modal
 * @param {array} newPlayer New player to add to team
 */
function changePlayer(newPlayer) {
    // Define player name, sprite and emblem
    var newPlayerName = newPlayer.dataset.name.replace('<', '&lt;').replace('>', '&gt;');
    var newPlayerSprite = newPlayer.dataset.sprite;
    var newPlayerTeamSprite = newPlayer.dataset.teamSprite;

    // Define new player box
    var playerBoxToChange = document.getElementById(playerToChange.id).parentElement;
    // console.log(playerBoxToChange);
    var playerType;
    if (playerBoxToChange.id.includes("sub")) {
        playerType = "sub";
    } else if (playerBoxToChange.id.includes("player")) {
        playerType = "player";
    }
    var htmlInsert = "";

    htmlInsert +=
        '<div id="drag-box-' + playerToChangeId + '-container" class="drag-box-container">' +
        '<div class="drag-box" id="drag-box-' + playerToChangeId + '" data-toggle="modal" data-target="#myModal"  data-id="' + playerToChangeId + '" style="background-image: none">' +
        '<img src="' + newPlayerSprite + '" id="' + playerToChangeId + '-sprite" data-pg-name="' + playerToChangeId + '-sprite" class="' + playerType + '-sprite"/>' +
        '</div>' +
        '<div class="icon">✎</div>' +
        '<div class="' + playerType + '-info-container" id="' + playerToChangeId + '-info-container" data-pg-name="' + playerToChangeId + '-info-container">';
    if (newPlayerTeamSprite) {
        htmlInsert +=
            '<div id="' + playerToChangeId + '-element-container" class="' + playerType + '-element-container" style="background-image: none">' +
            '<img id="' + playerToChangeId + '-element" data-pg-name="' + playerToChangeId + '-element" class="' + playerType + '-element" src="' + newPlayerTeamSprite + '"/>' +
            '</div>';
    }
    htmlInsert +=
        '<span id="' + playerToChangeId + '-name" data-pg-name="' + playerToChangeId + '-name" class="' + playerType + '-name">' + newPlayerName + '</span>' +
        '</div>' +
        '</div>';

    // Change selected playerbox to new playerbox
    playerBoxToChange.outerHTML = htmlInsert;

    // Add button actions again to make new player box clickable
    addPlayerBoxActions();
}

/**
 * Load the uploaded image and store in temporary data URL
 * @param {object} file Uploaded image
 */
function loadSprite(file) {
    var input = file.target;

    var reader = new FileReader();
    reader.onload = function () {
        var dataURL = reader.result;

        customSprite = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
}

/**
 * Add custom player to custom player panel
 */
function addCustomPlayer() {
    var name = $('#custom-player-name').val();
    var cleanName = name.toLowerCase().replace(/[^0-9a-z]/gi, '');
    var sprite = customSprite;
    var container = $('#custom-player-panel');

    var htmlInsert = '<div class="modal-player-box">' +
        '<p class="modal-player-name">' + name.replace('<', '&lt;').replace('>', '&gt;') + '</p>' +
        '<div class="modal-player-sprite-container custom-modal-player-sprite-container" id="custom-player-' + cleanName + '" data-dismiss="modal" data-name="' + name.replace('<', '&lt;').replace('>', '&gt;') + '" data-sprite="' + sprite + '">' +
        '<img src="' + sprite + '" alt="' + cleanName + '.png" class="modal-player-sprite"/>' +
        '<div class="icon">+</div>' +
        '</div>' +
        '</div>';

    container.prepend(htmlInsert);

    var customPlayer = document.getElementById('custom-player-' + cleanName);
    customPlayer.addEventListener("click", () => {
        changePlayer(customPlayer);
    });
}

/**
 * Reset entire team to original state
 */
function clearTeam() {
    var playerContainers = $('.player-container');
    var subContainers = $('.sub-container');

    // Clear all field players
    for (var i = 0; i < playerContainers.length; i++) {
        var j = i + 1;
        playerContainers[i].innerHTML =
            '<div id="drag-box-player-' + j + '-container" class="drag-box-container">' +
            '<div class="drag-box" id="drag-box-player-' + j + '" data-toggle="modal" data-target="#myModal"  data-id="player-' + j + '"></div>' +
            '<div class="icon">✎</div>' +
            '<div class="player-info-container" id="player-' + j + '-info-container" data-pg-name="player-' + j + '-info-container">' +
            '<div class="player-element-container" id="player-' + j + '-element-container"></div>' +
            '<span id="player-' + j + '-name" data-pg-name="player-' + j + '-name" class="player-name">Player #' + j + '</span>' +
            '</div>' +
            '</div>';
    }
    // Clear all bench players
    for (var k = 0; k < subContainers.length; k++) {
        var l = k + 1;
        subContainers[k].innerHTML =
            '<div id="drag-box-sub-' + l + '-container"  class="drag-box-container">' +
            '<div class="drag-box" id="drag-box-sub-' + l + '" data-toggle="modal" data-target="#myModal"  data-id="sub-' + l + '"></div>' +
            '<div class="icon">✎</div>' +
            '<div class="sub-info-container" id="sub-' + l + '-info-container" data-pg-name="sub-' + l + '-info-container">' +
            '<div class="sub-element-container" id="sub-' + l + '-element-container"></div>' +
            '<span id="sub-' + l + '-name" data-pg-name="sub-' + l + '-name" class="sub-name">Sub #' + l + '</span>' +
            '</div>' +
            '</div>';
    }
    // Reset formation
    // document.getElementById('formation-dropdown').selectedIndex = 2;
    document.getElementById('formation-dropdown').value = '4-4-2 (F-Basic)';
    changeFormation();

    // Reset emblem
    document.getElementById('emblem-sprite').src = "./images/team-placeholder.png";

    // Reset coach
    document.getElementById('coach-sprite').src = "./images/character-placeholder.png";

    // Reset name
    document.getElementById('team-name').value = "";

    addPlayerBoxActions();
}

/**
 * Save team as image
 */
function saveTeam(screen) {
    var modalImage = $("#image-modal-body");
    modalImage.html('<img src="./images/loading.gif" id="loading-gif"/>');

    if (screen < 1600 && screen > 479) {
        $('#team-name').css({ 'padding': '0px 0px', 'padding-bottom': '10px' });
    } else if (screen > 1600) {
        $('#body-grid').css({ 'margin-top': '0' });
    }

    var watermark = document.createElement('div');
    watermark.id = 'watermark';
    watermark.innerHTML = 'inazuma-eleven.fr';

    document.getElementById('field-players-container').parentElement.appendChild(watermark);
    var element = document.getElementsByTagName('BODY')[0];
    // var teamName = $('#team-name').val() + '.png';
    html2canvas(element, { allowTaint: true, useCORS: true, width: 1280, height: 500 }).then(function (canvas) {
        canvas.setAttribute("id", "canvas");
        canvas.setAttribute("crossOrigin", "anonymous");
        // canvas.setAttribute("width", "1280");
        // canvas.setAttribute("height", "500");
        canvas.getContext('2d').imageSmoothingEnabled = false;
        modalImage.html('<p id="save-instructions">To save: right click + "Save image as"</p>');
        modalImage.append(canvas);
        if (screen < 1600 && screen > 479) {
            teamName.css({ 'padding-bottom': '0px', 'padding': '3px 0px' });
        } else if (screen > 1600) {
            $('#body-grid').css({ 'margin-top': '-2%' });
        }
        watermark.remove();
        console.log(canvas);
        $("#canvas").click(function () {
            window.open(canvas.toDataURL(), '_blank').focus();
        });
    });
}

/**
 * Add button actions for all modal player boxes
 */
function addModalPlayerActions() {
    var modalPlayers = Array.from(document.getElementsByClassName('modal-player-sprite-container'));
    modalPlayers.forEach(modalPlayer => {
        modalPlayer.addEventListener("click", () => {
            changePlayer(modalPlayer);
        });
    });
}

/**
 * Add button actions for all player boxes
 */
function addPlayerBoxActions() {
    // Select all player boxes (11 on the pitch and 5 on the bench) and store into a variable  
    var fieldPlayers = Array.from(document.getElementsByClassName('drag-box'));
    // Collect data for each player when clicked on
    fieldPlayers.forEach(fieldPlayer => {
        fieldPlayer.addEventListener("click", () => {
            playerToChange = fieldPlayer;
            playerToChangeId = fieldPlayer.dataset.id;
        });
    });
}

/**
 * Add actions to buttons
 */
function addButtonActions() {
    // Render coaches, players and emblems again when changing language to English 
    $("#english-names-input").unbind("click").click(function () {
        renderCoaches(coaches, "English");
        renderPlayers(players, "English");
        renderEmblems(emblems, "English");
    });

    // Render coaches, players and emblems again when changing language to Japanese
    $("#japanese-names-input").unbind("click").click(function () {
        renderCoaches(coaches, "Japanese");
        renderPlayers(players, "Japanese");
        renderEmblems(emblems, "Japanese");
    });

    $("#reset-button").unbind("click").click(function () {
        clearTeam();
    });

    $("#save-button").unbind("click").click(function () {
        saveTeam($(window).width());
    });

    $('#add-button').unbind('click').click(function () {
        addCustomPlayer();
    });
}

// Initialize
renderFormations(formations);
changeFormation();
renderCoaches(coaches, "English");
renderEmblems(emblems, "English");
renderPlayers(players, "English");
addPlayerBoxActions();
addButtonActions();

document.addEventListener("DOMContentLoaded", function () {
    const downloadButton = document.getElementById("download-image-btn");

    downloadButton.addEventListener("click", function () {
        const canvas = document.querySelector("canvas"); // Sélectionne le canvas généré
        if (canvas) {
            const image = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = image;
            link.download = "team-image.png"; // Nom du fichier téléchargé
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert("No image to download !");
        }
    });
});